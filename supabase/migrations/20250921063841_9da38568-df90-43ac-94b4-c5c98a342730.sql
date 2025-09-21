-- Create auction platforms table
CREATE TABLE public.auction_platforms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  current_bid NUMERIC NOT NULL DEFAULT 0,
  starting_bid NUMERIC NOT NULL DEFAULT 0,
  reserve_price NUMERIC,
  esg_score INTEGER NOT NULL DEFAULT 0 CHECK (esg_score >= 0 AND esg_score <= 100),
  monthly_revenue NUMERIC NOT NULL DEFAULT 0,
  features JSONB DEFAULT '[]'::jsonb,
  category TEXT NOT NULL,
  users_count INTEGER NOT NULL DEFAULT 0,
  auction_status TEXT NOT NULL DEFAULT 'active' CHECK (auction_status IN ('active', 'ended', 'pending', 'cancelled')),
  auction_start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  auction_end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bids table
CREATE TABLE public.auction_bids (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  auction_id UUID NOT NULL REFERENCES public.auction_platforms(id) ON DELETE CASCADE,
  bidder_id UUID NOT NULL,
  bid_amount NUMERIC NOT NULL,
  bid_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_winning_bid BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user profiles table for auction users
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  total_bids INTEGER NOT NULL DEFAULT 0,
  total_wins INTEGER NOT NULL DEFAULT 0,
  verified BOOLEAN NOT NULL DEFAULT false,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.auction_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auction_bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for auction_platforms
CREATE POLICY "Anyone can view active auctions" ON public.auction_platforms
  FOR SELECT USING (auction_status = 'active');

CREATE POLICY "Users can create their own auctions" ON public.auction_platforms
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own auctions" ON public.auction_platforms
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own auctions" ON public.auction_platforms
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for auction_bids
CREATE POLICY "Anyone can view bids on active auctions" ON public.auction_bids
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.auction_platforms 
      WHERE id = auction_bids.auction_id 
      AND auction_status = 'active'
    )
  );

CREATE POLICY "Authenticated users can place bids" ON public.auction_bids
  FOR INSERT WITH CHECK (
    auth.uid() = bidder_id AND
    EXISTS (
      SELECT 1 FROM public.auction_platforms 
      WHERE id = auction_bids.auction_id 
      AND auction_status = 'active'
      AND auction_end_date > now()
    )
  );

-- RLS Policies for user_profiles
CREATE POLICY "Users can view all profiles" ON public.user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Function to update auction current bid
CREATE OR REPLACE FUNCTION update_auction_current_bid()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the current bid and mark as winning bid
  UPDATE public.auction_platforms 
  SET current_bid = NEW.bid_amount, updated_at = now()
  WHERE id = NEW.auction_id;
  
  -- Mark all other bids as not winning
  UPDATE public.auction_bids 
  SET is_winning_bid = false 
  WHERE auction_id = NEW.auction_id;
  
  -- Mark this bid as winning
  NEW.is_winning_bid = true;
  
  -- Update bidder's total bids count
  UPDATE public.user_profiles 
  SET total_bids = total_bids + 1
  WHERE user_id = NEW.bidder_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating auction bids
CREATE TRIGGER update_auction_bid_trigger
  BEFORE INSERT ON public.auction_bids
  FOR EACH ROW
  EXECUTE FUNCTION update_auction_current_bid();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, display_name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();