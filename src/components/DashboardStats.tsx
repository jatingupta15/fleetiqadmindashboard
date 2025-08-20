import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Car, 
  Route,
  AlertTriangle,
  Clock,
  MapPin,
  Zap,
  CheckCircle,
  ArrowUpRight,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DashboardStats = () => {
  const mainMetrics = [
    { 
      title: 'Active Routes', 
      value: '24', 
      change: '+3 from yesterday',
      changeType: 'positive',
      icon: Route, 
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      description: 'Currently running'
    },
    { 
      title: 'Total Rides Today', 
      value: '342', 
      change: '+18% vs last week',
      changeType: 'positive',
      icon: Car, 
      color: 'bg-green-50 text-green-600 border-green-200',
      description: 'Completed rides'
    },
    { 
      title: 'Active Employees', 
      value: '286', 
      change: '94% attendance',
      changeType: 'neutral',
      icon: Users, 
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      description: 'Using transport'
    },
    { 
      title: 'Live Tracking', 
      value: '18', 
      change: 'All vehicles online',
      changeType: 'positive',
      icon: MapPin, 
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      description: 'Vehicles monitored'
    }
  ];

  const performanceMetrics = [
    { label: 'On-time Performance', value: 94.2, color: 'bg-green-500', trend: '+2.1%' },
    { label: 'Route Efficiency', value: 89.7, color: 'bg-blue-500', trend: '+1.5%' },
    { label: 'Seat Utilization', value: 87.3, color: 'bg-purple-500', trend: '+3.2%' },
    { label: 'Rider Satisfaction', value: 92.8, color: 'bg-orange-500', trend: '+0.8%' }
  ];

  const liveUpdates = [
    {
      type: 'Route Completed',
      description: 'Route A-12 completed successfully',
      time: '2 min ago',
      status: 'success',
      icon: CheckCircle
    },
    {
      type: 'New Booking',
      description: 'Emergency ride requested',
      time: '5 min ago',
      status: 'active',
      icon: AlertTriangle
    },
    {
      type: 'Route Optimized',
      description: 'Route B-7 optimized - 12% faster',
      time: '8 min ago',
      status: 'success',
      icon: Zap
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-200 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", metric.color)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground group-hover:scale-105 transition-transform">
                      {metric.value}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">{metric.title}</h3>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                  
                  <div className="flex items-center gap-1 text-sm">
                    {metric.changeType === 'positive' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : metric.changeType === 'negative' ? (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    ) : (
                      <BarChart3 className="w-4 h-4 text-gray-600" />
                    )}
                    <span className={cn(
                      "text-xs font-medium",
                      metric.changeType === 'positive' ? 'text-green-600' : 
                      metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                    )}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{metric.value}%</span>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      {metric.trend}
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={cn("h-2 rounded-full transition-all duration-500", metric.color)}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Live Updates */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Live Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {liveUpdates.map((update, index) => {
              const Icon = update.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    update.status === 'success' ? 'bg-green-100 text-green-600' :
                    update.status === 'active' ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-100 text-blue-600'
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{update.type}</p>
                    <p className="text-xs text-muted-foreground mt-1">{update.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{update.time}</p>
                  </div>
                </div>
              );
            })}
            
            <div className="text-center pt-2">
              <button className="text-xs text-primary hover:text-primary/80 font-medium">
                View all updates →
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;