import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';

interface FieldStatusManagerProps {
  status: 'supplied' | 'investigation_required' | 'not_supplied' | 'not_applicable';
  field: string;
  value?: string;
  className?: string;
}

/**
 * Field Status Manager Component
 * Displays field status indicators with proper styling
 */
const FieldStatusManager: React.FC<FieldStatusManagerProps> = ({
  status,
  field,
  value,
  className = ""
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'supplied':
        return {
          icon: CheckCircle,
          label: 'Supplied',
          variant: 'default' as const,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          description: 'Data provided in PAF'
        };
      case 'investigation_required':
        return {
          icon: AlertTriangle,
          label: 'Investigation Required',
          variant: 'secondary' as const,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          description: 'Valuer must research/verify'
        };
      case 'not_supplied':
        return {
          icon: XCircle,
          label: 'Not Supplied',
          variant: 'destructive' as const,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          description: 'Explicitly marked as unavailable'
        };
      case 'not_applicable':
        return {
          icon: HelpCircle,
          label: 'Not Applicable',
          variant: 'outline' as const,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          description: 'Section included but not relevant for property type'
        };
      default:
        return {
          icon: HelpCircle,
          label: 'Unknown',
          variant: 'outline' as const,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          description: 'Status unknown'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const formatValue = (val: string | undefined) => {
    if (!val) return 'No data';
    
    // Handle special status messages
    if (val.includes('Investigation Required')) return val;
    if (val.includes('Not Supplied')) return val;
    if (val.includes('Not Applicable')) return val;
    if (val.includes('Required')) return val;
    
    return val;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{field}</span>
        <Badge variant={config.variant} className="flex items-center gap-1">
          <Icon className="h-3 w-3" />
          {config.label}
        </Badge>
      </div>
      
      <div className={`p-3 rounded-md border ${config.bgColor}`}>
        <div className="flex items-start gap-2">
          <Icon className={`h-4 w-4 mt-0.5 ${config.color}`} />
          <div className="flex-1">
            <p className="text-sm font-medium">{formatValue(value)}</p>
            <p className="text-xs text-muted-foreground mt-1">{config.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldStatusManager;