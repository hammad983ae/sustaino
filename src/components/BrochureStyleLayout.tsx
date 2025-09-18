import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Eye, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BrochureStyleLayoutProps {
  title: string;
  subtitle: string;
  sections: Array<{
    title: string;
    cards: Array<{
      title: string;
      description: string;
      icon: React.ReactNode;
      onView?: () => void;
      onPrint?: () => void;
      viewLink?: string;
    }>;
  }>;
  className?: string;
}

export const BrochureStyleLayout: React.FC<BrochureStyleLayoutProps> = ({
  title,
  subtitle,
  sections,
  className
}) => {
  return (
    <div className={cn("min-h-screen", className)} style={{
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #3b82f6 50%, #60a5fa 75%, #93c5fd 100%)'
    }}>
      {/* Header with Back Button */}
      <div className="container mx-auto px-4 pt-6 pb-4">
        <Button 
          variant="secondary" 
          asChild 
          className="mb-6 bg-emerald-500 hover:bg-emerald-600 text-white border-none"
        >
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {/* Main Title Section */}
      <div className="text-center text-white mb-12">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      {/* Sections */}
      <div className="container mx-auto px-4 pb-12">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-12">
            <h2 className="text-3xl font-semibold text-center text-emerald-400 mb-8">
              {section.title}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {section.cards.map((card, cardIndex) => (
                <Card 
                  key={cardIndex}
                  className="card-3d-medium border-slate-700/50 bg-slate-800/40 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4">
                      {card.icon}
                    </div>
                    <CardTitle className="text-white text-xl">{card.title}</CardTitle>
                    <CardDescription className="text-slate-300 text-center">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex gap-2">
                      {card.viewLink ? (
                        <Button asChild className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                          <Link to={card.viewLink}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </Button>
                      ) : card.onView && (
                        <Button 
                          onClick={card.onView}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      )}
                      
                      {card.onPrint && (
                        <Button 
                          onClick={card.onPrint}
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                          <Printer className="h-4 w-4 mr-2" />
                          Print
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrochureStyleLayout;