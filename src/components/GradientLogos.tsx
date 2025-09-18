import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import sustanoIcon from '@/assets/sustano-icon.png';
import sustanoProLogo from '@/assets/sustano-pro-logo.jpg';

const GradientLogos = () => {
  return (
    <div className="space-y-6">
      {/* Gradient Logo Previews */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sustano Sphere Gradient Logo */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 p-8 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <img src={sustanoIcon} alt="Sustano Icon" className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-white">Sustaino Sphere</h2>
                <p className="text-white/80 text-sm">™ Gradient Logo</p>
              </div>
            </div>
            <div className="p-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button size="sm" className="flex-1">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sustano Pro Dashboard Style */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="hero-green-background p-8 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                  <img src={sustanoIcon} alt="Sustano Icon" className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Sustaino Pro</h2>
                <p className="text-gray-600 text-sm">Dashboard Style</p>
              </div>
            </div>
            <div className="p-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button size="sm" className="flex-1">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Auction Sphere Blue Gradient */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-8 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L19 7L14.74 12.26L21 14.5L14.74 16.74L16 22L12 18L8 22L9.26 16.74L3 14.5L9.26 12.26L5 7L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Auction Sphere</h2>
                <p className="text-white/80 text-sm">™ Premium Logo</p>
              </div>
            </div>
            <div className="p-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button size="sm" className="flex-1">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ESG Green Gradient */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-8 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L3 7L12 12L21 7L12 2Z"/>
                    <path d="M3 17L12 22L21 17"/>
                    <path d="M3 12L12 17L21 12"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">ESG Platform</h2>
                <p className="text-white/80 text-sm">Sustainability Focus</p>
              </div>
            </div>
            <div className="p-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button size="sm" className="flex-1">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Professional Dark Gradient */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                  <img src={sustanoIcon} alt="Sustano Icon" className="w-10 h-10 filter brightness-0 invert" />
                </div>
                <h2 className="text-2xl font-bold text-white">Professional</h2>
                <p className="text-white/80 text-sm">Dark Theme</p>
              </div>
            </div>
            <div className="p-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button size="sm" className="flex-1">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* White Label Customizable */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8 flex items-center justify-center min-h-[200px] border-b">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                  <img src={sustanoIcon} alt="Sustano Icon" className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">White Label</h2>
                <p className="text-gray-600 text-sm">Customizable</p>
              </div>
            </div>
            <div className="p-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button size="sm" className="flex-1">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gradient Swatches */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Available Gradient Styles</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="h-16 bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Ocean Breeze</p>
            </div>
            <div className="text-center">
              <div className="h-16 hero-green-background rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Dashboard Theme</p>
            </div>
            <div className="text-center">
              <div className="h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Professional Blue</p>
            </div>
            <div className="text-center">
              <div className="h-16 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">ESG Green</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradientLogos;