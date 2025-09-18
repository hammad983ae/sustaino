import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Enhanced3DCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  primaryColor?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'teal' | 'indigo';
  className?: string;
  children?: React.ReactNode;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }>;
  onCardClick?: () => void;
}

const colorStyles = {
  blue: {
    card: 'from-blue-50/90 to-blue-100/70 border-blue-200/60 hover:border-blue-300/80',
    icon: 'bg-blue-100 text-blue-600 group-hover:bg-blue-200',
    title: 'text-blue-700 group-hover:text-blue-800',
    description: 'text-blue-600',
    primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondaryButton: 'border-blue-300 text-blue-700 hover:bg-blue-50'
  },
  green: {
    card: 'from-emerald-50/90 to-emerald-100/70 border-emerald-200/60 hover:border-emerald-300/80',
    icon: 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200',
    title: 'text-emerald-700 group-hover:text-emerald-800',
    description: 'text-emerald-600',
    primaryButton: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    secondaryButton: 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
  },
  purple: {
    card: 'from-purple-50/90 to-purple-100/70 border-purple-200/60 hover:border-purple-300/80',
    icon: 'bg-purple-100 text-purple-600 group-hover:bg-purple-200',
    title: 'text-purple-700 group-hover:text-purple-800',
    description: 'text-purple-600',
    primaryButton: 'bg-purple-600 hover:bg-purple-700 text-white',
    secondaryButton: 'border-purple-300 text-purple-700 hover:bg-purple-50'
  },
  orange: {
    card: 'from-orange-50/90 to-orange-100/70 border-orange-200/60 hover:border-orange-300/80',
    icon: 'bg-orange-100 text-orange-600 group-hover:bg-orange-200',
    title: 'text-orange-700 group-hover:text-orange-800',
    description: 'text-orange-600',
    primaryButton: 'bg-orange-600 hover:bg-orange-700 text-white',
    secondaryButton: 'border-orange-300 text-orange-700 hover:bg-orange-50'
  },
  pink: {
    card: 'from-pink-50/90 to-pink-100/70 border-pink-200/60 hover:border-pink-300/80',
    icon: 'bg-pink-100 text-pink-600 group-hover:bg-pink-200',
    title: 'text-pink-700 group-hover:text-pink-800',
    description: 'text-pink-600',
    primaryButton: 'bg-pink-600 hover:bg-pink-700 text-white',
    secondaryButton: 'border-pink-300 text-pink-700 hover:bg-pink-50'
  },
  teal: {
    card: 'from-teal-50/90 to-teal-100/70 border-teal-200/60 hover:border-teal-300/80',
    icon: 'bg-teal-100 text-teal-600 group-hover:bg-teal-200',
    title: 'text-teal-700 group-hover:text-teal-800',
    description: 'text-teal-600',
    primaryButton: 'bg-teal-600 hover:bg-teal-700 text-white',
    secondaryButton: 'border-teal-300 text-teal-700 hover:bg-teal-50'
  },
  indigo: {
    card: 'from-indigo-50/90 to-indigo-100/70 border-indigo-200/60 hover:border-indigo-300/80',
    icon: 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200',
    title: 'text-indigo-700 group-hover:text-indigo-800',
    description: 'text-indigo-600',
    primaryButton: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    secondaryButton: 'border-indigo-300 text-indigo-700 hover:bg-indigo-50'
  }
};

export const Enhanced3DCard: React.FC<Enhanced3DCardProps> = ({
  title,
  description,
  icon,
  primaryColor = 'blue',
  className,
  children,
  actions,
  onCardClick
}) => {
  const styles = colorStyles[primaryColor];

  return (
    <Card 
      className={cn(
        'group cursor-pointer card-3d-light bg-gradient-to-br backdrop-blur-sm transition-all duration-500 hover:scale-105',
        styles.card,
        className
      )}
      onClick={onCardClick}
    >
      <CardHeader className="text-center">
        {icon && (
          <div className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-300',
            styles.icon
          )}>
            {icon}
          </div>
        )}
        <CardTitle className={cn(
          'text-xl font-semibold transition-colors duration-300',
          styles.title
        )}>
          {title}
        </CardTitle>
        <CardDescription className={cn(
          'text-sm',
          styles.description
        )}>
          {description}
        </CardDescription>
      </CardHeader>
      
      {children && (
        <CardContent>
          {children}
        </CardContent>
      )}
      
      {actions && actions.length > 0 && (
        <CardContent className="pt-0">
          <div className="flex gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick();
                }}
                className={cn(
                  'flex-1 transition-all duration-300',
                  action.variant === 'secondary' 
                    ? cn('variant-outline', styles.secondaryButton)
                    : styles.primaryButton
                )}
                variant={action.variant === 'secondary' ? 'outline' : 'default'}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default Enhanced3DCard;