/**
 * ============================================================================
 * Professional Licensing & Compliance Management Hub
 * Comprehensive system for managing AFSL, Credit License, and Real Estate Licenses
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Shield, AlertTriangle, CheckCircle, Building, FileText, Users, Crown, ExternalLink, Phone, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const ProfessionalLicensingHub = () => {
  const { toast } = useToast();
  const [licenses, setLicenses] = useState([]);
  const [complianceItems, setComplianceItems] = useState([]);
  const [aggregatorRelationships, setAggregatorRelationships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newLicense, setNewLicense] = useState({
    license_type: '',
    license_holder_name: '',
    issuing_authority: '',
    issue_date: null,
    expiry_date: null,
    license_number: '',
    license_status: 'pending'
  });

  useEffect(() => {
    fetchLicensingData();
  }, []);

  const fetchLicensingData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [licensesResponse, complianceResponse, aggregatorResponse] = await Promise.all([
        supabase.from('business_licenses').select('*').eq('user_id', user.id),
        supabase.from('compliance_requirements').select('*'),
        supabase.from('aggregator_relationships').select('*').eq('user_id', user.id)
      ]);

      setLicenses(licensesResponse.data || []);
      setComplianceItems(complianceResponse.data || []);
      setAggregatorRelationships(aggregatorResponse.data || []);
    } catch (error) {
      console.error('Error fetching licensing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createLicense = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: "Please log in", variant: "destructive" });
        return;
      }

      const { data, error } = await supabase
        .from('business_licenses')
        .insert([{ ...newLicense, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      setLicenses([...licenses, data]);
      setNewLicense({
        license_type: '',
        license_holder_name: '',
        issuing_authority: '',
        issue_date: null,
        expiry_date: null,
        license_number: '',
        license_status: 'pending'
      });

      toast({ title: "License added successfully!" });
    } catch (error) {
      toast({ title: "Error adding license", description: error.message, variant: "destructive" });
    }
  };

  const getLicenseStatusColor = (status) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'expired': return 'destructive';
      case 'suspended': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRegulatoryInfo = () => [
    {
      type: 'AFSL',
      name: 'Australian Financial Services License',
      authority: 'ASIC (Australian Securities and Investments Commission)',
      website: 'https://asic.gov.au',
      phone: '1300 300 630',
      purpose: 'Required for providing financial services including mortgage broking',
      applicationFee: '$3,160',
      annualFee: '$2,440',
      processingTime: '3-6 months'
    },
    {
      type: 'Credit License',
      name: 'Australian Credit License',
      authority: 'ASIC',
      website: 'https://asic.gov.au',
      phone: '1300 300 630',
      purpose: 'Required for credit activities including mortgage broking',
      applicationFee: '$2,530',
      annualFee: '$1,940',
      processingTime: '3-6 months'
    },
    {
      type: 'Real Estate License',
      name: 'Real Estate Agent License',
      authority: 'State-based (e.g., NSW Fair Trading)',
      website: 'https://www.fairtrading.nsw.gov.au',
      phone: '13 32 20',
      purpose: 'Required for real estate sales and property management',
      applicationFee: '$265',
      annualFee: '$265',
      processingTime: '4-6 weeks'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Crown className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Professional Licensing Hub</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive licensing and compliance management for AFSL, Credit License, and Real Estate operations
        </p>
        
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-600">
            AFSL Ready
          </Badge>
          <Badge variant="secondary" className="bg-green-500/10 text-green-600">
            Credit License Ready
          </Badge>
          <Badge variant="secondary" className="bg-purple-500/10 text-purple-600">
            Real Estate Licensed
          </Badge>
          <Badge variant="secondary" className="bg-orange-500/10 text-orange-600">
            Aggregator Platform
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="licenses">My Licenses</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="aggregator">Aggregator Setup</TabsTrigger>
          <TabsTrigger value="applications">Apply for Licenses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  AFSL Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {licenses.filter(l => l.license_type === 'AFSL' && l.license_status === 'active').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Active AFSL</p>
                  <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Credit License
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {licenses.filter(l => l.license_type === 'Credit License' && l.license_status === 'active').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Active Credit License</p>
                  <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-purple-600" />
                  Real Estate License
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {licenses.filter(l => l.license_type === 'Real Estate License' && l.license_status === 'active').length}
                  </div>
                  <p className="text-sm text-muted-foreground">Active RE License</p>
                  <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Shield className="h-6 w-6" />
                  <span className="text-sm">Apply for AFSL</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Credit License</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Building className="h-6 w-6" />
                  <span className="text-sm">RE License</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Join Aggregator</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licenses" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">My Licenses</h3>
            <Button onClick={() => fetchLicensingData()}>Refresh</Button>
          </div>

          <div className="space-y-4">
            {licenses.map((license) => (
              <Card key={license.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{license.license_type}</h4>
                        <p className="text-sm text-muted-foreground">{license.license_holder_name}</p>
                        <p className="text-sm text-blue-600">License #: {license.license_number || 'Pending'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getLicenseStatusColor(license.license_status)}>
                        {license.license_status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        Expires: {license.expiry_date ? format(new Date(license.expiry_date), 'dd/MM/yyyy') : 'N/A'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>License Application Information</CardTitle>
              <p className="text-sm text-muted-foreground">
                Information about regulatory authorities and application processes
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {getRegulatoryInfo().map((info) => (
                  <Card key={info.type} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{info.name}</h4>
                          <p className="text-sm text-muted-foreground">{info.purpose}</p>
                        </div>
                        <Badge variant="outline">{info.type}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="text-sm font-medium">Regulatory Authority</Label>
                          <p className="text-sm">{info.authority}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Processing Time</Label>
                          <p className="text-sm">{info.processingTime}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Application Fee</Label>
                          <p className="text-sm">{info.applicationFee}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Annual Fee</Label>
                          <p className="text-sm">{info.annualFee}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button variant="outline" size="sm" asChild>
                          <a href={info.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Visit Website
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {info.phone}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add License Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add License to Platform</CardTitle>
              <p className="text-sm text-muted-foreground">
                Track your licenses and compliance requirements
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>License Type</Label>
                  <Select 
                    value={newLicense.license_type} 
                    onValueChange={(value) => setNewLicense({...newLicense, license_type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select license type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AFSL">AFSL</SelectItem>
                      <SelectItem value="Credit License">Credit License</SelectItem>
                      <SelectItem value="Real Estate License">Real Estate License</SelectItem>
                      <SelectItem value="Property Management License">Property Management License</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>License Holder Name</Label>
                  <Input 
                    value={newLicense.license_holder_name}
                    onChange={(e) => setNewLicense({...newLicense, license_holder_name: e.target.value})}
                    placeholder="Your name or business name"
                  />
                </div>
                <div>
                  <Label>Issuing Authority</Label>
                  <Input 
                    value={newLicense.issuing_authority}
                    onChange={(e) => setNewLicense({...newLicense, issuing_authority: e.target.value})}
                    placeholder="e.g., ASIC, NSW Fair Trading"
                  />
                </div>
                <div>
                  <Label>License Number</Label>
                  <Input 
                    value={newLicense.license_number}
                    onChange={(e) => setNewLicense({...newLicense, license_number: e.target.value})}
                    placeholder="Enter license number"
                  />
                </div>
              </div>
              
              <Button onClick={createLicense} className="w-full">
                Add License to Platform
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Compliance Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Compliance Monitoring Active</h3>
                <p className="text-muted-foreground">
                  Add your licenses to start tracking compliance requirements and deadlines
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="aggregator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Aggregator Platform Setup
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Configure your platform as an aggregator for mortgage brokers and real estate agents
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Platform Aggregator Status</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  Your platform can operate as an aggregator once you have the appropriate licenses and aggregator relationships in place.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Platform infrastructure ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">AFSL/Credit License required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Aggregator agreements needed</span>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Aggregator Requirements Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      'Valid AFSL or become Credit Representative of AFSL holder',
                      'Australian Credit License or become Credit Representative',
                      'Professional Indemnity Insurance ($20M minimum)',
                      'Aggregator agreements with broker networks',
                      'Compliance management systems',
                      'Training and ongoing education programs',
                      'Audit and monitoring procedures'
                    ].map((requirement, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <span className="text-sm">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessionalLicensingHub;