import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  MapPin, 
  Building, 
  Satellite, 
  Play, 
  Pause, 
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  ChevronRight
} from 'lucide-react';
import AIAnimationPreview from './AIAnimationPreview';

interface AIReportPresentationProps {
  propertyData?: any;
  onComplete?: () => void;
  onSkip?: () => void;
}

const AIReportPresentation: React.FC<AIReportPresentationProps> = ({
  propertyData = {},
  onComplete,
  onSkip
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const slides = [
    {
      title: "Property Overview",
      subtitle: "8-story premium CBD office building",
      source: "Google Earth Satellite + Building Intelligence",
      duration: 8000,
      content: "Prime Collins Street location featuring modern glass facade, dedicated parking, and premium commercial tenants. Building constructed 2018 with A-grade specifications.",
      image: "/api/placeholder/800/450",
      animation: "3D building model with aerial context view"
    },
    {
      title: "Market Intelligence",
      subtitle: "Premium CBD commercial district - $8,500/sqm average",
      source: "RP Data + CoreLogic Integration",
      duration: 6000,
      content: "Analysis of 47 comparable sales in 12-month period. Average yield 6.2%, with premium buildings achieving 6.8%+. High tenant demand with 96% occupancy rates.",
      image: "/api/placeholder/800/450",
      animation: "Interactive market heat map with comparable sales"
    },
    {
      title: "ESG & Sustainability",
      subtitle: "NABERS 5-star energy rating achieved",
      source: "Building Analytics + ESG Assessment",
      duration: 7000,
      content: "Excellent sustainability credentials including solar panels, rainwater harvesting, EV charging stations. Green building certification enhances tenant appeal and rental premiums.",
      image: "/api/placeholder/800/450",
      animation: "Sustainability metrics visualization with energy flow diagrams"
    },
    {
      title: "Risk Assessment",
      subtitle: "Low risk profile - Stable tenant base",
      source: "Integrated Risk Analytics Engine",
      duration: 6000,
      content: "Comprehensive risk analysis shows low vacancy risk (major bank 10-year lease), minimal building defects, excellent transport access. Insurance costs optimized.",
      image: "/api/placeholder/800/450",
      animation: "Risk matrix visualization with mitigation strategies"
    },
    {
      title: "Valuation Indication",
      subtitle: "Market value range: $12.2M - $12.8M",
      source: "AI Valuation Engine + Market Analytics",
      duration: 5000,
      content: "Preliminary assessment indicates strong value position at $12.5M (midpoint). Based on 6.8% yield, comparable sales analysis, and premium building classification.",
      image: "/api/placeholder/800/450",
      animation: "Valuation calculation breakdown with confidence intervals"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const slideInterval = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (slides[currentSlide].duration / 100);
        if (prev >= 100) {
          // Move to next slide
          setCurrentSlide(current => {
            if (current >= slides.length - 1) {
              setIsPlaying(false);
              // Use setTimeout to avoid state update during render
              setTimeout(() => {
                onComplete?.();
              }, 0);
              return current;
            }
            return current + 1;
          });
          return 0;
        }
        return prev + increment;
      });
    }, 100);

    return () => clearInterval(slideInterval);
  }, [currentSlide, isPlaying, slides, onComplete]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setIsAnimating(!isAnimating);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setProgress(0);
    } else {
      // Use setTimeout to avoid state update during render
      setTimeout(() => {
        onComplete?.();
      }, 0);
    }
  };

  const handleSkip = () => {
    setIsPlaying(false);
    onSkip?.();
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Property Analysis Presentation
          </h1>
          <p className="text-muted-foreground">
            {propertyData.address || "123 Collins Street, Melbourne VIC 3000"} • Intelligent Pre-Report Analysis
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Slide Content */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{currentSlideData.title}</CardTitle>
                    <p className="text-muted-foreground">{currentSlideData.subtitle}</p>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Satellite className="h-3 w-3" />
                    {currentSlideData.source}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg relative overflow-hidden mb-4">
                  {/* Simulated animated content */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
                  
                  <div className={`absolute inset-0 flex items-center justify-center ${isAnimating ? 'animate-pulse' : ''}`}>
                    <div className="text-center space-y-4">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <Building className="h-16 w-16 text-primary-foreground" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{currentSlideData.animation}</h3>
                        <p className="text-sm text-muted-foreground max-w-md">
                          {currentSlideData.content}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Animation overlay effects */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div className="bg-background/80 backdrop-blur rounded-lg p-2">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>AI Processing Active</span>
                      </div>
                    </div>
                    <div className="bg-background/80 backdrop-blur rounded-lg p-2">
                      <div className="text-xs font-mono">
                        4K • 60fps • Enhanced
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {currentSlideData.content}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Controls & AI Preview */}
          <div className="space-y-4">
            
            {/* Media Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Presentation Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handlePlayPause}
                    className="flex-1 gap-2"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleNext}
                    className="gap-2"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsMuted(!isMuted)}
                    className="flex-1 gap-2"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    Audio
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>

                <Button 
                  variant="outline" 
                  onClick={handleSkip}
                  className="w-full gap-2"
                >
                  Skip to Report
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Slide Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Slides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {slides.map((slide, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentSlide(index);
                        setProgress(0);
                      }}
                      className={`w-full text-left p-2 rounded text-xs transition-colors ${
                        index === currentSlide
                          ? 'bg-primary text-primary-foreground'
                          : index < currentSlide
                          ? 'bg-secondary text-secondary-foreground'
                          : 'hover:bg-secondary/50'
                      }`}
                    >
                      <div className="font-medium truncate">{slide.title}</div>
                      <div className="text-xs opacity-70 truncate">{slide.subtitle}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* AI Animation Technical Preview */}
        <AIAnimationPreview 
          title="Real-Time AI Processing Engine"
          isActive={isAnimating}
          progress={progress}
          isGenerating={isAnimating}
        />

      </div>
    </div>
  );
};

export default AIReportPresentation;