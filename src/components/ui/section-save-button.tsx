import React from 'react';
import { Button } from './button';
import { Save, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionSaveButtonProps {
  onSave: () => void;
  isSaving?: boolean;
  lastSaved?: Date | null;
  sectionName: string;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function SectionSaveButton({ 
  onSave, 
  isSaving = false, 
  lastSaved, 
  sectionName,
  disabled = false,
  variant = 'outline',
  size = 'sm',
  className 
}: SectionSaveButtonProps) {
  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className={cn("flex flex-col items-end gap-1", className)}>
      <Button
        onClick={onSave}
        disabled={disabled || isSaving}
        variant={variant}
        size={size}
        className="min-w-[100px]"
      >
        {isSaving ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : lastSaved ? (
          <>
            <Check className="h-4 w-4 mr-2 text-green-600" />
            Saved
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            Save {sectionName}
          </>
        )}
      </Button>
      
      {lastSaved && !isSaving && (
        <span className="text-xs text-muted-foreground">
          {formatLastSaved(lastSaved)}
        </span>
      )}
    </div>
  );
}