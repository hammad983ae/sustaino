import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface AnimationParams {
  prompt: string;
  width?: number;
  height?: number;
  model?: string;
  steps?: number;
}

export interface GeneratedAnimation {
  imageURL: string;
  prompt: string;
  seed: number;
  cost?: number;
  taskUUID: string;
  NSFWContent: boolean;
}

export const useAIAnimation = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<GeneratedAnimation | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const { toast } = useToast();

  const generateAnimation = async (params: AnimationParams): Promise<GeneratedAnimation | null> => {
    if (!params.prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt to generate an animation",
        variant: "destructive",
      });
      return null;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      console.log('Generating animation with params:', params);

      const { data, error } = await supabase.functions.invoke('ai-animation-generator', {
        body: {
          prompt: params.prompt,
          width: params.width || 1024,
          height: params.height || 1024,
          model: params.model || "runware:100@1",
          steps: params.steps || 4
        }
      });

      clearInterval(progressInterval);
      setGenerationProgress(100);

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to generate animation');
      }

      if (!data || data.error) {
        console.error('Animation generation error:', data);
        throw new Error(data?.details || data?.error || 'Failed to generate animation');
      }

      if (!data.imageURL) {
        throw new Error('No image URL returned from the API');
      }

      const animation: GeneratedAnimation = {
        imageURL: data.imageURL,
        prompt: data.prompt,
        seed: data.seed,
        cost: data.cost,
        taskUUID: data.taskUUID,
        NSFWContent: data.NSFWContent || false
      };

      setCurrentAnimation(animation);

      toast({
        title: "Animation Generated!",
        description: `Successfully created animation for: "${params.prompt}"`,
      });

      return animation;

    } catch (error) {
      console.error('Error generating animation:', error);
      
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate animation. Please try again.",
        variant: "destructive",
      });

      return null;
    } finally {
      clearInterval(progressInterval);
      setIsGenerating(false);
      setTimeout(() => setGenerationProgress(0), 2000);
    }
  };

  const clearAnimation = () => {
    setCurrentAnimation(null);
    setGenerationProgress(0);
  };

  return {
    generateAnimation,
    clearAnimation,
    isGenerating,
    currentAnimation,
    generationProgress
  };
};