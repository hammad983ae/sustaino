import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UniversalNavigationProps {
  showWorkHub?: boolean;
  customBackRoute?: string;
  customBackLabel?: string;
}

export const UniversalNavigation: React.FC<UniversalNavigationProps> = ({ 
  showWorkHub = true, 
  customBackRoute,
  customBackLabel 
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 mb-6">
      <Button variant="outline" onClick={() => navigate('/')}>
        <Home className="h-4 w-4 mr-2" />
        Dashboard
      </Button>
      
      {showWorkHub && (
        <Button variant="outline" onClick={() => navigate('/workhub')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Work Hub
        </Button>
      )}
      
      {customBackRoute && (
        <Button variant="outline" onClick={() => navigate(customBackRoute)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {customBackLabel || 'Back'}
        </Button>
      )}
    </div>
  );
};

export default UniversalNavigation;