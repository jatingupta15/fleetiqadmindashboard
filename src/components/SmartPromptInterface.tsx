import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Sparkles, 
  MapPin,
  Clock,
  Users,
  Zap,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SmartPromptInterfaceProps {
  onQuery: (query: string) => void;
  isLoading?: boolean;
}

const SmartPromptInterface: React.FC<SmartPromptInterfaceProps> = ({ onQuery, isLoading = false }) => {
  const [query, setQuery] = useState('');

  const quickPrompts = [
    {
      text: "Today's routes from Noida to Gurgaon",
      icon: MapPin,
      color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
    },
    {
      text: "Show active routes right now",
      icon: Clock,
      color: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
    },
    {
      text: "Routes with available seats",
      icon: Users,
      color: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
    },
    {
      text: "Fastest route to Electronic City",
      icon: Zap,
      color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onQuery(query.trim());
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    setQuery(promptText);
    onQuery(promptText);
  };

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <CardHeader className="relative pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Smart Route Assistant
            </h2>
            <p className="text-muted-foreground">Ask me anything about routes, locations, or transportation</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative space-y-6">
        {/* Search Interface */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              placeholder="Ask me: 'Show today's final route from Whitefield to Electronic City' or 'Routes with available seats'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-12 h-14 text-lg bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="sm" 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0"
              disabled={!query.trim() || isLoading}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </form>

        {/* Quick Prompts */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Zap className="w-4 h-4" />
            Try these quick prompts:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickPrompts.map((prompt, index) => {
              const Icon = prompt.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleQuickPrompt(prompt.text)}
                  className={cn(
                    "justify-start h-auto p-4 transition-all duration-200",
                    prompt.color
                  )}
                  disabled={isLoading}
                >
                  <Icon className="w-4 h-4 mr-3 shrink-0" />
                  <span className="text-left">{prompt.text}</span>
                  <ArrowRight className="w-4 h-4 ml-auto opacity-50" />
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex -space-x-1">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">AI</div>
          </div>
          <span>Powered by intelligent route matching • Ask in natural language</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartPromptInterface;