import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Play, Settings, History, Sparkles, Wand2 } from 'lucide-react';
import AIAnimationPreview from './AIAnimationPreview';
import { useAIAnimation, type AnimationParams } from '@/hooks/useAIAnimation';
import { useReportScript } from '@/hooks/useReportScript';

const AIAnimationStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [manualScript, setManualScript] = useState('');
  const [useManualScript, setUseManualScript] = useState(false);
  const [useReportData, setUseReportData] = useState(false);
  const [width, setWidth] = useState([1024]);
  const [height, setHeight] = useState([1024]);
  const [steps, setSteps] = useState([4]);
  const [model, setModel] = useState('runware:100@1');
  
  const { script, hasReportData } = useReportScript();
  
  const { 
    generateAnimation, 
    clearAnimation, 
    isGenerating, 
    currentAnimation, 
    generationProgress 
  } = useAIAnimation();

  const [generationHistory, setGenerationHistory] = useState<Array<{
    prompt: string;
    imageURL: string;
    timestamp: Date;
    seed: number;
  }>>([]);

  const handleGenerate = async () => {
    const finalPrompt = useReportData && hasReportData
      ? script.combined
      : useManualScript && manualScript.trim() 
        ? manualScript.trim() 
        : prompt.trim();
        
    if (!finalPrompt) return;

    const params: AnimationParams = {
      prompt: finalPrompt,
      width: width[0],
      height: height[0],
      steps: steps[0],
      model
    };

    const result = await generateAnimation(params);
    
    if (result) {
      setGenerationHistory(prev => [{
        prompt: result.prompt,
        imageURL: result.imageURL,
        timestamp: new Date(),
        seed: result.seed
      }, ...prev.slice(0, 9)]); // Keep last 10 generations
    }
  };

  const promptSuggestions = [
    "A majestic dragon soaring through clouds with lightning effects",
    "Cyberpunk cityscape with neon lights and flying cars",
    "Underwater coral reef with tropical fish and rays of sunlight",
    "Ancient castle on a floating island surrounded by waterfalls",
    "Space station orbiting a distant planet with nebula in background",
    "Enchanted forest with glowing mushrooms and fairy lights"
  ];

  const modelOptions = [
    { value: 'runware:100@1', label: 'Runware Default (Fast)', description: 'High quality, fast generation' },
    { value: 'runware:101@1', label: 'Runware Enhanced', description: 'Enhanced detail and quality' }
  ];

  const aspectRatios = [
    { label: '1:1 Square', width: 1024, height: 1024 },
    { label: '16:9 Landscape', width: 1024, height: 576 },
    { label: '9:16 Portrait', width: 576, height: 1024 },
    { label: '4:3 Standard', width: 1024, height: 768 },
    { label: '3:4 Portrait', width: 768, height: 1024 }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          AI Animation Studio
        </h1>
        <p className="text-muted-foreground">
          Create stunning animations with AI-powered generation technology
          {hasReportData && <span className="text-primary"> • Auto-script from your report data available</span>}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Animation Prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Script Input Options */}
              <div className="space-y-3 p-4 border rounded-lg bg-secondary/10">
                <Label className="text-base font-medium">Animation Script Options</Label>
                
                {hasReportData && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="use-report-data"
                      name="script-option"
                      checked={useReportData}
                      onChange={(e) => {
                        setUseReportData(e.target.checked);
                        if (e.target.checked) {
                          setUseManualScript(false);
                        }
                      }}
                      className="rounded"
                    />
                    <Label htmlFor="use-report-data">Auto-Generate from Report Data</Label>
                    <Badge variant="secondary" className="text-xs">Smart</Badge>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="use-manual-script"
                    name="script-option"
                    checked={useManualScript}
                    onChange={(e) => {
                      setUseManualScript(e.target.checked);
                      if (e.target.checked) {
                        setUseReportData(false);
                      }
                    }}
                    className="rounded"
                  />
                  <Label htmlFor="use-manual-script">Manual Script Input</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="use-simple-prompt"
                    name="script-option"
                    checked={!useManualScript && !useReportData}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUseManualScript(false);
                        setUseReportData(false);
                      }
                    }}
                    className="rounded"
                  />
                  <Label htmlFor="use-simple-prompt">Simple Prompt</Label>
                </div>
              </div>

              {/* Content based on selection */}
              {useReportData && hasReportData ? (
                <div className="space-y-2">
                  <Label>Generated Script from Report Data</Label>
                  <div className="p-3 border rounded bg-muted/50 text-sm">
                    <p className="text-muted-foreground">{script.combined}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This script was automatically generated from your report data including property details, market analysis, and location information.
                  </p>
                </div>
              ) : useManualScript ? (
                <div className="space-y-2">
                  <Label htmlFor="manual-script">Manual Animation Script</Label>
                  <Textarea
                    id="manual-script"
                    placeholder="Enter detailed animation script or instructions from your report..."
                    value={manualScript}
                    onChange={(e) => setManualScript(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your custom script for animation generation
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="prompt">Describe your animation</Label>
                  <Textarea
                    id="prompt"
                    placeholder="A magical forest with glowing trees and floating particles..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Quick Suggestions</Label>
                <div className="flex flex-wrap gap-2">
                  {promptSuggestions.slice(0, 3).map((suggestion, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => {
                        if (useReportData) {
                          setUseReportData(false);
                          setUseManualScript(true);
                          setManualScript(suggestion);
                        } else if (useManualScript) {
                          setManualScript(suggestion);
                        } else {
                          setPrompt(suggestion);
                        }
                      }}
                    >
                      {suggestion.split(' ').slice(0, 4).join(' ')}...
                    </Badge>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={(!prompt.trim() && !manualScript.trim() && !useReportData) || isGenerating}
                className="w-full"
                size="lg"
              >
                <Play className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Animation'}
              </Button>
            </CardContent>
          </Card>

          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Generation Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>AI Model</Label>
                    <Select value={model} onValueChange={setModel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {modelOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="space-y-1">
                              <div className="font-medium">{option.label}</div>
                              <div className="text-xs text-muted-foreground">{option.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Aspect Ratio</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {aspectRatios.map((ratio) => (
                        <Button
                          key={ratio.label}
                          variant={width[0] === ratio.width && height[0] === ratio.height ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setWidth([ratio.width]);
                            setHeight([ratio.height]);
                          }}
                        >
                          {ratio.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Width: {width[0]}px</Label>
                    <Slider
                      value={width}
                      onValueChange={setWidth}
                      max={1536}
                      min={512}
                      step={64}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Height: {height[0]}px</Label>
                    <Slider
                      value={height}
                      onValueChange={setHeight}
                      max={1536}
                      min={512}
                      step={64}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Generation Steps: {steps[0]}</Label>
                    <Slider
                      value={steps}
                      onValueChange={setSteps}
                      max={20}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      More steps = higher quality, longer generation time
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Generations</CardTitle>
                </CardHeader>
                <CardContent>
                  {generationHistory.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No generations yet. Create your first animation!
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {generationHistory.map((item, index) => (
                        <div key={index} className="flex gap-3 p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                          <img 
                            src={item.imageURL} 
                            alt="Generated animation" 
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium line-clamp-2">{item.prompt}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.timestamp.toLocaleString()} • Seed: {item.seed}
                            </p>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => useManualScript ? setManualScript(item.prompt) : setPrompt(item.prompt)}
                            >
                              Use {useManualScript ? 'Script' : 'Prompt'}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Preview */}
        <div className="space-y-6">
          <AIAnimationPreview
            title="Generated Animation"
            isActive={isGenerating}
            imageURL={currentAnimation?.imageURL}
            prompt={currentAnimation?.prompt}
            isGenerating={isGenerating}
            progress={generationProgress}
            generationInfo={currentAnimation ? {
              seed: currentAnimation.seed,
              cost: currentAnimation.cost,
              taskUUID: currentAnimation.taskUUID
            } : undefined}
          />

          {currentAnimation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generation Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Prompt:</span>
                    <p className="text-muted-foreground mt-1">{currentAnimation.prompt}</p>
                  </div>
                  <div>
                    <span className="font-medium">Seed:</span>
                    <p className="text-muted-foreground mt-1">{currentAnimation.seed}</p>
                  </div>
                  {currentAnimation.cost && (
                    <div>
                      <span className="font-medium">Cost:</span>
                      <p className="text-muted-foreground mt-1">${currentAnimation.cost.toFixed(4)}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Task ID:</span>
                    <p className="text-muted-foreground mt-1 font-mono text-xs">{currentAnimation.taskUUID}</p>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={clearAnimation}
                  className="w-full"
                >
                  Clear Preview
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnimationStudio;