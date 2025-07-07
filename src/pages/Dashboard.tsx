
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
  X,
  Ban
} from 'lucide-react';

const Dashboard = () => {
  const metrics = [
    { title: 'Total Rides Today', value: '127', change: '+12%', icon: Car, color: 'text-blue-600' },
    { title: 'Active Employees', value: '284', change: '+3%', icon: Users, color: 'text-green-600' },
    { title: 'Active Routes', value: '15', change: '+2', icon: Route, color: 'text-orange-600' },
    { title: 'SOS Alerts', value: '1', change: 'Active', icon: AlertTriangle, color: 'text-red-600' },
  ];

  const todayStats = [
    { title: 'On-time Rides', value: '94%', color: 'text-green-600' },
    { title: 'Route Efficiency', value: '87%', color: 'text-blue-600' },
    { title: 'Cancellations', value: '8', color: 'text-red-600' },
    { title: 'Late Cancellations', value: '3', color: 'text-orange-600' },
  ];

  const cancellationStats = [
    { reason: 'Personal Emergency', count: 12, percentage: 35 },
    { reason: 'Work from Home', count: 8, percentage: 24 },
    { reason: 'Health Issues', count: 7, percentage: 21 },
    { reason: 'Vehicle Issues', count: 4, percentage: 12 },
    { reason: 'Others', count: 3, percentage: 8 },
  ];

  const recentActivity = [
    { id: 1, type: 'SOS Alert', employee: 'Sarah Chen', department: 'Finance', time: '2 mins ago', status: 'active' },
    { id: 2, type: 'Route Completed', employee: 'John Doe', department: 'IT', time: '5 mins ago', status: 'completed' },
    { id: 3, type: 'Late Cancellation', employee: 'Mike Wilson', department: 'Marketing', time: '8 mins ago', status: 'flagged' },
    { id: 4, type: 'VIP Booking', employee: 'Director Sarah', department: 'Executive', time: '10 mins ago', status: 'approved' },
    { id: 5, type: 'Route Optimized', employee: 'System', department: 'Auto', time: '15 mins ago', status: 'completed' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'flagged': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
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

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {todayStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                  <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                </div>
                {stat.title === 'Cancellations' && <Ban className="w-5 h-5 text-red-500" />}
                {stat.title === 'Late Cancellations' && <X className="w-5 h-5 text-orange-500" />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest routing activities, SOS alerts, and cancellations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'active' ? 'bg-red-600' : 
                      activity.status === 'flagged' ? 'bg-orange-600' : 'bg-indigo-600'
                    }`}></div>
                    <div>
                      <div className="font-medium">{activity.type}</div>
                      <div className="text-sm text-gray-600">
                        {activity.employee} • {activity.department}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                    {activity.status === 'active' && (
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

        {/* Cancellation Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Cancellation Analysis</CardTitle>
            <CardDescription>Top reasons for ride cancellations this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cancellationStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{stat.reason}</span>
                    <span className="text-sm text-gray-600">{stat.count} ({stat.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-red-50 rounded-lg">
              <div className="text-sm text-red-800">
                <strong>Alert:</strong> Late cancellations increased by 15% this week. 
                Consider implementing stricter policies.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fleet Utilization */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { vehicle: 'Sedan Fleet', usage: 85, color: 'bg-blue-500', total: 12, active: 10 },
              { vehicle: 'SUV Fleet', usage: 70, color: 'bg-green-500', total: 8, active: 6 },
              { vehicle: 'Executive Cars', usage: 60, color: 'bg-purple-500', total: 5, active: 3 },
              { vehicle: 'Backup Vehicles', usage: 40, color: 'bg-orange-500', total: 3, active: 1 },
            ].map((fleet) => (
              <div key={fleet.vehicle} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-3 h-3 rounded-full ${fleet.color}`}></div>
                  <span className="text-sm font-bold">{fleet.usage}%</span>
                </div>
                <div className="text-sm font-medium mb-1">{fleet.vehicle}</div>
                <div className="text-xs text-gray-600">{fleet.active}/{fleet.total} active</div>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                  <div 
                    className={`${fleet.color} h-1 rounded-full`} 
                    style={{ width: `${fleet.usage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
