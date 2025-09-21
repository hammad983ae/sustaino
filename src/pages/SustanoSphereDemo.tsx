/**
 * ============================================================================
 * SUSTANO-SPHERE™ DEMO PAGE - REAL IMPLEMENTATION
 * Complete functional demo of Sustaino Sphere with authentication
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Leaf, Globe, TrendingUp, Shield, Award, Star, Zap, 
  Users, DollarSign, Building2, Eye, Heart, Share2,
  CheckCircle, ArrowRight, Smartphone, Camera, Lock,
  BarChart3, Target, Crown, Sparkles, ArrowLeft, Home,
  Brain, Layers, Activity, Timer, Play, Maximize,
  ThumbsUp, MapPin, Rocket, FileText, Gamepad2, LogOut, Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuctionPlatform {
  id: string;
  title: string;
  subtitle: string;
  current_bid: number;
  esg_score: number;
  monthly_revenue: number;
  features: any; // JSONB from database
  category: string;
  users_count: number;
  auction_end_date: string;
}

const SustanoSphereDemo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Authentication state
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Auction state
  const [auctions, setAuctions] = useState<AuctionPlatform[]>([]);
  const [currentAuctionIndex, setCurrentAuctionIndex] = useState(0);
  const [bidAmount, setBidAmount] = useState('');
  const [bidding, setBidding] = useState(false);
  
  // Live data
  const [liveData, setLiveData] = useState({
    totalAuctions: 0,
    volume: 0,
    avgEsgScore: 0,
    bidders: 0
  });

  // Check authentication and load data
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      setUser(session.user);
      
      // Load user profile
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();
      
      setUserProfile(profile);
      await loadAuctions();
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadAuctions = async () => {
    // First check if we need to create the 100 platforms
    const { count } = await supabase
      .from('auction_platforms')
      .select('*', { count: 'exact', head: true });

    if (count === 0) {
      await createInitialPlatforms();
    }

    const { data: auctionData, error } = await supabase
      .from('auction_platforms')
      .select('*')
      .eq('auction_status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading auctions:', error);
      return;
    }

    if (auctionData && auctionData.length > 0) {
      // Transform the database data to match our interface
      const transformedAuctions = auctionData.map(auction => ({
        ...auction,
        features: Array.isArray(auction.features) ? auction.features : 
                 typeof auction.features === 'string' ? [auction.features] : 
                 []
      }));
      
      setAuctions(transformedAuctions);
      
      // Calculate live stats
      const stats = {
        totalAuctions: auctionData.length,
        volume: auctionData.reduce((sum, auction) => sum + auction.current_bid, 0),
        avgEsgScore: Math.round(auctionData.reduce((sum, auction) => sum + auction.esg_score, 0) / auctionData.length),
        bidders: Math.floor(Math.random() * 1000) + 500 // Simulated for now
      };
      setLiveData(stats);
    }
  };

  const createInitialPlatforms = async () => {
    const platforms = [
      // Fun Category (20 platforms)
      { title: "Virtual Reality Gaming Hub", subtitle: "Next-gen VR gaming experiences", category: "fun", monthly_revenue: 125000, esg_score: 75, users_count: 15000, starting_bid: 50000, features: ["VR Integration", "Social Gaming", "NFT Rewards"] },
      { title: "Digital Comedy Club", subtitle: "AI-powered comedy content platform", category: "fun", monthly_revenue: 85000, esg_score: 60, users_count: 32000, starting_bid: 35000, features: ["AI Comedy", "Live Shows", "Creator Tools"] },
      { title: "Meme Marketplace", subtitle: "Buy, sell and trade viral memes", category: "fun", monthly_revenue: 95000, esg_score: 55, users_count: 78000, starting_bid: 40000, features: ["Meme Trading", "Viral Analytics", "Creator Rewards"] },
      { title: "Escape Room Designer", subtitle: "Create and share virtual escape rooms", category: "fun", monthly_revenue: 110000, esg_score: 70, users_count: 25000, starting_bid: 45000, features: ["Room Builder", "Multiplayer", "AR Integration"] },
      { title: "Social Gaming Arena", subtitle: "Competitive multiplayer gaming platform", category: "fun", monthly_revenue: 180000, esg_score: 65, users_count: 45000, starting_bid: 75000, features: ["Tournaments", "Streaming", "Esports"] },
      { title: "Music Creation Studio", subtitle: "Collaborative music making platform", category: "fun", monthly_revenue: 140000, esg_score: 80, users_count: 28000, starting_bid: 60000, features: ["AI Composition", "Collaboration", "Publishing"] },
      { title: "Pet Care Virtual Assistant", subtitle: "AI-powered pet care and training", category: "fun", monthly_revenue: 75000, esg_score: 85, users_count: 22000, starting_bid: 30000, features: ["Health Tracking", "Training", "Community"] },
      { title: "Food Truck Simulator", subtitle: "Manage virtual food truck empire", category: "fun", monthly_revenue: 65000, esg_score: 70, users_count: 18000, starting_bid: 25000, features: ["Business Sim", "Recipe Creation", "Economics"] },
      { title: "Dance Battle Platform", subtitle: "Global dance competition streaming", category: "fun", monthly_revenue: 120000, esg_score: 75, users_count: 35000, starting_bid: 50000, features: ["Live Battles", "Voting", "Tutorials"] },
      { title: "Adventure Quest Builder", subtitle: "Create your own adventure games", category: "fun", monthly_revenue: 105000, esg_score: 70, users_count: 20000, starting_bid: 42000, features: ["Story Builder", "RPG Elements", "Sharing"] },
      { title: "Sports Fantasy League", subtitle: "Advanced fantasy sports platform", category: "fun", monthly_revenue: 200000, esg_score: 60, users_count: 55000, starting_bid: 85000, features: ["Real-time Stats", "Social Features", "Predictions"] },
      { title: "Trivia Championship", subtitle: "Global trivia competition platform", category: "fun", monthly_revenue: 90000, esg_score: 65, users_count: 40000, starting_bid: 38000, features: ["Live Trivia", "Rankings", "Custom Quizzes"] },
      { title: "Digital Art Gallery", subtitle: "Showcase and sell digital artwork", category: "fun", monthly_revenue: 130000, esg_score: 80, users_count: 24000, starting_bid: 55000, features: ["NFT Support", "Exhibitions", "Artist Tools"] },
      { title: "Podcast Studio Network", subtitle: "All-in-one podcasting platform", category: "fun", monthly_revenue: 115000, esg_score: 75, users_count: 30000, starting_bid: 48000, features: ["Recording Tools", "Distribution", "Analytics"] },
      { title: "Board Game Digital", subtitle: "Classic board games reimagined", category: "fun", monthly_revenue: 80000, esg_score: 70, users_count: 26000, starting_bid: 32000, features: ["Multiplayer", "AI Opponents", "Custom Rules"] },
      { title: "Fashion Design Studio", subtitle: "Virtual fashion design and modeling", category: "fun", monthly_revenue: 155000, esg_score: 75, users_count: 33000, starting_bid: 65000, features: ["3D Design", "Virtual Fashion", "Marketplace"] },
      { title: "Photography Challenge", subtitle: "Daily photo challenges and contests", category: "fun", monthly_revenue: 70000, esg_score: 80, users_count: 28000, starting_bid: 28000, features: ["Challenges", "Voting", "Equipment Reviews"] },
      { title: "Magic Trick Academy", subtitle: "Learn and share magic tricks", category: "fun", monthly_revenue: 60000, esg_score: 85, users_count: 15000, starting_bid: 24000, features: ["Video Tutorials", "Practice Mode", "Performance Tips"] },
      { title: "Karaoke Universe", subtitle: "Global karaoke and singing platform", category: "fun", monthly_revenue: 135000, esg_score: 70, users_count: 42000, starting_bid: 58000, features: ["Song Library", "Social Singing", "Competitions"] },
      { title: "Adventure Travel Planner", subtitle: "Plan epic adventure travels", category: "fun", monthly_revenue: 145000, esg_score: 85, users_count: 19000, starting_bid: 62000, features: ["Trip Planning", "Community", "Gear Recommendations"] },

      // Serious Category (20 platforms)
      { title: "Financial Planning AI", subtitle: "Advanced AI-driven financial advice", category: "serious", monthly_revenue: 450000, esg_score: 90, users_count: 125000, starting_bid: 200000, features: ["AI Analysis", "Portfolio Management", "Risk Assessment"] },
      { title: "Legal Document Analyzer", subtitle: "AI-powered legal document review", category: "serious", monthly_revenue: 380000, esg_score: 85, users_count: 85000, starting_bid: 180000, features: ["Document Analysis", "Compliance Check", "Risk Identification"] },
      { title: "Healthcare Data Platform", subtitle: "Secure healthcare data management", category: "serious", monthly_revenue: 520000, esg_score: 95, users_count: 95000, starting_bid: 250000, features: ["HIPAA Compliant", "Analytics", "Research Tools"] },
      { title: "Supply Chain Optimizer", subtitle: "AI-driven supply chain management", category: "serious", monthly_revenue: 340000, esg_score: 80, users_count: 65000, starting_bid: 160000, features: ["Route Optimization", "Predictive Analytics", "Cost Reduction"] },
      { title: "Cybersecurity Shield", subtitle: "Advanced threat detection system", category: "serious", monthly_revenue: 420000, esg_score: 75, users_count: 75000, starting_bid: 190000, features: ["Threat Detection", "Real-time Monitoring", "Incident Response"] },
      { title: "Real Estate Analytics", subtitle: "Property investment analysis platform", category: "serious", monthly_revenue: 280000, esg_score: 80, users_count: 45000, starting_bid: 140000, features: ["Market Analysis", "ROI Calculator", "Risk Assessment"] },
      { title: "Corporate Training Hub", subtitle: "Enterprise learning management", category: "serious", monthly_revenue: 310000, esg_score: 85, users_count: 88000, starting_bid: 150000, features: ["LMS", "Skill Tracking", "Certification"] },
      { title: "Data Privacy Guardian", subtitle: "GDPR compliance automation", category: "serious", monthly_revenue: 365000, esg_score: 90, users_count: 52000, starting_bid: 175000, features: ["Compliance Automation", "Privacy Audits", "Data Mapping"] },
      { title: "Climate Risk Assessor", subtitle: "Environmental risk analysis for business", category: "serious", monthly_revenue: 295000, esg_score: 95, users_count: 38000, starting_bid: 145000, features: ["Climate Modeling", "Risk Reports", "Adaptation Planning"] },
      { title: "Business Intelligence Suite", subtitle: "Advanced analytics and reporting", category: "serious", monthly_revenue: 440000, esg_score: 75, users_count: 105000, starting_bid: 210000, features: ["Dashboard Creation", "Predictive Analytics", "Data Integration"] },
      { title: "Regulatory Compliance Tracker", subtitle: "Multi-industry compliance management", category: "serious", monthly_revenue: 385000, esg_score: 85, users_count: 68000, starting_bid: 185000, features: ["Regulation Tracking", "Compliance Alerts", "Audit Trails"] },
      { title: "Merger & Acquisition Platform", subtitle: "M&A deal management and analysis", category: "serious", monthly_revenue: 580000, esg_score: 80, users_count: 35000, starting_bid: 280000, features: ["Deal Pipeline", "Valuation Tools", "Due Diligence"] },
      { title: "Tax Optimization Engine", subtitle: "AI-powered tax planning and filing", category: "serious", monthly_revenue: 320000, esg_score: 85, users_count: 78000, starting_bid: 155000, features: ["Tax Planning", "Automated Filing", "Audit Support"] },
      { title: "Insurance Risk Modeler", subtitle: "Advanced insurance risk assessment", category: "serious", monthly_revenue: 410000, esg_score: 80, users_count: 42000, starting_bid: 195000, features: ["Risk Modeling", "Claims Prediction", "Pricing Optimization"] },
      { title: "HR Analytics Platform", subtitle: "Workforce analytics and insights", category: "serious", monthly_revenue: 275000, esg_score: 85, users_count: 65000, starting_bid: 135000, features: ["Performance Analytics", "Retention Modeling", "Compensation Analysis"] },
      { title: "Procurement Optimizer", subtitle: "Strategic procurement management", category: "serious", monthly_revenue: 355000, esg_score: 80, users_count: 48000, starting_bid: 170000, features: ["Vendor Management", "Cost Analysis", "Contract Optimization"] },
      { title: "Quality Assurance Suite", subtitle: "Automated quality control systems", category: "serious", monthly_revenue: 290000, esg_score: 85, users_count: 55000, starting_bid: 140000, features: ["Quality Metrics", "Process Automation", "Compliance Tracking"] },
      { title: "Emergency Response Coordinator", subtitle: "Crisis management and response platform", category: "serious", monthly_revenue: 245000, esg_score: 90, users_count: 32000, starting_bid: 120000, features: ["Crisis Planning", "Real-time Coordination", "Resource Management"] },
      { title: "Audit Management System", subtitle: "Comprehensive audit and compliance", category: "serious", monthly_revenue: 335000, esg_score: 85, users_count: 41000, starting_bid: 165000, features: ["Audit Planning", "Evidence Management", "Report Generation"] },
      { title: "Strategic Planning Assistant", subtitle: "AI-powered business strategy development", category: "serious", monthly_revenue: 395000, esg_score: 80, users_count: 38000, starting_bid: 188000, features: ["Strategy Development", "Scenario Planning", "Performance Tracking"] },

      // Family Category (20 platforms)
      { title: "Family Budget Tracker", subtitle: "Smart family financial management", category: "family", monthly_revenue: 85000, esg_score: 90, users_count: 45000, starting_bid: 35000, features: ["Budget Planning", "Expense Tracking", "Kids Allowance"] },
      { title: "Chore Reward System", subtitle: "Gamified household chore management", category: "family", monthly_revenue: 65000, esg_score: 85, users_count: 38000, starting_bid: 25000, features: ["Task Assignment", "Reward Points", "Progress Tracking"] },
      { title: "Family Recipe Vault", subtitle: "Digital family cookbook and meal planner", category: "family", monthly_revenue: 70000, esg_score: 80, users_count: 52000, starting_bid: 28000, features: ["Recipe Storage", "Meal Planning", "Shopping Lists"] },
      { title: "Kids Learning Portal", subtitle: "Educational games for children", category: "family", monthly_revenue: 120000, esg_score: 95, users_count: 85000, starting_bid: 50000, features: ["Age-appropriate Content", "Progress Tracking", "Parent Dashboard"] },
      { title: "Family Calendar Hub", subtitle: "Shared family scheduling and planning", category: "family", monthly_revenue: 55000, esg_score: 85, users_count: 42000, starting_bid: 22000, features: ["Shared Calendar", "Event Reminders", "Location Sharing"] },
      { title: "Pet Family Manager", subtitle: "Complete family pet care system", category: "family", monthly_revenue: 75000, esg_score: 90, users_count: 33000, starting_bid: 30000, features: ["Health Records", "Feeding Schedule", "Vet Appointments"] },
      { title: "Family Safety Network", subtitle: "Location tracking and emergency alerts", category: "family", monthly_revenue: 95000, esg_score: 85, users_count: 28000, starting_bid: 40000, features: ["Location Tracking", "Emergency Alerts", "Safe Zone Notifications"] },
      { title: "Screen Time Manager", subtitle: "Healthy device usage for families", category: "family", monthly_revenue: 80000, esg_score: 90, users_count: 48000, starting_bid: 32000, features: ["Usage Limits", "Content Filtering", "Activity Reports"] },
      { title: "Family Photo Albums", subtitle: "Secure family photo sharing and storage", category: "family", monthly_revenue: 90000, esg_score: 85, users_count: 65000, starting_bid: 38000, features: ["Unlimited Storage", "Face Recognition", "Memory Sharing"] },
      { title: "Allowance Tracker", subtitle: "Digital allowance and savings for kids", category: "family", monthly_revenue: 45000, esg_score: 95, users_count: 35000, starting_bid: 18000, features: ["Virtual Allowance", "Savings Goals", "Spending Insights"] },
      { title: "Family Game Night", subtitle: "Digital board games for families", category: "family", monthly_revenue: 60000, esg_score: 80, users_count: 41000, starting_bid: 24000, features: ["Classic Games", "Video Chat", "Tournament Mode"] },
      { title: "Homework Helper", subtitle: "AI-powered homework assistance", category: "family", monthly_revenue: 105000, esg_score: 90, users_count: 72000, starting_bid: 45000, features: ["Subject Help", "Progress Tracking", "Parent Reports"] },
      { title: "Family Health Tracker", subtitle: "Health monitoring for the whole family", category: "family", monthly_revenue: 110000, esg_score: 95, users_count: 38000, starting_bid: 48000, features: ["Health Records", "Appointment Scheduling", "Medication Reminders"] },
      { title: "Bedtime Story Creator", subtitle: "AI-generated personalized bedtime stories", category: "family", monthly_revenue: 75000, esg_score: 90, users_count: 45000, starting_bid: 30000, features: ["Custom Stories", "Voice Narration", "Illustration"] },
      { title: "Family Travel Planner", subtitle: "Kid-friendly travel planning assistant", category: "family", monthly_revenue: 85000, esg_score: 85, users_count: 25000, starting_bid: 35000, features: ["Family Activities", "Kid-friendly Places", "Budget Planning"] },
      { title: "Grandparent Bridge", subtitle: "Connect grandparents with grandchildren", category: "family", monthly_revenue: 50000, esg_score: 95, users_count: 28000, starting_bid: 20000, features: ["Video Calls", "Story Sharing", "Memory Books"] },
      { title: "Family Fitness Tracker", subtitle: "Fun fitness activities for families", category: "family", monthly_revenue: 70000, esg_score: 90, users_count: 34000, starting_bid: 28000, features: ["Family Challenges", "Activity Tracking", "Reward System"] },
      { title: "Teen Driving Monitor", subtitle: "Safe driving tracking for teen drivers", category: "family", monthly_revenue: 95000, esg_score: 85, users_count: 22000, starting_bid: 40000, features: ["Driving Analytics", "Safety Alerts", "Insurance Discounts"] },
      { title: "Family Shopping Assistant", subtitle: "Smart grocery shopping for families", category: "family", monthly_revenue: 65000, esg_score: 80, users_count: 51000, starting_bid: 26000, features: ["Smart Lists", "Budget Tracking", "Nutrition Info"] },
      { title: "Birthday Party Planner", subtitle: "Complete party planning for kids", category: "family", monthly_revenue: 55000, esg_score: 85, users_count: 32000, starting_bid: 22000, features: ["Party Templates", "Guest Management", "Activity Planning"] },

      // Education Category (20 platforms)
      { title: "AI Tutor Platform", subtitle: "Personalized AI-powered learning", category: "education", monthly_revenue: 280000, esg_score: 95, users_count: 150000, starting_bid: 140000, features: ["Adaptive Learning", "Progress Analytics", "Multi-subject Support"] },
      { title: "Virtual Laboratory", subtitle: "Safe virtual science experiments", category: "education", monthly_revenue: 220000, esg_score: 90, users_count: 85000, starting_bid: 110000, features: ["VR Labs", "Safety Protocols", "Experiment Library"] },
      { title: "Language Exchange Hub", subtitle: "Global language learning community", category: "education", monthly_revenue: 185000, esg_score: 85, users_count: 125000, starting_bid: 85000, features: ["Native Speakers", "Cultural Exchange", "Certification"] },
      { title: "Coding Academy Junior", subtitle: "Programming education for children", category: "education", monthly_revenue: 195000, esg_score: 90, users_count: 95000, starting_bid: 95000, features: ["Visual Programming", "Game Development", "Mentorship"] },
      { title: "History Time Machine", subtitle: "Immersive historical education", category: "education", monthly_revenue: 165000, esg_score: 85, users_count: 72000, starting_bid: 75000, features: ["VR History", "Interactive Timeline", "Primary Sources"] },
      { title: "Math Mastery Engine", subtitle: "Adaptive mathematics learning", category: "education", monthly_revenue: 210000, esg_score: 90, users_count: 110000, starting_bid: 105000, features: ["Adaptive Problems", "Visual Learning", "Progress Tracking"] },
      { title: "Art & Design Studio", subtitle: "Digital art education platform", category: "education", monthly_revenue: 145000, esg_score: 85, users_count: 65000, starting_bid: 65000, features: ["Digital Tools", "Master Classes", "Portfolio Building"] },
      { title: "Science Fair Manager", subtitle: "Complete science fair organization", category: "education", monthly_revenue: 95000, esg_score: 90, users_count: 45000, starting_bid: 42000, features: ["Project Management", "Judging System", "Collaboration Tools"] },
      { title: "Music Theory Trainer", subtitle: "Interactive music education", category: "education", monthly_revenue: 125000, esg_score: 85, users_count: 58000, starting_bid: 55000, features: ["Theory Lessons", "Ear Training", "Composition Tools"] },
      { title: "Geography Explorer", subtitle: "Interactive world geography learning", category: "education", monthly_revenue: 115000, esg_score: 90, users_count: 68000, starting_bid: 50000, features: ["Interactive Maps", "Cultural Studies", "Virtual Tours"] },
      { title: "Literature Analysis AI", subtitle: "AI-powered literature comprehension", category: "education", monthly_revenue: 175000, esg_score: 85, users_count: 82000, starting_bid: 80000, features: ["Text Analysis", "Critical Thinking", "Writing Assistance"] },
      { title: "Career Guidance Portal", subtitle: "AI-powered career counseling", category: "education", monthly_revenue: 200000, esg_score: 90, users_count: 95000, starting_bid: 100000, features: ["Skill Assessment", "Career Matching", "Industry Insights"] },
      { title: "Special Needs Learning", subtitle: "Adaptive learning for special needs", category: "education", monthly_revenue: 155000, esg_score: 95, users_count: 38000, starting_bid: 70000, features: ["Accessibility Tools", "Personalized Plans", "Progress Monitoring"] },
      { title: "Philosophy Discussion Forum", subtitle: "Guided philosophical discussions", category: "education", monthly_revenue: 85000, esg_score: 90, users_count: 25000, starting_bid: 38000, features: ["Socratic Method", "Critical Thinking", "Debate Platform"] },
      { title: "Environmental Science Lab", subtitle: "Hands-on environmental education", category: "education", monthly_revenue: 135000, esg_score: 95, users_count: 52000, starting_bid: 60000, features: ["Field Studies", "Data Collection", "Climate Education"] },
      { title: "Public Speaking Coach", subtitle: "AI-powered presentation training", category: "education", monthly_revenue: 105000, esg_score: 85, users_count: 42000, starting_bid: 45000, features: ["Speech Analysis", "Confidence Building", "Performance Metrics"] },
      { title: "Financial Literacy Hub", subtitle: "Money management education for students", category: "education", monthly_revenue: 120000, esg_score: 90, users_count: 65000, starting_bid: 52000, features: ["Budgeting Skills", "Investment Basics", "Real-world Scenarios"] },
      { title: "Study Group Organizer", subtitle: "Collaborative learning platform", category: "education", monthly_revenue: 90000, esg_score: 85, users_count: 78000, starting_bid: 40000, features: ["Group Formation", "Study Materials", "Progress Sharing"] },
      { title: "Exam Preparation Suite", subtitle: "Comprehensive test preparation", category: "education", monthly_revenue: 225000, esg_score: 85, users_count: 125000, starting_bid: 115000, features: ["Practice Tests", "Performance Analytics", "Study Plans"] },
      { title: "Research Skills Trainer", subtitle: "Academic research methodology", category: "education", monthly_revenue: 165000, esg_score: 90, users_count: 55000, starting_bid: 75000, features: ["Source Evaluation", "Citation Tools", "Methodology Training"] },

      // Documentary Category (20 platforms)
      { title: "Climate Change Chronicles", subtitle: "Real-time climate impact documentation", category: "documentary", monthly_revenue: 245000, esg_score: 95, users_count: 85000, starting_bid: 120000, features: ["Live Data", "Scientific Reports", "Global Coverage"] },
      { title: "Wildlife Conservation Tracker", subtitle: "Global wildlife protection efforts", category: "documentary", monthly_revenue: 185000, esg_score: 90, users_count: 65000, starting_bid: 85000, features: ["Species Tracking", "Conservation Updates", "Researcher Access"] },
      { title: "Human Rights Monitor", subtitle: "Global human rights documentation", category: "documentary", monthly_revenue: 295000, esg_score: 95, users_count: 75000, starting_bid: 145000, features: ["Rights Tracking", "Incident Reports", "Advocacy Tools"] },
      { title: "Ocean Health Tracker", subtitle: "Marine ecosystem documentation", category: "documentary", monthly_revenue: 165000, esg_score: 90, users_count: 48000, starting_bid: 75000, features: ["Marine Data", "Pollution Tracking", "Research Collaboration"] },
      { title: "Urban Development Archive", subtitle: "City growth and development documentation", category: "documentary", monthly_revenue: 135000, esg_score: 80, users_count: 42000, starting_bid: 60000, features: ["Time-lapse Data", "Planning Documents", "Community Impact"] },
      { title: "Cultural Heritage Preserve", subtitle: "Digital preservation of world cultures", category: "documentary", monthly_revenue: 155000, esg_score: 85, users_count: 35000, starting_bid: 70000, features: ["Cultural Archives", "Oral Histories", "Digital Artifacts"] },
      { title: "Space Exploration Log", subtitle: "Real-time space mission documentation", category: "documentary", monthly_revenue: 275000, esg_score: 80, users_count: 95000, starting_bid: 135000, features: ["Mission Data", "Scientific Results", "Public Access"] },
      { title: "Pandemic Response Archive", subtitle: "Global health crisis documentation", category: "documentary", monthly_revenue: 225000, esg_score: 90, users_count: 68000, starting_bid: 110000, features: ["Health Data", "Response Strategies", "Lessons Learned"] },
      { title: "Innovation Timeline", subtitle: "Technology advancement documentation", category: "documentary", monthly_revenue: 195000, esg_score: 75, users_count: 58000, starting_bid: 95000, features: ["Patent Tracking", "Innovation Stories", "Impact Analysis"] },
      { title: "Social Movement Tracker", subtitle: "Documentation of social change movements", category: "documentary", monthly_revenue: 175000, esg_score: 90, users_count: 52000, starting_bid: 80000, features: ["Movement History", "Impact Metrics", "Participant Stories"] },
      { title: "Economic Shift Monitor", subtitle: "Global economic transformation tracking", category: "documentary", monthly_revenue: 315000, esg_score: 80, users_count: 85000, starting_bid: 155000, features: ["Economic Data", "Market Analysis", "Policy Impact"] },
      { title: "Education Evolution Archive", subtitle: "Global education system changes", category: "documentary", monthly_revenue: 145000, esg_score: 85, users_count: 45000, starting_bid: 65000, features: ["Education Data", "Policy Changes", "Outcome Tracking"] },
      { title: "Energy Transition Monitor", subtitle: "Renewable energy adoption tracking", category: "documentary", monthly_revenue: 205000, esg_score: 95, users_count: 62000, starting_bid: 100000, features: ["Energy Data", "Policy Tracking", "Technology Progress"] },
      { title: "Food Security Tracker", subtitle: "Global food system documentation", category: "documentary", monthly_revenue: 165000, esg_score: 90, users_count: 48000, starting_bid: 75000, features: ["Food Data", "Supply Chains", "Sustainability Metrics"] },
      { title: "Democracy Index Monitor", subtitle: "Global democratic process tracking", category: "documentary", monthly_revenue: 255000, esg_score: 85, users_count: 72000, starting_bid: 125000, features: ["Democracy Metrics", "Election Data", "Freedom Indices"] },
      { title: "Scientific Discovery Archive", subtitle: "Real-time research breakthrough documentation", category: "documentary", monthly_revenue: 185000, esg_score: 85, users_count: 55000, starting_bid: 85000, features: ["Research Tracking", "Publication Data", "Impact Analysis"] },
      { title: "Refugee Crisis Monitor", subtitle: "Global displacement and migration tracking", category: "documentary", monthly_revenue: 135000, esg_score: 95, users_count: 38000, starting_bid: 60000, features: ["Migration Data", "Crisis Updates", "Aid Coordination"] },
      { title: "Gender Equality Tracker", subtitle: "Global gender parity documentation", category: "documentary", monthly_revenue: 175000, esg_score: 90, users_count: 58000, starting_bid: 80000, features: ["Equality Metrics", "Policy Tracking", "Progress Reports"] },
      { title: "Aging Population Study", subtitle: "Global demographic shift documentation", category: "documentary", monthly_revenue: 155000, esg_score: 85, users_count: 42000, starting_bid: 70000, features: ["Demographic Data", "Healthcare Impact", "Social Policy"] },
      { title: "Digital Rights Archive", subtitle: "Online freedom and privacy documentation", category: "documentary", monthly_revenue: 195000, esg_score: 90, users_count: 65000, starting_bid: 95000, features: ["Privacy Rights", "Censorship Tracking", "Digital Freedom"] }
    ];

    // Insert platforms in batches to avoid timeout
    const batchSize = 10;
    for (let i = 0; i < platforms.length; i += batchSize) {
      const batch = platforms.slice(i, i + batchSize).map(platform => ({
        ...platform,
        user_id: user?.id,
        auction_start_date: new Date().toISOString(),
        auction_end_date: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Random end date within 7 days
        current_bid: platform.starting_bid + Math.floor(Math.random() * platform.starting_bid * 0.5), // Random current bid
        auction_status: 'active',
        description: `${platform.subtitle} - A cutting-edge platform in the ${platform.category} category.`
      }));

      const { error } = await supabase
        .from('auction_platforms')
        .insert(batch);

      if (error) {
        console.error('Error creating platforms batch:', error);
        throw error;
      }
    }

    toast({
      title: "Success! 🚀",
      description: "100 auction platforms created successfully across all categories!"
    });
  };

  // Auto-rotate auctions
  useEffect(() => {
    if (auctions.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentAuctionIndex((prev) => (prev + 1) % auctions.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [auctions.length]);

  const handleBid = async () => {
    if (!user || !bidAmount || bidding) return;
    
    const currentAuction = auctions[currentAuctionIndex];
    const newBidAmount = parseFloat(bidAmount);
    
    if (newBidAmount <= currentAuction.current_bid) {
      toast({
        title: "Invalid Bid",
        description: "Bid must be higher than current bid",
        variant: "destructive"
      });
      return;
    }

    setBidding(true);
    
    try {
      const { error } = await supabase
        .from('auction_bids')
        .insert({
          auction_id: currentAuction.id,
          bidder_id: user.id,
          bid_amount: newBidAmount
        });

      if (error) throw error;

      toast({
        title: "Bid Placed! 🎉",
        description: `Successfully bid $${newBidAmount.toLocaleString()} on ${currentAuction.title}`,
      });

      setBidAmount('');
      await loadAuctions(); // Refresh to get updated bid
    } catch (error: any) {
      toast({
        title: "Bid Failed",
        description: error.message || "Failed to place bid",
        variant: "destructive"
      });
    } finally {
      setBidding(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "Successfully logged out of Sustano-Sphere",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-950 to-teal-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading Sustano-Sphere...</div>
      </div>
    );
  }

  const currentAuction = auctions[currentAuctionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-950 to-teal-950 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/8 via-emerald-500/5 to-teal-500/8"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400/15 to-emerald-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-4">
            {userProfile && (
              <div className="text-right">
                <p className="text-slate-300 text-sm">Welcome back,</p>
                <p className="text-white font-medium">{userProfile.display_name}</p>
              </div>
            )}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <Badge className="bg-green-500 text-white animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              LIVE AUCTIONS
            </Badge>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
              Sustano-Sphere™
            </h1>
            <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-500 rounded-full flex items-center justify-center shadow-2xl">
              <Globe className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <p className="text-2xl text-slate-200 mb-6 max-w-4xl mx-auto">
            The world's first ESG-integrated digital asset auction platform
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 text-lg font-bold">
              <Gamepad2 className="h-5 w-5 mr-2" />
              Live Auctions
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 text-lg font-bold">
              <Award className="h-5 w-5 mr-2" />
              ESG Certified
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-6 py-3 text-lg font-bold">
              <Brain className="h-5 w-5 mr-2" />
              Real Bidding
            </Badge>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-green-500/30 text-white">
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-300">{liveData.totalAuctions}</div>
              <div className="text-sm text-gray-300">Live Auctions</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-blue-500/30 text-white">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-300">{liveData.avgEsgScore}/100</div>
              <div className="text-sm text-gray-300">Avg ESG Score</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-300">{liveData.bidders}</div>
              <div className="text-sm text-gray-300">Active Bidders</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-orange-500/30 text-white">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-12 w-12 text-orange-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-orange-300">{formatCurrency(liveData.volume)}</div>
              <div className="text-sm text-gray-300">Total Volume</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Auction Area */}
        {currentAuction ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
            {/* Live Auction */}
            <Card className="xl:col-span-2 bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="animate-pulse bg-green-500 w-4 h-4 rounded-full"></div>
                    <CardTitle className="text-white text-2xl">LIVE ESG AUCTION</CardTitle>
                    <Badge className="bg-green-500 text-white">
                      <Leaf className="h-4 w-4 mr-2" />
                      ESG: {currentAuction.esg_score}/100
                    </Badge>
                  </div>
                  <div className="text-slate-300">
                    <Activity className="h-5 w-5 inline mr-2" />
                    {liveData.bidders} bidders
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Asset Display */}
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{currentAuction.title}</h3>
                      <p className="text-slate-300">{currentAuction.subtitle}</p>
                      <div className="flex gap-2 mt-2">
                        {currentAuction.features.map((feature: string, index: number) => (
                          <span key={index} className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-sm">Current Bid</p>
                      <p className="text-3xl font-bold text-green-300">{formatCurrency(currentAuction.current_bid)}</p>
                      <p className="text-slate-400 text-sm">{currentAuction.users_count.toLocaleString()} users</p>
                    </div>
                  </div>

                  {/* ESG Score Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">ESG Score</span>
                      <span className="text-green-300">{currentAuction.esg_score}/100</span>
                    </div>
                    <Progress value={currentAuction.esg_score} className="h-3" />
                  </div>
                </div>

                {/* Bidding Interface */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={`Minimum: ${formatCurrency(currentAuction.current_bid + 1000)}`}
                      className="flex-1 bg-gray-800 border-gray-600 text-white"
                    />
                    <Button 
                      onClick={handleBid}
                      disabled={!bidAmount || bidding}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-8"
                    >
                      {bidding ? 'Bidding...' : 'Place Bid'}
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    💡 Tip: Bid strategically - ESG scores affect final value!
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Widget */}
            <Card className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 border-green-500/30 text-white">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Your Bidding Stats</CardTitle>
                    <p className="text-green-300 text-sm">Real-time performance</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Total Bids</span>
                    <span className="text-white font-bold">{userProfile?.total_bids || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Auctions Won</span>
                    <span className="text-green-300 font-bold">{userProfile?.total_wins || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Success Rate</span>
                    <span className="text-blue-300 font-bold">
                      {userProfile?.total_bids > 0 ? Math.round((userProfile.total_wins / userProfile.total_bids) * 100) : 0}%
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-600">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600">
                    <Trophy className="h-4 w-4 mr-2" />
                    View All Auctions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-slate-300">No active auctions at the moment</p>
            <p className="text-slate-400">Check back soon for new ESG platform auctions!</p>
          </div>
        )}

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 border-0 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Bidding on Sustainable Platforms</h2>
            <p className="text-xl mb-6 opacity-90">
              Join the world's first ESG-integrated digital asset marketplace
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 font-bold"
                onClick={() => navigate('/ceo-chess')}
              >
                <Crown className="h-5 w-5 mr-2" />
                CEO Chess Challenge
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/eternum-hunt')}
              >
                <Brain className="h-5 w-5 mr-2" />
                Eternum Mystery Hunt
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SustanoSphereDemo;