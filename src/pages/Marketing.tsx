import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Eye, 
  Share2, 
  Megaphone, 
  FileText, 
  Image as ImageIcon,
  Palette,
  Sparkles
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import PDFWebExtractorComparison from '@/components/PDFWebExtractorComparison';

const Marketing = () => {
  const brochures = [
    { name: 'Sustaino Sphere Marketing', type: 'PDF', size: '2.4 MB', preview: true },
    { name: 'Auction Sphere Brochure', type: 'PDF', size: '1.8 MB', preview: true },
    { name: 'ESG Assessment Guide', type: 'PDF', size: '3.1 MB', preview: true },
    { name: 'Blockchain Platform', type: 'PDF', size: '2.2 MB', preview: true },
    { name: 'Property Valuations', type: 'PDF', size: '2.7 MB', preview: true },
    { name: 'Financial Reporting', type: 'PDF', size: '1.9 MB', preview: true }
  ];

  const logos = [
    { name: 'Sustaino Sphere Logo', format: 'PNG', type: 'Primary', color: 'Green' },
    { name: 'Auction Sphere Logo', format: 'PNG', type: 'Primary', color: 'Blue' },
    { name: 'Company Logo White', format: 'PNG', type: 'Secondary', color: 'White' },
    { name: 'Company Logo Dark', format: 'PNG', type: 'Secondary', color: 'Dark' },
    { name: 'Icon Only', format: 'SVG', type: 'Icon', color: 'Multi' },
    { name: 'Watermark', format: 'PNG', type: 'Watermark', color: 'Transparent' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Perfect Page Header with Navigation */}
      <PageHeader 
        title="Marketing Hub"
        subtitle="Brochures, logos, and marketing materials"
        icon={<Megaphone className="h-6 w-6 text-white" />}
        gradient="from-purple-500 to-pink-600"
      />

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{brochures.length}</div>
              <div className="text-sm text-muted-foreground">Brochures</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <ImageIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Logos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Palette className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-muted-foreground">Brand Colors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Sparkles className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">Ready</div>
              <div className="text-sm text-muted-foreground">To Use</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Brochures Section */}
          <Card className="bg-gradient-to-br from-white to-gray-50 border-2">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Marketing Brochures
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
              {brochures.map((brochure, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-200 transition-all duration-200 shadow-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900">{brochure.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">{brochure.type}</Badge>
                      <span className="font-medium">{brochure.size}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-gray-300 hover:bg-gray-50">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Resources Section */}
          <Card className="bg-gradient-to-br from-white to-gray-50 border-2">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Resources and assets available upon request</p>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* NEW: PDF & Web Extractor Comparison */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Our PDF & Web Extractors vs Competition
            </CardTitle>
            <p className="text-muted-foreground">Why our patent-protected technology dominates standard extractors</p>
          </CardHeader>
          <CardContent>
            <PDFWebExtractorComparison />
          </CardContent>
        </Card>

        {/* Brand Colors */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Brand Colors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-lg mx-auto mb-2"></div>
                <div className="font-medium">Primary Green</div>
                <div className="text-sm text-muted-foreground">#10B981</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-2"></div>
                <div className="font-medium">Primary Blue</div>
                <div className="text-sm text-muted-foreground">#3B82F6</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-lg mx-auto mb-2"></div>
                <div className="font-medium">Accent Purple</div>
                <div className="text-sm text-muted-foreground">#8B5CF6</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-lg mx-auto mb-2"></div>
                <div className="font-medium">Warning Orange</div>
                <div className="text-sm text-muted-foreground">#F59E0B</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-2"></div>
                <div className="font-medium">Text Dark</div>
                <div className="text-sm text-muted-foreground">#1F2937</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20" variant="outline">
                <div className="text-center">
                  <Share2 className="h-6 w-6 mx-auto mb-1" />
                  <div className="text-sm">Share All</div>
                </div>
              </Button>
              <Button className="h-20" variant="outline">
                <div className="text-center">
                  <Download className="h-6 w-6 mx-auto mb-1" />
                  <div className="text-sm">Download Pack</div>
                </div>
              </Button>
              <Button className="h-20" variant="outline">
                <div className="text-center">
                  <Eye className="h-6 w-6 mx-auto mb-1" />
                  <div className="text-sm">Preview All</div>
                </div>
              </Button>
              <Button className="h-20" variant="outline">
                <div className="text-center">
                  <Megaphone className="h-6 w-6 mx-auto mb-1" />
                  <div className="text-sm">Social Demo</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Marketing;