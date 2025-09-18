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
import GradientLogos from '@/components/GradientLogos';
import PDFWebExtractorComparison from '@/components/PDFWebExtractorComparison';
import PerfectSustanoLogo from '@/components/PerfectSustanoLogo';
import LogoDownloader from '@/components/LogoDownloader';

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
              <div className="text-2xl font-bold">{logos.length}</div>
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Marketing Brochures
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {brochures.map((brochure, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div>
                    <h4 className="font-medium">{brochure.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{brochure.type}</Badge>
                      <span>{brochure.size}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Traditional Logos Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Standard Logos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {logos.map((logo, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div>
                    <h4 className="font-medium">{logo.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{logo.format}</Badge>
                      <Badge variant="secondary">{logo.type}</Badge>
                      <span>{logo.color}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* NEW: Perfect Logo Downloads */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Perfect Logo Downloads
            </CardTitle>
            <p className="text-muted-foreground">High-quality, pixel-perfect logos with proper proportions</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Default Logo */}
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <PerfectSustanoLogo size="lg" variant="default" />
                  </div>
                  <h4 className="font-semibold mb-2">Standard Logo</h4>
                  <LogoDownloader
                    logoComponent={<PerfectSustanoLogo size="xl" variant="default" />}
                    filename="sustaino-pro-standard"
                    backgroundColor="#ffffff"
                  />
                </CardContent>
              </Card>

              {/* White Logo */}
              <Card>
                <CardContent className="p-6 text-center bg-gradient-to-br from-purple-600 to-blue-700">
                  <div className="mb-4 flex justify-center">
                    <PerfectSustanoLogo size="lg" variant="white" />
                  </div>
                  <h4 className="font-semibold mb-2 text-white">White Logo</h4>
                  <LogoDownloader
                    logoComponent={<PerfectSustanoLogo size="xl" variant="white" />}
                    filename="sustaino-pro-white"
                    backgroundColor="#8b5cf6"
                  />
                </CardContent>
              </Card>

              {/* Dark Logo */}
              <Card>
                <CardContent className="p-6 text-center bg-gray-100">
                  <div className="mb-4 flex justify-center">
                    <PerfectSustanoLogo size="lg" variant="dark" />
                  </div>
                  <h4 className="font-semibold mb-2">Dark Logo</h4>
                  <LogoDownloader
                    logoComponent={<PerfectSustanoLogo size="xl" variant="dark" />}
                    filename="sustaino-pro-dark"
                    backgroundColor="#f3f4f6"
                  />
                </CardContent>
              </Card>

              {/* Icon Only */}
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <PerfectSustanoLogo size="lg" variant="default" showText={false} />
                  </div>
                  <h4 className="font-semibold mb-2">Icon Only</h4>
                  <LogoDownloader
                    logoComponent={<PerfectSustanoLogo size="xl" variant="default" showText={false} />}
                    filename="sustaino-pro-icon"
                    backgroundColor="#ffffff"
                    width={400}
                    height={400}
                  />
                </CardContent>
              </Card>

              {/* Vertical Layout */}
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <PerfectSustanoLogo size="md" variant="default" textPosition="bottom" />
                  </div>
                  <h4 className="font-semibold mb-2">Vertical Layout</h4>
                  <LogoDownloader
                    logoComponent={<PerfectSustanoLogo size="xl" variant="default" textPosition="bottom" />}
                    filename="sustaino-pro-vertical"
                    backgroundColor="#ffffff"
                    width={600}
                    height={800}
                  />
                </CardContent>
              </Card>

              {/* Purple Theme */}
              <Card>
                <CardContent className="p-6 text-center bg-gradient-to-br from-purple-500 to-purple-700">
                  <div className="mb-4 flex justify-center">
                    <PerfectSustanoLogo size="lg" variant="purple" />
                  </div>
                  <h4 className="font-semibold mb-2 text-white">Purple Theme</h4>
                  <LogoDownloader
                    logoComponent={<PerfectSustanoLogo size="xl" variant="purple" />}
                    filename="sustaino-pro-purple"
                    backgroundColor="#8b5cf6"
                  />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

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