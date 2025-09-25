import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { usePAFConfig } from '@/contexts/PAFConfigContext';
import { Settings2, FileText, DollarSign, Search, Camera, BarChart3, Calculator, AlertTriangle, CheckCircle } from 'lucide-react';

const PAFStepToggleManager: React.FC = () => {
  const { flowConfig, updateSectionConfig, isStepEnabled } = usePAFConfig();

  const stepCategories = {
    core: {
      name: 'Core Requirements',
      description: 'Essential steps that cannot be disabled',
      icon: <Settings2 className="h-4 w-4" />,
      color: 'bg-primary'
    },
    optional: {
      name: 'Assessment Sections',
      description: 'Configurable assessment components',
      icon: <FileText className="h-4 w-4" />,
      color: 'bg-blue-500'
    },
    financial: {
      name: 'Financial & Accounting',
      description: 'Financial analysis and accounting integration',
      icon: <DollarSign className="h-4 w-4" />,
      color: 'bg-green-500'
    },
    analysis: {
      name: 'Market Analysis',
      description: 'Market research and valuation analysis',
      icon: <BarChart3 className="h-4 w-4" />,
      color: 'bg-purple-500'
    }
  };

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'property_address': return <Settings2 className="h-4 w-4" />;
      case 'report_configuration': return <FileText className="h-4 w-4" />;
      case 'planning_search': return <Search className="h-4 w-4" />;
      case 'search_analysis': return <BarChart3 className="h-4 w-4" />;
      case 'property_photos': return <Camera className="h-4 w-4" />;
      case 'accountancy_financials': return <DollarSign className="h-4 w-4" />;
      case 'sales_leasing': return <FileText className="h-4 w-4" />;
      case 'intelligent_enhancement': return <Settings2 className="h-4 w-4" />;
      case 'review_generate': return <CheckCircle className="h-4 w-4" />;
      case 'assessment_complete': return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const groupedSections = Object.values(flowConfig.sections).reduce((acc, section) => {
    if (!acc[section.category]) {
      acc[section.category] = [];
    }
    acc[section.category].push(section);
    return acc;
  }, {} as Record<string, typeof flowConfig.sections[keyof typeof flowConfig.sections][]>);

  const handleToggle = (sectionId: string, included: boolean) => {
    updateSectionConfig(sectionId, { included });
  };

  const getEnabledCount = (category: string) => {
    return groupedSections[category]?.filter(section => section.included).length || 0;
  };

  const getTotalCount = (category: string) => {
    return groupedSections[category]?.length || 0;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          Assessment Configuration
        </CardTitle>
        <CardDescription>
          Customize your property assessment workflow. Toggle sections on/off to focus on specific areas like finance & accounting.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(stepCategories).map(([categoryKey, category]) => {
          const sections = groupedSections[categoryKey] || [];
          const enabledCount = getEnabledCount(categoryKey);
          const totalCount = getTotalCount(categoryKey);
          
          if (sections.length === 0) return null;

          return (
            <div key={categoryKey} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${category.color} text-white`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <Badge variant="secondary">
                  {enabledCount}/{totalCount} enabled
                </Badge>
              </div>
              
              <div className="grid gap-3 ml-4 pl-4 border-l-2 border-border">
                {sections
                  .sort((a, b) => a.priority - b.priority)
                  .map((section) => (
                    <div key={section.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="text-muted-foreground">
                          {getStepIcon(section.id)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={section.id} className="font-medium cursor-pointer">
                              {section.name}
                            </Label>
                            {section.required && (
                              <Badge variant="destructive" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {section.description}
                          </p>
                        </div>
                      </div>
                      <Switch
                        id={section.id}
                        checked={section.included}
                        onCheckedChange={(checked) => handleToggle(section.id, checked)}
                        disabled={section.required}
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>
                  ))}
              </div>
              
              {categoryKey !== 'analysis' && <Separator />}
            </div>
          );
        })}
        
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm">Quick Configuration Tips</h4>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• <strong>Finance Focus:</strong> Enable only "Core Requirements" + "Financial & Accounting"</li>
                <li>• <strong>Basic Valuation:</strong> Core + Assessment Sections (skip Financial)</li>
                <li>• <strong>Full Assessment:</strong> Enable all sections for comprehensive reporting</li>
                <li>• Required steps cannot be disabled but optional sections can be customized</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PAFStepToggleManager;