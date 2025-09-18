import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  showHomeLink?: boolean;
  icon?: React.ReactNode;
  gradient?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  backTo = '/dashboard',
  backLabel = 'Back to Dashboard',
  showHomeLink = true,
  icon,
  gradient = 'from-purple-500 to-pink-600'
}) => {
  const navigate = useNavigate();

  return (
    <div className={`toolbar-high-contrast border-b bg-gradient-to-r ${gradient} text-white`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back Navigation */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(backTo)}
              className="text-white hover:bg-white/20 border border-white/30 hover:border-white/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {backLabel}
            </Button>
            
            {showHomeLink && (
              <>
                <div className="h-6 w-px bg-white/30" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="text-white hover:bg-white/20"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </>
            )}
          </div>

          {/* Title Section */}
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                {icon}
              </div>
            )}
            <div className="text-right">
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              {subtitle && (
                <p className="text-white/80 text-sm">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;