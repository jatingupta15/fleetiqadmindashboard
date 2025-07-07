
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Car, 
  Calendar, 
  AlertTriangle,
  TrendingUp,
  Clock,
  MapPin,
  Phone,
  Route,
  Fuel,
  BarChart3,
  Shield,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Dashboard = () => {
  const metrics = [
    { title: 'Total Rides Today', value: '127', change: '+12%', icon: Car, color: 'text-blue-600' },
    { title: 'Active Employees', value: '284', change: '+3%', icon: Users, color: 'text-green-600' },
    { title: 'Active Routes', value: '15', change: '+2', icon: Route, color: 'text-orange-600' },
    { title: 'SOS Alerts', value: '1', change: 'Active', icon: AlertTriangle, color: 'text-red-600' },
  ];

  const recentActivity = [
    { 
      id: 1, 
      type: 'Route Assignment', 
      employee: 'John Doe', 
      department: 'IT', 
      time: '2 mins ago', 
      status: 'completed',
      details: 'Auto-assigned to Route A-12',
      priority: 'normal'
    },
    { 
      id: 2, 
      type: 'Emergency Ride', 
      employee: 'Sarah Smith', 
      department: 'HR', 
      time: '5 mins ago', 
      status: 'active',
      details: 'Medical emergency - Priority dispatch',
      priority: 'high'
    },
    { 
      id: 3, 
      type: 'Route Completion', 
      employee: 'Mike Johnson', 
      department: 'Finance', 
      time: '8 mins ago', 
      status: 'completed',
      details: 'Evening route completed on time',
      priority: 'normal'
    },
    { 
      id: 4, 
      type: 'SOS Alert', 
      employee: 'Sarah Chen', 
      department: 'Finance', 
      time: '12 mins ago', 
      status: 'resolved',
      details: 'Vehicle breakdown - Backup dispatched',
      priority: 'high'
    },
    { 
      id: 5, 
      type: 'Ride Cancellation', 
      employee: 'Alex Johnson', 
      department: 'Marketing', 
      time: '15 mins ago', 
      status: 'cancelled',
      details: 'Work from home - 30 min notice',
      priority: 'low'
    },
    { 
      id: 6, 
      type: 'Route Optimization', 
      employee: 'System Auto', 
      department: 'System', 
      time: '18 mins ago', 
      status: 'completed',
      details: 'Route B-7 optimized - 15% time saved',
      priority: 'normal'
    },
  ];

  const cancellationStats = [
    { reason: 'Work from Home', count: 18, percentage: 32, trend: '+5%' },
    { reason: 'Illness', count: 12, percentage: 21, trend: '-2%' },
    { reason: 'Personal Emergency', count: 9, percentage: 16, trend: '+1%' },
    { reason: 'Meeting Cancelled', count: 8, percentage: 14, trend: '-3%' },
    { reason: 'Traffic Issues', count: 6, percentage: 11, trend: '+2%' },
    { reason: 'Other', count: 3, percentage: 6, trend: '0%' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'resolved': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'normal': return 'border-l-blue-500';
      case 'low': return 'border-l-gray-400';
      default: return 'border-l-gray-400';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Route Assignment': return <Route className="w-4 h-4" />;
      case 'Emergency Ride': return <AlertTriangle className="w-4 h-4" />;
      case 'Route Completion': return <CheckCircle className="w-4 h-4" />;
      case 'SOS Alert': return <Shield className="w-4 h-4" />;
      case 'Ride Cancellation': return <XCircle className="w-4 h-4" />;
      case 'Route Optimization': return <BarChart3 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Real-time Activity Feed
          </CardTitle>
          <CardDescription>
            Live updates on routing activities, emergencies, and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className={`flex items-start justify-between p-4 rounded-lg border-l-4 ${getPriorityColor(activity.priority)} bg-gray-50 hover:bg-gray-100 transition-colors`}>
                <div className="flex items-start space-x-4">
                  <div className="mt-1 text-gray-500">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{activity.type}</span>
                      {activity.priority === 'high' && (
                        <Badge variant="destructive" className="text-xs">HIGH</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {activity.employee} • {activity.department}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {activity.details}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(activity.status)} variant="outline">
                    {activity.status}
                  </Badge>
                  <span className="text-sm text-gray-500 whitespace-nowrap">{activity.time}</span>
                  {(activity.status === 'active' || activity.priority === 'high') && (
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        <MapPin className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fleet Utilization - More Detailed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Car className="w-5 h-5 mr-2" />
              Fleet Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Sedan Fleet', active: 12, total: 15, efficiency: '94%', fuel: '85%', color: 'bg-blue-500' },
                { type: 'SUV Fleet', active: 8, total: 10, efficiency: '89%', fuel: '78%', color: 'bg-green-500' },
                { type: 'Executive Cars', active: 5, total: 6, efficiency: '92%', fuel: '82%', color: 'bg-purple-500' },
                { type: 'Minibus Fleet', active: 3, total: 4, efficiency: '87%', fuel: '76%', color: 'bg-orange-500' },
              ].map((fleet) => (
                <div key={fleet.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${fleet.color}`}></div>
                      <span className="text-sm font-medium">{fleet.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{fleet.active}/{fleet.total} Active</div>
                      <div className="text-xs text-gray-500">Efficiency: {fleet.efficiency}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs">
                        <span>Usage</span>
                        <span>{Math.round((fleet.active / fleet.total) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${fleet.color}`}
                          style={{ width: `${(fleet.active / fleet.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs">
                        <Fuel className="w-3 h-3" />
                        <span>{fleet.fuel}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-yellow-500 h-1.5 rounded-full"
                          style={{ width: fleet.fuel }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">On-time Rides</span>
                <span className="text-sm font-bold text-green-600">94.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-[94%]"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Route Efficiency</span>
                <span className="text-sm font-bold text-blue-600">87.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-[87%]"></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Fuel Efficiency</span>
                <span className="text-sm font-bold text-yellow-600">82.1%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full w-[82%]"></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Employee Satisfaction</span>
                <span className="text-sm font-bold text-purple-600">4.6/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full w-[92%]"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cancellation Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <XCircle className="w-5 h-5 mr-2" />
              Cancellation Insights
            </CardTitle>
            <CardDescription>
              Top reasons and trends (Last 30 days)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cancellationStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div>
                      <span className="text-sm font-medium">{stat.reason}</span>
                      <div className="text-xs text-gray-500">{stat.count} cases</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{stat.percentage}%</div>
                    <div className={`text-xs ${stat.trend.startsWith('+') ? 'text-red-500' : stat.trend.startsWith('-') ? 'text-green-500' : 'text-gray-500'}`}>
                      {stat.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
