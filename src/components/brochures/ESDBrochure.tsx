/**
 * ESD (Ecologically Sustainable Development) Professional Brochure - PDF Ready
 * Comprehensive environmental sustainability and green development services
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, Droplets, Zap, Recycle, Sun, Wind,
  CheckCircle, Award, BarChart3, Target, TreePine,
  Phone, Mail, MapPin, FileText, Star, Shield
} from 'lucide-react';

const ESDBrochure = () => {
  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto print:p-0 print:max-w-none">
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-green-600 pb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl font-black text-green-900">
            ESD Services
          </h1>
        </div>
        <p className="text-2xl text-gray-700 font-bold mb-4">
          Ecologically Sustainable Development & Green Building Solutions
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-bold">
            🌱 Carbon Neutral
          </Badge>
          <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-bold">
            💧 Water Efficiency
          </Badge>
          <Badge className="bg-yellow-600 text-white px-4 py-2 text-sm font-bold">
            ⚡ Energy Optimization
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        {/* Core ESD Services */}
        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            Comprehensive ESD Solutions
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <Zap className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Energy Efficiency Assessment</h3>
                <p className="text-sm text-gray-700">Building energy performance optimization and renewable integration</p>
                <p className="text-xs text-green-600 font-semibold">• Solar analysis • HVAC optimization • Insulation design</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Droplets className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Water Management Systems</h3>
                <p className="text-sm text-gray-700">Sustainable water use, recycling and stormwater management</p>
                <p className="text-xs text-blue-600 font-semibold">• Rainwater harvesting • Greywater systems • WSUD</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <Recycle className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Waste Minimization</h3>
                <p className="text-sm text-gray-700">Construction and operational waste reduction strategies</p>
                <p className="text-xs text-orange-600 font-semibold">• Circular economy • Material selection • Lifecycle analysis</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <TreePine className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">Biodiversity & Landscaping</h3>
                <p className="text-sm text-gray-700">Native vegetation and ecological corridor integration</p>
                <p className="text-xs text-purple-600 font-semibold">• Native species • Green infrastructure • Habitat creation</p>
              </div>
            </div>
          </div>
        </div>

        {/* ESD Standards & Certifications */}
        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            Certification & Standards
          </h2>
          
          <div className="space-y-4">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-green-900 mb-3 flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Green Star Certification
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Design & As Built:</strong> New construction projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Performance:</strong> Existing building optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span><strong>Communities:</strong> Master-planned developments</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  NABERS Energy Rating
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Energy performance benchmarking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Water efficiency assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Waste management evaluation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardContent className="p-4">
                <h3 className="font-bold text-purple-900 mb-3 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Additional Standards
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>LEED certification support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>BREEAM assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Living Building Challenge</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ESD Principles */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Six Pillars of ESD Excellence
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
            <div className="font-bold">Energy Efficiency</div>
            <div className="text-xs opacity-90">Renewable energy integration</div>
          </div>
          <div className="text-center">
            <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <div className="font-bold">Water Conservation</div>
            <div className="text-xs opacity-90">Sustainable water cycles</div>
          </div>
          <div className="text-center">
            <Recycle className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <div className="font-bold">Waste Reduction</div>
            <div className="text-xs opacity-90">Circular economy principles</div>
          </div>
          <div className="text-center">
            <TreePine className="h-8 w-8 mx-auto mb-2 text-green-300" />
            <div className="font-bold">Biodiversity</div>
            <div className="text-xs opacity-90">Ecosystem preservation</div>
          </div>
          <div className="text-center">
            <Sun className="h-8 w-8 mx-auto mb-2 text-orange-400" />
            <div className="font-bold">Climate Resilience</div>
            <div className="text-xs opacity-90">Adaptive design strategies</div>
          </div>
          <div className="text-center">
            <Wind className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
            <div className="font-bold">Indoor Environment</div>
            <div className="text-xs opacity-90">Health and wellbeing focus</div>
          </div>
        </div>
      </div>

      {/* Project Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="border-2 border-green-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4">Residential Projects</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Single dwellings and custom homes</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Multi-unit developments and apartments</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Subdivision and master-planned communities</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Affordable housing and social infrastructure</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Commercial Projects</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Office buildings and business parks</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Retail centers and shopping complexes</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Industrial facilities and warehouses</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibtml">Educational and healthcare facilities</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-2 border-green-200 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-black text-green-600 mb-2">40%</div>
            <div className="font-bold text-gray-900">Energy Reduction</div>
            <div className="text-sm text-gray-600">Average savings achieved</div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-blue-200 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-black text-blue-600 mb-2">60%</div>
            <div className="font-bold text-gray-900">Water Savings</div>
            <div className="text-sm text-gray-600">Through efficient systems</div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-orange-200 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-black text-orange-600 mb-2">75%</div>
            <div className="font-bold text-gray-900">Waste Diversion</div>
            <div className="text-sm text-gray-600">From landfill disposal</div>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-purple-200 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-black text-purple-600 mb-2">100+</div>
            <div className="font-bold text-gray-900">ESD Projects</div>
            <div className="text-sm text-gray-600">Successfully delivered</div>
          </CardContent>
        </Card>
      </div>

      {/* Service Deliverables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="border-2 border-green-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center">
              <FileText className="h-6 w-6 mr-2" />
              ESD Documentation
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">ESD strategy and management plans</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Sustainability performance modeling</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Green Star and NABERS submissions</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Lifecycle assessment reports</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Carbon footprint analysis</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
              <Target className="h-6 w-6 mr-2" />
              Value Proposition
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Reduced operational costs (20-40%)</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Enhanced market value and rental premiums</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Future-proofed compliance</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Industry recognition and awards</span>
              </div>
              <div className="flex items-center gap-3">
                <Leaf className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Improved health and wellbeing outcomes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact */}
      <div className="border-t-4 border-green-600 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-green-900 mb-4">Sustainable Development Experts</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-600" />
                <span className="font-bold">info@delorenzopropertygroup.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-600" />
                <span className="font-bold">0417 693 838</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-green-600" />
                <span className="font-bold">DeLorenzo Property Group</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Leading ESD Solutions</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Certified sustainability professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Green Star Accredited Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Innovative design solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <span>Proven environmental outcomes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
          ESD Specialists | Green Star Accredited | Sustainability Consultants
        </p>
      </div>
    </div>
  );
};

export default ESDBrochure;