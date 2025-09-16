/**
 * ============================================================================
 * Reality Sales Tab Component
 * Professional services hub for real estate sales agents
 * ============================================================================
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Users, Calendar, DollarSign, MapPin, Phone, Mail, Star } from 'lucide-react';

const RealitySalesTab = () => {
  const [propertyPrice, setPropertyPrice] = useState('');
  const [commission, setCommission] = useState('2.5');

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          Reality Sales Hub
        </h2>
        <p className="text-muted-foreground">Professional tools for real estate sales agents</p>
      </div>

      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="leads">Lead Management</TabsTrigger>
          <TabsTrigger value="commission">Commission Calc</TabsTrigger>
          <TabsTrigger value="market">Market Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Active Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { address: '123 Main St, Suburb', price: '$850,000', status: 'Active', days: '14 days' },
                  { address: '456 Oak Ave, Suburb', price: '$1,200,000', status: 'Under Offer', days: '7 days' },
                  { address: '789 Pine Rd, Suburb', price: '$650,000', status: 'Active', days: '28 days' }
                ].map((listing, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{listing.address}</h4>
                        <p className="text-2xl font-bold text-primary">{listing.price}</p>
                        <p className="text-sm text-muted-foreground">Listed {listing.days} ago</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={listing.status === 'Active' ? "default" : "secondary"}>
                          {listing.status}
                        </Badge>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Lead Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Emma Thompson', status: 'Hot Lead', property: '123 Main St', contact: 'emma@email.com' },
                  { name: 'James Wilson', status: 'Warm Lead', property: '456 Oak Ave', contact: '0412 345 678' },
                  { name: 'Lisa Chen', status: 'New Inquiry', property: '789 Pine Rd', contact: 'lisa@email.com' }
                ].map((lead, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{lead.name}</h4>
                          <p className="text-sm text-muted-foreground">Interested in {lead.property}</p>
                          <p className="text-sm text-primary">{lead.contact}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={idx === 0 ? "destructive" : idx === 1 ? "default" : "secondary"}>
                          {lead.status}
                        </Badge>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Commission Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Property Sale Price</Label>
                  <Input 
                    placeholder="$850,000" 
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Commission Rate (%)</Label>
                  <Select value={commission} onValueChange={setCommission}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2.0">2.0%</SelectItem>
                      <SelectItem value="2.5">2.5%</SelectItem>
                      <SelectItem value="3.0">3.0%</SelectItem>
                      <SelectItem value="3.5">3.5%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Card className="p-4">
                  <h4 className="font-semibold text-sm text-muted-foreground">Gross Commission</h4>
                  <p className="text-2xl font-bold text-primary">$21,250</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold text-sm text-muted-foreground">Your Split (70%)</h4>
                  <p className="text-2xl font-bold text-green-600">$14,875</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Market Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                  <Building2 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-muted-foreground">Median Price</h4>
                  <p className="text-xl font-bold">$875,000</p>
                </Card>
                <Card className="p-4 text-center">
                  <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-muted-foreground">Days on Market</h4>
                  <p className="text-xl font-bold">32</p>
                </Card>
                <Card className="p-4 text-center">
                  <Star className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-muted-foreground">Clearance Rate</h4>
                  <p className="text-xl font-bold">78%</p>
                </Card>
                <Card className="p-4 text-center">
                  <DollarSign className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-muted-foreground">Price Growth</h4>
                  <p className="text-xl font-bold">+5.2%</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Professional Licensing Notice */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/30 mt-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium text-blue-800 dark:text-blue-200">
              Real Estate Licensing Required
            </h4>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
            Real estate sales activities require appropriate state-based licensing. Ensure compliance with local regulations.
          </p>
          <a 
            href="/licensing-hub" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            <Building2 className="h-4 w-4" />
            View Licensing Hub
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealitySalesTab;