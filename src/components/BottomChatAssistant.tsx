import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Send, Mic, X, TrendingUp, TrendingDown, Gavel, Clock, MapPin, DollarSign, ArrowUp, ArrowDown, Building, Home } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const BottomChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    try {
      // Call the AI assistant function
      setMessage('');
      toast({
        title: "Message sent",
        description: "AI assistant is processing your request...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message to AI assistant",
        variant: "destructive",
      });
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    toast({
      title: isListening ? "Voice recording stopped" : "Voice recording started",
      description: isListening ? "Processing your voice input..." : "Speak now...",
    });
  };

  return (
    <>
      {/* Chat Toggle Button - Fixed position */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {/* Chat Panel - Slides up from bottom */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 shadow-2xl transition-transform duration-300 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="font-semibold">Property AI Assistant</h3>
              <Badge variant="secondary">Online</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="h-80 flex flex-col">
          {/* Quick Actions */}
          <div className="p-4 border-b border-gray-100 dark:border-slate-800">
            <p className="text-sm text-muted-foreground mb-3">Quick Actions:</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="justify-start">
                Analyze market trends
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                Property investment returns
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                ESG compliance checklist
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                Risk assessment factors
              </Button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <p className="text-sm">
                  Hello! I'm your Property Analysis AI Assistant. I can help you with property valuations, market analysis, investment assessments, and ESG compliance. How can I assist you today?
                </p>
                <p className="text-xs text-muted-foreground mt-1">10:39:10 PM</p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100 dark:border-slate-800">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about property analysis..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                onClick={toggleVoice}
                variant={isListening ? "destructive" : "outline"}
                size="icon"
              >
                <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
              </Button>
              <Button onClick={handleSendMessage} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomChatAssistant;