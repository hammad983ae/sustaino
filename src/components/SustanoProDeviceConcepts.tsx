import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Smartphone, Cpu, Battery, Wifi, Lock, Eye, Zap, Star, Copyright, FileCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SustanoProDeviceConcepts = () => {
  const { toast } = useToast();
  const [selectedDevice, setSelectedDevice] = useState("handheld");

  const deviceSpecs = {
    handheld: {
      name: "Sustaino Pro Handheld™",
      model: "SPH-2025",
      dimensions: "165 × 75 × 12mm",
      weight: "320g",
      display: "6.5\" OLED Secure Display",
      processor: "Quantum Security Chip ARM-X1",
      storage: "256GB Encrypted",
      battery: "5000mAh Fast Charge",
      security: "Military-Grade Encryption",
      connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
      sensors: "LiDAR, Thermal, Environmental",
      price: "$2,499"
    },
    tablet: {
      name: "Sustaino Pro Tablet™",
      model: "SPT-2025",
      dimensions: "280 × 200 × 8mm",
      weight: "680g",
      display: "12.1\" 4K Secure Touch",
      processor: "Quantum Security Chip ARM-X2",
      storage: "512GB Encrypted",
      battery: "8000mAh Wireless Charge",
      security: "Biometric + Hardware Security",
      connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
      sensors: "Advanced LiDAR Array",
      price: "$3,999"
    }
  };

  const handleIPProtection = (type: string) => {
    toast({
      title: `${type} Protection Initiated`,
      description: `Sustaino Pro ${type} filing has been initiated with IP attorneys`,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <Smartphone className="w-10 h-10" />
            Sustaino Pro™ Device Ecosystem
          </CardTitle>
          <p className="text-emerald-100 text-lg">
            Revolutionary handheld platform for exclusive access to Sustaino Pro's premium valuation and analysis suite
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="devices" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/90 border border-slate-600">
          <TabsTrigger value="devices" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">Devices</TabsTrigger>
          <TabsTrigger value="security" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">Security</TabsTrigger>
          <TabsTrigger value="subscription" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">Subscription</TabsTrigger>
          <TabsTrigger value="ip-protection" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">IP Protection</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(deviceSpecs).map(([key, device]) => (
              <Card 
                key={key} 
                className={`cursor-pointer transition-all duration-300 ${
                  selectedDevice === key ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedDevice(key)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {key === 'handheld' ? <Smartphone className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                      {device.name}
                    </span>
                    <Badge variant="secondary">{device.model}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-muted-foreground">Display</div>
                      <div>{device.display}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-muted-foreground">Processor</div>
                      <div>{device.processor}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-muted-foreground">Storage</div>
                      <div>{device.storage}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-muted-foreground">Battery</div>
                      <div>{device.battery}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Secure Platform</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">{device.price}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Exclusive Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Lock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Hardware Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Military-grade encryption with hardware security modules
                  </p>
                </div>
                
                <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold mb-2">Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimized for complex valuation calculations and AI processing
                  </p>
                </div>
                
                <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Star className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="font-semibold mb-2">Exclusive Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Premium features only available on Sustaino Pro devices
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Security Architecture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="font-medium">Hardware Security Module</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="font-medium">Biometric Authentication</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="font-medium">End-to-End Encryption</span>
                    <Badge className="bg-green-100 text-green-800">AES-256</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="font-medium">Secure Boot Process</span>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Data Protection</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      All client data is encrypted and never stored in the cloud
                    </p>
                  </div>
                  
                  <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Compliance</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Meets financial services and privacy regulations
                    </p>
                  </div>
                  
                  <div className="p-4 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Professional Trust</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Bank-level security for professional valuations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-blue-500">
              <CardHeader>
                <CardTitle className="text-center">
                  <Badge className="bg-blue-100 text-blue-800 mb-2">Professional</Badge>
                  <div className="text-2xl font-bold">$299/month</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Standard Sustaino Pro access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    50 valuations per month
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Basic AI assistant
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Standard support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-500 scale-105 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">
                  <Badge className="bg-purple-100 text-purple-800 mb-2">Premium</Badge>
                  <div className="text-2xl font-bold">$599/month</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Full Sustaino Pro platform
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Unlimited valuations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Advanced AI features
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Device warranty
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-gold-500">
              <CardHeader>
                <CardTitle className="text-center">
                  <Badge className="bg-yellow-100 text-yellow-800 mb-2">Enterprise</Badge>
                  <div className="text-2xl font-bold">$1,299/month</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Multi-device access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Team collaboration
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Custom integrations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Dedicated support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Advanced analytics
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">Platform Exclusivity</h4>
                  <p className="text-sm text-muted-foreground">
                    Sustaino Pro will only be available on certified devices, ensuring security and performance
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Regular Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Monthly platform updates with new features and market data integrations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ip-protection" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Copyright className="w-6 h-6" />
                  Intellectual Property Portfolio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleIPProtection('Trademark')}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <FileCheck className="w-4 h-4 mr-2" />
                    Sustaino Pro™ Trademark Registration
                  </Button>
                  
                  <Button 
                    onClick={() => handleIPProtection('Patent')}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Hardware Security Module Patent
                  </Button>
                  
                  <Button 
                    onClick={() => handleIPProtection('Patent')}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Cpu className="w-4 h-4 mr-2" />
                    Device Architecture Patent
                  </Button>
                  
                  <Button 
                    onClick={() => handleIPProtection('Copyright')}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Copyright className="w-4 h-4 mr-2" />
                    Software Platform Copyright
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Protection Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Brand Protection</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Sustaino Pro™ trademark registration</li>
                      <li>• Logo and brand identity protection</li>
                      <li>• Domain name portfolio</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Technology Patents</h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Hardware security innovations</li>
                      <li>• Device architecture design</li>
                      <li>• Exclusive platform integration</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Trade Secrets</h4>
                    <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                      <li>• Proprietary algorithms</li>
                      <li>• Security protocols</li>
                      <li>• Manufacturing processes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Strategic Advantages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                  <Lock className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Market Exclusivity</h3>
                  <p className="text-sm text-muted-foreground">
                    Proprietary platform accessible only through certified devices
                  </p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold mb-2">Security Leadership</h3>
                  <p className="text-sm text-muted-foreground">
                    Industry-leading security standards for professional users
                  </p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                  <Star className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="font-semibold mb-2">Premium Positioning</h3>
                  <p className="text-sm text-muted-foreground">
                    Exclusive access model creates premium market position
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SustanoProDeviceConcepts;