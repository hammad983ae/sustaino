import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlatformCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  link?: string;
  onView?: () => void;
  onPrint?: () => void;
}

interface PlatformSection {
  title: string;
  cards: PlatformCard[];
}

interface UnifiedPlatformLayoutProps {
  title: string;
  subtitle: string;
  colorTheme: 'purple' | 'green' | 'blue' | 'teal' | 'orange' | 'red';
  sections: PlatformSection[];
  children?: React.ReactNode;
}

const themeClasses = {
  purple: {
    background: 'bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900',
    card: 'from-purple-800/80 to-violet-900/80',
    border: 'border-purple-400/30',
    shadow: 'shadow-purple-500/20',
    hoverShadow: 'hover:shadow-purple-500/30',
    icon: 'from-purple-400 to-violet-500',
    iconShadow: 'shadow-purple-500/30',
    iconHover: 'group-hover:shadow-violet-500/50',
    title: 'from-purple-300 to-violet-300',
    section: 'from-purple-300 to-violet-300',
    backButton: 'from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700',
    viewButton: 'from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700',
    printButton: 'from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'
  },
  green: {
    background: 'bg-gradient-to-br from-slate-900 via-emerald-900 to-green-900',
    card: 'from-emerald-800/80 to-green-900/80',
    border: 'border-emerald-400/30',
    shadow: 'shadow-emerald-500/20',
    hoverShadow: 'hover:shadow-emerald-500/30',
    icon: 'from-emerald-400 to-green-500',
    iconShadow: 'shadow-emerald-500/30',
    iconHover: 'group-hover:shadow-green-500/50',
    title: 'from-emerald-300 to-green-300',
    section: 'from-emerald-300 to-green-300',
    backButton: 'from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700',
    viewButton: 'from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700',
    printButton: 'from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
  },
  blue: {
    background: 'bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900',
    card: 'from-blue-800/80 to-cyan-900/80',
    border: 'border-blue-400/30',
    shadow: 'shadow-blue-500/20',
    hoverShadow: 'hover:shadow-blue-500/30',
    icon: 'from-blue-400 to-cyan-500',
    iconShadow: 'shadow-blue-500/30',
    iconHover: 'group-hover:shadow-cyan-500/50',
    title: 'from-blue-300 to-cyan-300',
    section: 'from-blue-300 to-cyan-300',
    backButton: 'from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700',
    viewButton: 'from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700',
    printButton: 'from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'
  },
  teal: {
    background: 'bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900',
    card: 'from-teal-800/80 to-cyan-900/80',
    border: 'border-teal-400/30',
    shadow: 'shadow-teal-500/20',
    hoverShadow: 'hover:shadow-teal-500/30',
    icon: 'from-teal-400 to-cyan-500',
    iconShadow: 'shadow-teal-500/30',
    iconHover: 'group-hover:shadow-cyan-500/50',
    title: 'from-teal-300 to-cyan-300',
    section: 'from-teal-300 to-cyan-300',
    backButton: 'from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700',
    viewButton: 'from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700',
    printButton: 'from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'
  },
  orange: {
    background: 'bg-gradient-to-br from-slate-900 via-orange-900 to-red-900',
    card: 'from-orange-800/80 to-red-900/80',
    border: 'border-orange-400/30',
    shadow: 'shadow-orange-500/20',
    hoverShadow: 'hover:shadow-orange-500/30',
    icon: 'from-orange-400 to-red-500',
    iconShadow: 'shadow-orange-500/30',
    iconHover: 'group-hover:shadow-red-500/50',
    title: 'from-orange-300 to-red-300',
    section: 'from-orange-300 to-red-300',
    backButton: 'from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700',
    viewButton: 'from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700',
    printButton: 'from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'
  },
  red: {
    background: 'bg-gradient-to-br from-slate-900 via-red-900 to-pink-900',
    card: 'from-red-800/80 to-pink-900/80',
    border: 'border-red-400/30',
    shadow: 'shadow-red-500/20',
    hoverShadow: 'hover:shadow-red-500/30',
    icon: 'from-red-400 to-pink-500',
    iconShadow: 'shadow-red-500/30',
    iconHover: 'group-hover:shadow-pink-500/50',
    title: 'from-red-300 to-pink-300',
    section: 'from-red-300 to-pink-300',
    backButton: 'from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700',
    viewButton: 'from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700',
    printButton: 'from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'
  }
};

const UnifiedPlatformLayout: React.FC<UnifiedPlatformLayoutProps> = ({
  title,
  subtitle,
  colorTheme,
  sections,
  children
}) => {
  const theme = themeClasses[colorTheme];

  return (
    <div className={`min-h-screen ${theme.background} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute top-0 left-0 w-96 h-96 bg-gradient-to-br ${theme.icon} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${theme.icon} rounded-full blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br ${theme.icon} rounded-full blur-3xl animate-pulse delay-500`}></div>
        <div className={`absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br ${theme.icon} rounded-full blur-3xl animate-pulse delay-700`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Link to="/dashboard">
              <Button 
                className={`bg-gradient-to-r ${theme.backButton} text-white shadow-lg ${theme.iconShadow} transition-all duration-300 hover:scale-105`}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className={`text-6xl font-black bg-gradient-to-r ${theme.title} bg-clip-text text-transparent drop-shadow-2xl mb-6`}>
            {title}
          </h1>
          <p className="text-xl text-white/80 mb-8">
            {subtitle}
          </p>
        </div>

        {/* Main Content */}
        {children && (
          <div className="mb-12">
            {children}
          </div>
        )}

        {/* Platform Sections */}
        <div className="space-y-12">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-6">
              <h2 className={`text-3xl font-bold bg-gradient-to-r ${theme.section} bg-clip-text text-transparent text-center mb-8`}>
                {section.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.cards.map((card) => (
                  <div 
                    key={card.id}
                    className={`group relative p-8 bg-gradient-to-br ${theme.card} backdrop-blur-sm rounded-2xl border ${theme.border} shadow-2xl ${theme.shadow} hover:scale-105 transition-all duration-500 ${theme.hoverShadow}`}
                  >
                    {/* Animated border */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${theme.icon} rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className="text-center mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${theme.icon} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ${theme.iconShadow} ${theme.iconHover} transition-all duration-300`}>
                          <span className="text-2xl">{card.icon}</span>
                        </div>
                        
                        <h3 className={`text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:${theme.title} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                          {card.title}
                        </h3>
                        
                        <p className="text-white/70 text-sm leading-relaxed mb-6">
                          {card.description}
                        </p>
                      </div>
                      
                      <div className="flex gap-3">
                        {card.link ? (
                          <Link to={card.link} className="flex-1">
                            <Button
                              className={`w-full bg-gradient-to-r ${theme.viewButton} text-white shadow-lg ${theme.iconShadow} transition-all duration-300 hover:scale-105`}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            onClick={card.onView}
                            className={`flex-1 bg-gradient-to-r ${theme.viewButton} text-white shadow-lg ${theme.iconShadow} transition-all duration-300 hover:scale-105`}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        )}
                        
                        <Button
                          onClick={card.onPrint}
                          className={`flex-1 bg-gradient-to-r ${theme.printButton} text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105`}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Print
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnifiedPlatformLayout;