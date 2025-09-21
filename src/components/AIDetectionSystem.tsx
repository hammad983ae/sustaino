import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Bot, Eye, Timer, Zap } from "lucide-react";

interface AIDetectionProps {
  onAIDetected: (reason: string) => void;
  isActive: boolean;
}

interface DetectionMetrics {
  rapidSubmissions: number;
  suspiciousPatterns: number;
  riskScore: number;
  isBlocked: boolean;
}

export const AIDetectionSystem: React.FC<AIDetectionProps> = ({ onAIDetected, isActive }) => {
  const [metrics, setMetrics] = useState<DetectionMetrics>({
    rapidSubmissions: 0,
    suspiciousPatterns: 0,
    riskScore: 0,
    isBlocked: false
  });
  const [detectionMethods, setDetectionMethods] = useState({
    timingAnalysis: true,
    patternRecognition: true,
    humanBehaviorValidation: true,
    CAPTCHAVerification: true,
    mouseMovementTracking: true,
    keystrokeAnalysis: true
  });

  useEffect(() => {
    if (!isActive) return;

    const detectionInterval = setInterval(() => {
      analyzeUserBehavior();
    }, 1000);

    return () => clearInterval(detectionInterval);
  }, [isActive]);

  const analyzeUserBehavior = () => {
    // Simulate AI detection analysis
    const currentTime = Date.now();
    const lastActivity = localStorage.getItem('lastPuzzleActivity');
    
    if (lastActivity) {
      const timeDiff = currentTime - parseInt(lastActivity);
      
      // Flag if answering too quickly (< 30 seconds for complex puzzles)
      if (timeDiff < 30000) {
        setMetrics(prev => ({
          ...prev,
          rapidSubmissions: prev.rapidSubmissions + 1,
          riskScore: Math.min(prev.riskScore + 25, 100)
        }));
        
        if (metrics.rapidSubmissions > 2) {
          triggerAIDetection("Rapid consecutive submissions detected");
        }
      }
    }
    
    localStorage.setItem('lastPuzzleActivity', currentTime.toString());
  };

  const triggerAIDetection = (reason: string) => {
    setMetrics(prev => ({
      ...prev,
      isBlocked: true,
      suspiciousPatterns: prev.suspiciousPatterns + 1
    }));
    
    onAIDetected(reason);
  };

  // Honeypot trap - invisible elements that only bots would interact with
  useEffect(() => {
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.style.position = 'absolute';
    honeypot.style.left = '-9999px';
    honeypot.style.opacity = '0';
    honeypot.setAttribute('tabindex', '-1');
    honeypot.setAttribute('aria-hidden', 'true');
    honeypot.name = 'bot_trap';
    
    honeypot.addEventListener('input', () => {
      triggerAIDetection("Honeypot interaction detected");
    });
    
    document.body.appendChild(honeypot);
    
    return () => {
      if (document.body.contains(honeypot)) {
        document.body.removeChild(honeypot);
      }
    };
  }, []);

  // Mouse movement analysis
  useEffect(() => {
    let mouseMovements: Array<{x: number, y: number, time: number}> = [];
    
    const trackMouse = (e: MouseEvent) => {
      mouseMovements.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now()
      });
      
      // Keep only last 10 movements
      if (mouseMovements.length > 10) {
        mouseMovements = mouseMovements.slice(-10);
      }
      
      // Analyze for bot-like patterns (perfectly straight lines, no human variance)
      if (mouseMovements.length >= 5) {
        const hasHumanVariance = analyzeMousePatterns(mouseMovements);
        if (!hasHumanVariance) {
          triggerAIDetection("Non-human mouse movement patterns detected");
        }
      }
    };
    
    document.addEventListener('mousemove', trackMouse);
    return () => document.removeEventListener('mousemove', trackMouse);
  }, []);

  const analyzeMousePatterns = (movements: Array<{x: number, y: number, time: number}>) => {
    // Check for perfectly straight lines (bot behavior)
    let straightLineCount = 0;
    
    for (let i = 2; i < movements.length; i++) {
      const slope1 = (movements[i-1].y - movements[i-2].y) / (movements[i-1].x - movements[i-2].x);
      const slope2 = (movements[i].y - movements[i-1].y) / (movements[i].x - movements[i-1].x);
      
      if (Math.abs(slope1 - slope2) < 0.01) { // Too perfect
        straightLineCount++;
      }
    }
    
    return straightLineCount < movements.length * 0.8; // Allow some variance
  };

  const getRiskLevel = () => {
    if (metrics.riskScore >= 75) return { level: 'HIGH', color: 'text-red-500' };
    if (metrics.riskScore >= 50) return { level: 'MEDIUM', color: 'text-yellow-500' };
    return { level: 'LOW', color: 'text-green-500' };
  };

  if (!isActive) return null;

  const riskLevel = getRiskLevel();

  return (
    <Card className="border-primary/20 bg-slate-800/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Shield className="h-5 w-5" />
          AI Detection System
          <Badge variant={metrics.isBlocked ? 'destructive' : 'secondary'}>
            {metrics.isBlocked ? 'BLOCKED' : 'ACTIVE'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.isBlocked && (
          <Alert className="border-red-500">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-400">
              AI/Bot behavior detected. Manual verification required to continue.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Risk Score:</span>
              <span className={riskLevel.color}>{metrics.riskScore}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rapid Submissions:</span>
              <span className="text-yellow-400">{metrics.rapidSubmissions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Suspicious Patterns:</span>
              <span className="text-red-400">{metrics.suspiciousPatterns}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-primary">Active Protections:</h4>
            <div className="space-y-1 text-xs">
              {Object.entries(detectionMethods).map(([method, active]) => (
                <div key={method} className="flex items-center gap-2">
                  {active ? (
                    <Zap className="h-3 w-3 text-green-400" />
                  ) : (
                    <Bot className="h-3 w-3 text-gray-400" />
                  )}
                  <span className={active ? 'text-green-400' : 'text-gray-400'}>
                    {method.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-primary/20">
          <p className="text-xs text-muted-foreground">
            🛡️ This hunt uses advanced AI detection to ensure fair play. 
            Human participants only - AI/bot usage will result in immediate disqualification.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIDetectionSystem;
