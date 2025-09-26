import { supabase } from "@/integrations/supabase/client";

export const clearAuthError = async () => {
  try {
    // Sign out to clear any bad tokens
    await supabase.auth.signOut();
    
    // Clear URL parameters that might contain invalid tokens
    const url = new URL(window.location.href);
    const hasAuthParams = url.searchParams.has('access_token') || 
                         url.searchParams.has('refresh_token') || 
                         url.searchParams.has('error');
    
    if (hasAuthParams) {
      // Remove auth-related parameters
      url.searchParams.delete('access_token');
      url.searchParams.delete('refresh_token');
      url.searchParams.delete('type');
      url.searchParams.delete('error');
      url.searchParams.delete('error_description');
      url.searchParams.delete('error_code');
      
      // Update the URL without these parameters
      window.history.replaceState({}, document.title, url.pathname);
    }
    
    // Clear any stored auth data
    localStorage.removeItem('sb-cxcfxnbvtddwebqprile-auth-token');
    sessionStorage.clear();
    
    console.log('Authentication state cleared');
    return true;
  } catch (error) {
    console.error('Error clearing auth state:', error);
    return false;
  }
};

export const handleAuthTokenError = async () => {
  // First try to clear the error
  await clearAuthError();
  
  // Refresh the page to start clean
  window.location.reload();
};