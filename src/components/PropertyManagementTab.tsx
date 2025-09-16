/**
 * ============================================================================
 * Property Management Tab Component
 * Professional services hub for property managers
 * ============================================================================
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Building, Users, Wrench, DollarSign, Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const PropertyManagementTab = () => {
  const [rentalYield, setRentalYield] = useState('');
  const [managementFee, setManagementFee] = useState('8.0');

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Building className="h-6 w-6 text-primary" />
          Property Management Hub
        </h2>
        <p className="text-muted-foreground">Comprehensive tools for property managers</p>
      </div>

      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Managed Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { address: '15 Garden St, Suburb', rent: '$580/week', status: 'Occupied', tenant: 'John & Mary Smith' },
                  { address: '22 Park Ave, Suburb', rent: '$750/week', status: 'Vacant', tenant: 'Available Now' },
                  { address: '8 River Rd, Suburb', rent: '$420/week', status: 'Occupied', tenant: 'Sarah Johnson' }
                ].map((property, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{property.address}</h4>
                        <p className="text-2xl font-bold text-primary">{property.rent}</p>
                        <p className="text-sm text-muted-foreground">{property.tenant}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={property.status === 'Occupied' ? "default" : "secondary"}>
                          {property.status}
                        </Badge>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm">Manage</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tenants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Tenant Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'John & Mary Smith', property: '15 Garden St', lease: 'Expires 15/06/2025', status: 'Current' },
                  { name: 'Sarah Johnson', property: '8 River Rd', lease: 'Expires 22/03/2025', status: 'Current' },
                  { name: 'Mike Wilson', property: '22 Park Ave', lease: 'Ended 10/01/2025', status: 'Former' }
                ].map((tenant, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{tenant.name}</h4>
                          <p className="text-sm text-muted-foreground">{tenant.property}</p>
                          <p className="text-sm text-blue-600">{tenant.lease}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={tenant.status === 'Current' ? "default" : "secondary"}>
                          {tenant.status}
                        </Badge>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">Contact</Button>
                          <Button size="sm">Profile</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                Maintenance Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { issue: 'Leaking kitchen tap', property: '15 Garden St', priority: 'High', status: 'Pending' },
                  { issue: 'Broken air conditioning', property: '8 River Rd', priority: 'Medium', status: 'In Progress' },
                  { issue: 'Garden maintenance', property: '22 Park Ave', priority: 'Low', status: 'Scheduled' }
                ].map((request, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          request.priority === 'High' ? 'bg-red-100' : 
                          request.priority === 'Medium' ? 'bg-orange-100' : 'bg-green-100'
                        }`}>
                          {request.status === 'In Progress' ? 
                            <Clock className={`h-5 w-5 ${request.priority === 'High' ? 'text-red-600' : 
                              request.priority === 'Medium' ? 'text-orange-600' : 'text-green-600'}`} /> :
                            <Wrench className={`h-5 w-5 ${request.priority === 'High' ? 'text-red-600' : 
                              request.priority === 'Medium' ? 'text-orange-600' : 'text-green-600'}`} />
                          }
                        </div>
                        <div>
                          <h4 className="font-semibold">{request.issue}</h4>
                          <p className="text-sm text-muted-foreground">{request.property}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={request.priority === 'High' ? "destructive" : 
                          request.priority === 'Medium' ? "default" : "secondary"}>
                          {request.priority} Priority
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{request.status}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Financial Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <Card className="p-4 text-center">
                  <Building className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-muted-foreground">Monthly Rent Collected</h4>
                  <p className="text-xl font-bold">$7,350</p>
                </Card>
                <Card className="p-4 text-center">
                  <AlertTriangle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-muted-foreground">Outstanding Rent</h4>
                  <p className="text-xl font-bold">$580</p>
                </Card>
                <Card className="p-4 text-center">
                  <Wrench className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-muted-foreground">Maintenance Costs</h4>
                  <p className="text-xl font-bold">$1,245</p>
                </Card>
                <Card className="p-4 text-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-muted-foreground">Management Fees</h4>
                  <p className="text-xl font-bold">$588</p>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Yield Calculator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Weekly Rent</Label>
                      <Input placeholder="$580" />
                    </div>
                    <div>
                      <Label>Property Value</Label>
                      <Input placeholder="$850,000" />
                    </div>
                    <div>
                      <Label>Management Fee (%)</Label>
                      <Select value={managementFee} onValueChange={setManagementFee}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6.0">6.0%</SelectItem>
                          <SelectItem value="7.0">7.0%</SelectItem>
                          <SelectItem value="8.0">8.0%</SelectItem>
                          <SelectItem value="9.0">9.0%</SelectItem>
                          <SelectItem value="10.0">10.0%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Card className="p-4">
                      <h4 className="font-semibold text-sm text-muted-foreground">Gross Yield</h4>
                      <p className="text-2xl font-bold text-primary">5.2%</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-semibold text-sm text-muted-foreground">Net Yield (After Fees)</h4>
                      <p className="text-2xl font-bold text-green-600">4.8%</p>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Professional Licensing Notice */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/30 mt-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <Building className="h-5 w-5 text-green-600" />
            <h4 className="font-medium text-green-800 dark:text-green-200">
              Property Management Licensing
            </h4>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300 mb-3">
            Property management activities may require real estate licensing depending on your state. Verify local requirements.
          </p>
          <a 
            href="/licensing-hub" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
          >
            <Building className="h-4 w-4" />
            View Licensing Hub
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyManagementTab;