import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Scale, Eye, Bot, Zap } from "lucide-react";

interface RulesProps {
  onAccept: () => void;
  hasAccepted: boolean;
}

export const EternumRulesOfEngagement: React.FC<RulesProps> = ({ onAccept, hasAccepted }) => {
  const [showFullRules, setShowFullRules] = useState(false);

  const rules = [
    {
      title: "AI/Bot Usage Prohibition",
      description: "Any participant found using AI assistance, chatbots, automated solving tools, or similar technologies will be immediately and permanently disqualified.",
      icon: Bot,
      severity: "critical"
    },
    {
      title: "Human Intelligence Only",
      description: "All puzzles must be solved using only human cognitive abilities, research skills, and manual problem-solving techniques.",
      icon: Eye,
      severity: "high"
    },
    {
      title: "Fair Play Monitoring",
      description: "Advanced detection systems monitor for non-human behavior patterns, rapid solving times, and suspicious activities.",
      icon: Shield,
      severity: "medium"
    },
    {
      title: "One Account Per Person",
      description: "Each participant may only maintain one active account. Multiple accounts will result in disqualification of all associated accounts.",
      icon: Scale,
      severity: "high"
    },
    {
      title: "Token Forfeiture",
      description: "Disqualified participants forfeit all earned tokens, rewards, and any claims to prizes or recognition.",
      icon: Zap,
      severity: "critical"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 border-red-500';
      case 'high': return 'text-orange-400 border-orange-500';
      case 'medium': return 'text-yellow-400 border-yellow-500';
      default: return 'text-blue-400 border-blue-500';
    }
  };

  return (
    <Card className="border-primary/20 bg-slate-800/50 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Scale className="h-5 w-5" />
          Eternum Mystery Hunt - Rules of Engagement
          <Badge variant={hasAccepted ? 'default' : 'destructive'}>
            {hasAccepted ? 'ACCEPTED' : 'PENDING'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <Alert className="border-red-500 bg-red-950/50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-300 font-medium">
            🚫 ZERO TOLERANCE POLICY: AI assistance in any form results in immediate permanent disqualification
          </AlertDescription>
        </Alert>

        {!showFullRules ? (
          <div className="space-y-4">
            <div className="grid gap-3">
              {rules.slice(0, 2).map((rule, index) => {
                const IconComponent = rule.icon;
                return (
                  <div key={index} className={`p-3 border rounded-lg ${getSeverityColor(rule.severity)}`}>
                    <div className="flex items-start gap-3">
                      <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-white">{rule.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Button 
              variant="ghost" 
              onClick={() => setShowFullRules(true)}
              className="text-primary hover:text-primary/80"
            >
              View All Rules ({rules.length} total)
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {rules.map((rule, index) => {
              const IconComponent = rule.icon;
              return (
                <div key={index} className={`p-3 border rounded-lg ${getSeverityColor(rule.severity)}`}>
                  <div className="flex items-start gap-3">
                    <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-white">{rule.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{rule.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <Button 
              variant="ghost" 
              onClick={() => setShowFullRules(false)}
              className="text-primary hover:text-primary/80"
            >
              Hide Full Rules
            </Button>
          </div>
        )}

        <div className="pt-4 border-t border-primary/20">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              By participating, you agree to abide by these rules and accept monitoring for compliance.
            </p>
            {!hasAccepted && (
              <Button 
                onClick={onAccept} 
                className="bg-primary hover:bg-primary/80 text-white font-medium"
              >
                Accept Rules & Continue
              </Button>
            )}
          </div>
        </div>

        {hasAccepted && (
          <Alert className="border-green-500 bg-green-950/50">
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-green-300">
              ✅ Rules accepted. Fair play monitoring is now active. Good luck, human solver!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default EternumRulesOfEngagement;