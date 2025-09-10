import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Palette, 
  Upload, 
  Eye, 
  Shield,
  Save,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

const WhiteLabelConfig = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setSaving] = useState(false);
  const [config, setConfig] = useState({
    companyName: 'Sustaino Pro',
    companyLogo: '',
    primaryColor: '#10b981',
    secondaryColor: '#059669',
    accentColor: '#34d399',
    brandingEnabled: true,
    customFooter: '',
    contactEmail: '',
    supportPhone: '',
    websiteUrl: '',
    showPoweredBy: false,
    customDomain: '',
    reportHeader: '',
    reportFooter: '',
    emailSignature: ''
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save configuration to local storage for now
      localStorage.setItem('whiteLabelConfig', JSON.stringify(config));
      
      toast({
        title: "Configuration saved",
        description: "Your white label settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error saving configuration",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setConfig({
      companyName: 'Sustaino Pro',
      companyLogo: '',
      primaryColor: '#10b981',
      secondaryColor: '#059669',
      accentColor: '#34d399',
      brandingEnabled: true,
      customFooter: '',
      contactEmail: '',
      supportPhone: '',
      websiteUrl: '',
      showPoweredBy: false,
      customDomain: '',
      reportHeader: '',
      reportFooter: '',
      emailSignature: ''
    });
    toast({
      title: "Configuration reset",
      description: "All settings have been reset to defaults.",
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Main Dashboard
                </Link>
              </div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Settings className="h-8 w-8 text-primary" />
                White Label Configuration
              </h1>
              <p className="text-muted-foreground mt-2">
                Customize your platform branding and appearance
              </p>
            </div>
            <Badge variant="outline" className="text-primary border-primary">
              Platform Owner
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Configuration Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Branding */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Company Branding
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={config.companyName}
                        onChange={(e) => setConfig({...config, companyName: e.target.value})}
                        placeholder="Enter company name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={config.contactEmail}
                        onChange={(e) => setConfig({...config, contactEmail: e.target.value})}
                        placeholder="contact@company.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="supportPhone">Support Phone</Label>
                      <Input
                        id="supportPhone"
                        value={config.supportPhone}
                        onChange={(e) => setConfig({...config, supportPhone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="websiteUrl">Website URL</Label>
                      <Input
                        id="websiteUrl"
                        value={config.websiteUrl}
                        onChange={(e) => setConfig({...config, websiteUrl: e.target.value})}
                        placeholder="https://company.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Colors & Theme */}
              <Card>
                <CardHeader>
                  <CardTitle>Colors & Theme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={config.primaryColor}
                          onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={config.primaryColor}
                          onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                          placeholder="#10b981"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={config.secondaryColor}
                          onChange={(e) => setConfig({...config, secondaryColor: e.target.value})}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={config.secondaryColor}
                          onChange={(e) => setConfig({...config, secondaryColor: e.target.value})}
                          placeholder="#059669"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accentColor">Accent Color</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="accentColor"
                          type="color"
                          value={config.accentColor}
                          onChange={(e) => setConfig({...config, accentColor: e.target.value})}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={config.accentColor}
                          onChange={(e) => setConfig({...config, accentColor: e.target.value})}
                          placeholder="#34d399"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Report Customization */}
              <Card>
                <CardHeader>
                  <CardTitle>Report Customization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="reportHeader">Report Header Text</Label>
                    <Textarea
                      id="reportHeader"
                      value={config.reportHeader}
                      onChange={(e) => setConfig({...config, reportHeader: e.target.value})}
                      placeholder="Custom header text for reports"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reportFooter">Report Footer Text</Label>
                    <Textarea
                      id="reportFooter"
                      value={config.reportFooter}
                      onChange={(e) => setConfig({...config, reportFooter: e.target.value})}
                      placeholder="Custom footer text for reports"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Platform Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Custom Branding</Label>
                      <p className="text-sm text-muted-foreground">Apply your branding across the platform</p>
                    </div>
                    <Switch
                      checked={config.brandingEnabled}
                      onCheckedChange={(checked) => setConfig({...config, brandingEnabled: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show "Powered by" Badge</Label>
                      <p className="text-sm text-muted-foreground">Display platform attribution</p>
                    </div>
                    <Switch
                      checked={config.showPoweredBy}
                      onCheckedChange={(checked) => setConfig({...config, showPoweredBy: checked})}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview & Actions */}
            <div className="space-y-6">
              {/* Live Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div 
                      className="p-4 rounded-lg border"
                      style={{ 
                        backgroundColor: config.primaryColor + '10',
                        borderColor: config.primaryColor + '30'
                      }}
                    >
                      <h3 
                        className="font-semibold"
                        style={{ color: config.primaryColor }}
                      >
                        {config.companyName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Property Valuation Platform
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <div 
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: config.primaryColor }}
                      />
                      <div 
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: config.secondaryColor }}
                      />
                      <div 
                        className="w-8 h-8 rounded"
                        style={{ backgroundColor: config.accentColor }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleSave} 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Configuration
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset to Defaults
                  </Button>
                </CardContent>
              </Card>

              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Branding</span>
                      <Badge variant={config.brandingEnabled ? "default" : "secondary"}>
                        {config.brandingEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Company</span>
                      <Badge variant="outline">
                        {config.companyName || "Not set"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Theme</span>
                      <Badge variant="outline">
                        Custom
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteLabelConfig;