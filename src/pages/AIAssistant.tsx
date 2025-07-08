import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Send, 
  Sparkles, 
  MessageSquare,
  TrendingUp,
  Route,
  Users,
  AlertTriangle,
  Clock,
  Car
} from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your Smart AI Assistant. I can help you with transportation data, route analysis, employee management, and more. Try asking me about active rides, routing details, or employee statistics!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickSuggestions = [
    { 
      icon: TrendingUp, 
      text: "How many active rides are today?", 
      description: "Get current ride statistics" 
    },
    { 
      icon: Route, 
      text: "Show me all routing details for active routes", 
      description: "View route assignments and vehicle details" 
    },
    { 
      icon: Users, 
      text: "Which employees have the most cancellations?", 
      description: "Employee performance analysis" 
    },
    { 
      icon: AlertTriangle, 
      text: "Are there any SOS alerts or emergencies?", 
      description: "Safety and emergency status" 
    },
    { 
      icon: Clock, 
      text: "What's the on-time performance this week?", 
      description: "Performance metrics and analytics" 
    },
    { 
      icon: Car, 
      text: "Show vehicle utilization rates", 
      description: "Fleet management insights" 
    }
  ];

  const mockResponses: { [key: string]: string } = {
    'active rides': `📊 **Current Active Rides Summary:**
• Total Active Rides: 24
• Completed Today: 18
• In Progress: 6
• Scheduled: 12

**Route Breakdown:**
🚐 Route A (Noida-Gurgaon): 8 employees, Vehicle DL-01-AB-1234
🚐 Route B (Whitefield-Electronic City): 12 employees, Vehicle KA-05-CD-5678  
🚐 Route C (Andheri-BKC): 7 employees, Vehicle MH-12-EF-9012

Average trip duration: 47 minutes
On-time rate: 94%`,

    'routing details': `🗺️ **Active Route Details:**

**Route A - Noida Sector 62 to Gurgaon**
• Vehicle: DL-01-AB-1234 (Innova Crysta)
• Driver: Rajesh Kumar (+91 9876543210)
• Capacity: 12 seats (8 assigned)
• Departure: 08:30 AM
• Distance: 28 km, Duration: 45 mins
• Pickup Points: Sector 62 Metro → Sector 18 Mall → Botanical Garden

**Route B - Whitefield to Electronic City**
• Vehicle: KA-05-CD-5678 (Toyota Hiace)
• Driver: Suresh Reddy (+91 9876543211)
• Capacity: 15 seats (12 assigned)
• Departure: 09:00 AM
• Distance: 32 km, Duration: 55 mins

**Route C - Andheri to BKC**
• Vehicle: MH-12-EF-9012 (Maruti Ertiga)
• Driver: Ramesh Patil (+91 9876543212)
• Capacity: 10 seats (7 assigned)
• Departure: 08:45 AM
• Distance: 18 km, Duration: 40 mins`,

    'cancellations': `📈 **Employee Cancellation Analysis:**

**High Cancellation Employees:**
🔴 John Doe (EMP001): 3 cancellations (2 late)
🟡 Sarah Smith (EMP002): 2 cancellations (1 late)
🟡 Mike Wilson (EMP003): 2 cancellations (0 late)

**Top Cancellation Reasons:**
1. Work from home (40%)
2. Personal emergency (25%)
3. Vehicle breakdown (20%)
4. Illness (15%)

**Recommendations:**
• Implement stricter cancellation policy
• Increase communication about vehicle maintenance
• Consider flexible WFH scheduling`,

    'sos alerts': `🚨 **Safety & Emergency Status:**

**Current Status: ✅ ALL CLEAR**
• No active SOS alerts
• No emergency situations
• All vehicles reporting normal status

**Recent Activity (Last 24h):**
• 0 SOS alerts triggered
• 3 routine safety checks completed
• All drivers completed safety briefing

**Emergency Contacts Ready:**
• Control Room: Available 24/7
• Medical Emergency: +91-102
• Police Emergency: +91-100
• Fleet Manager: On standby`,

    'performance': `📊 **Weekly Performance Metrics:**

**On-Time Performance:**
• Overall: 94% (Target: 90%)
• Route A: 96% ⭐
• Route B: 91%
• Route C: 95%

**Service Quality:**
• Customer Satisfaction: 4.6/5
• Driver Rating: 4.7/5
• Vehicle Condition: 4.5/5

**Efficiency Metrics:**
• Average Delay: 3.2 minutes
• Fuel Efficiency: 15.2 km/l
• Route Optimization: 87%

**Trending Up:** On-time performance improved by 2% this week!`,

    'vehicle utilization': `🚗 **Fleet Utilization Report:**

**Current Fleet Status:**
• Total Vehicles: 15
• Active: 12 (80%)
• Maintenance: 2 (13%)
• Standby: 1 (7%)

**Utilization Rates:**
🟢 DL-01-AB-1234: 95% (Excellent)
🟢 KA-05-CD-5678: 88% (Good)
🟡 MH-12-EF-9012: 75% (Average)

**Recommendations:**
• Consider adding 1 more vehicle for peak hours
• Schedule maintenance during off-peak times
• Optimize Route C for better utilization

**Cost Efficiency:**
• Cost per km: ₹12.50
• Monthly savings: ₹45,000 (vs previous quarter)`
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    for (const [key, response] of Object.entries(mockResponses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }
    
    // Default responses for common patterns
    if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      return `🤖 **I can help you with:**

• **Ride Management:** Active rides, schedules, and bookings
• **Route Analysis:** Optimization, timing, and vehicle assignments  
• **Employee Insights:** Performance, cancellations, and statistics
• **Fleet Management:** Vehicle utilization and maintenance
• **Safety Monitoring:** SOS alerts and emergency protocols
• **Performance Metrics:** On-time rates, efficiency, and analytics

Try asking specific questions like "How many rides today?" or use the quick suggestions above!`;
    }
    
    if (lowerInput.includes('thank')) {
      return "You're welcome! I'm here to help with any transportation management questions. Feel free to ask me anything about your fleet operations! 😊";
    }
    
    return `I understand you're asking about "${input}". While I don't have specific data for that query yet, I can help you with:

• Current ride status and statistics
• Route details and optimization
• Employee performance analysis  
• Vehicle and fleet management
• Safety alerts and monitoring

Try rephrasing your question or use one of the quick suggestions above!`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        type: 'assistant',
        content: generateResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Smart AI Assistant</h1>
          <p className="text-gray-600">Get insights and manage your transportation system with AI</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800 ml-auto">
          <Sparkles className="w-3 h-3 mr-1" />
          Beta
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Suggestions */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Suggestions</CardTitle>
              <CardDescription>Click any suggestion to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickSuggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="w-4 h-4 mt-0.5 text-blue-600" />
                      <div className="text-sm">
                        <div className="font-medium">{suggestion.text}</div>
                        <div className="text-gray-500 text-xs mt-1">{suggestion.description}</div>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                AI Conversation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 space-y-4 overflow-y-auto mb-4 pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.type === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-600">AI Assistant</span>
                        </div>
                      )}
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </div>
                      <div className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">AI Assistant</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about your transportation system..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;