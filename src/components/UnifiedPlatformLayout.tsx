import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlatformSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component?: React.ComponentType;
  path?: string;
}

interface UnifiedPlatformLayoutProps {
  title: string;
  subtitle: string;
  sections?: PlatformSection[];
  categories?: { [key: string]: PlatformSection[] };
  accentColor: 'purple' | 'green' | 'blue' | 'teal' | 'orange' | 'rose';
  children?: React.ReactNode;
}

const getAccentClasses = (color: string) => {
  const colorMap = {
    purple: {
      bg: 'from-purple-500/20 to-violet-500/20',
      border: 'border-purple-300/30',
      text: 'text-purple-400',
      icon: 'bg-purple-500/30',
      button: 'bg-purple-600 hover:bg-purple-700',
      glow: 'shadow-purple-500/25'
    },
    green: {
      bg: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-300/30',
      text: 'text-emerald-400',
      icon: 'bg-emerald-500/30',
      button: 'bg-emerald-600 hover:bg-emerald-700',
      glow: 'shadow-emerald-500/25'
    },
    blue: {
      bg: 'from-blue-500/20 to-indigo-500/20',
      border: 'border-blue-300/30',
      text: 'text-blue-400',
      icon: 'bg-blue-500/30',
      button: 'bg-blue-600 hover:bg-blue-700',
      glow: 'shadow-blue-500/25'
    },
    teal: {
      bg: 'from-teal-500/20 to-cyan-500/20',
      border: 'border-teal-300/30',
      text: 'text-teal-400',
      icon: 'bg-teal-500/30',
      button: 'bg-teal-600 hover:bg-teal-700',
      glow: 'shadow-teal-500/25'
    },
    orange: {
      bg: 'from-orange-500/20 to-amber-500/20',
      border: 'border-orange-300/30',
      text: 'text-orange-400',
      icon: 'bg-orange-500/30',
      button: 'bg-orange-600 hover:bg-orange-700',
      glow: 'shadow-orange-500/25'
    },
    rose: {
      bg: 'from-rose-500/20 to-pink-500/20',
      border: 'border-rose-300/30',
      text: 'text-rose-400',
      icon: 'bg-rose-500/30',
      button: 'bg-rose-600 hover:bg-rose-700',
      glow: 'shadow-rose-500/25'
    }
  };
  return colorMap[color] || colorMap.blue;
};

const UnifiedPlatformLayout: React.FC<UnifiedPlatformLayoutProps> = ({
  title,
  subtitle,
  sections,
  categories,
  accentColor,
  children
}) => {
  const accent = getAccentClasses(accentColor);

  const renderPlatformCard = (section: PlatformSection) => (
    <Card 
      key={section.id}
      className={`bg-gradient-to-br ${accent.bg} backdrop-blur-sm ${accent.border} border transition-all duration-300 hover:scale-105 hover:shadow-xl ${accent.glow} group`}
    >
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 ${accent.icon} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
          {section.icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          {section.description}
        </p>
        <div className="flex gap-3 justify-center">
          <Button 
            size="sm" 
            className="bg-cyan-600 hover:bg-cyan-700 text-white border-0 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button 
            size="sm" 
            className={`${accent.button} text-white border-0 shadow-lg hover:shadow-lg transition-all duration-300`}
          >
            <Download className="w-4 h-4 mr-2" />
            Access
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)]" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-teal-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button
              variant="outline"
              asChild
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          {/* Platform Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold text-white mb-4">{title}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Platform Sections */}
          {categories ? (
            <div className="space-y-16">
              {Object.entries(categories).map(([categoryName, categorySections]) => (
                <div key={categoryName} className="animate-fade-in">
                  <h2 className={`text-3xl font-bold ${accent.text} text-center mb-12`}>
                    {categoryName}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {categorySections.map(renderPlatformCard)}
                  </div>
                </div>
              ))}
            </div>
          ) : sections ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto animate-fade-in">
              {sections.map(renderPlatformCard)}
            </div>
          ) : null}

          {/* Custom Content */}
          {children && (
            <div className="mt-16 animate-fade-in">
              {children}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-20 animate-fade-in">
            <Card className={`bg-gradient-to-r ${accent.bg} backdrop-blur-sm ${accent.border} border inline-block p-8`}>
              <h3 className="text-2xl font-bold text-white mb-4">
                Need Custom Solutions?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl">
                Our team can create bespoke platform configurations tailored to your specific requirements.
              </p>
              <Button 
                size="lg"
                className={`${accent.button} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                Contact Our Experts
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedPlatformLayout;