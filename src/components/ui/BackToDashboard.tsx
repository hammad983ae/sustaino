import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackToDashboardProps {
  variant?: 'default' | 'minimal' | 'with-home';
  className?: string;
}

const BackToDashboard: React.FC<BackToDashboardProps> = ({ 
  variant = 'default', 
  className = '' 
}) => {
  if (variant === 'minimal') {
    return (
      <Link to="/" className={`inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ${className}`}>
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>
    );
  }

  if (variant === 'with-home') {
    return (
      <Link to="/" className={className}>
        <Button variant="outline" size="sm" className="gap-2">
          <Home className="h-4 w-4" />
          Dashboard
        </Button>
      </Link>
    );
  }

  return (
    <Link to="/" className={className}>
      <Button variant="outline" size="sm" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>
    </Link>
  );
};

export default BackToDashboard;