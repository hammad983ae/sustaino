import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import AIAssistant from './AIAssistant';

interface AIAssistantToggleProps {
  context?: string;
}

const AIAssistantToggle: React.FC<AIAssistantToggleProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleAssistant = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsMinimized(false);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <Button
          onClick={toggleAssistant}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
          size="sm"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* AI Assistant */}
      {isOpen && (
        <AIAssistant
          context={context}
          minimized={isMinimized}
          onToggleMinimize={toggleMinimize}
        />
      )}

      {/* Close button when assistant is open but not minimized */}
      {isOpen && !isMinimized && (
        <Button
          onClick={toggleAssistant}
          variant="ghost"
          className="fixed bottom-[620px] right-6 h-8 w-8 rounded-full shadow-lg z-50"
          size="sm"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

export default AIAssistantToggle;