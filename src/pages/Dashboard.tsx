
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
  Route
} from 'lucide-react';

const Dashboard = () => {
  const metrics = [
    { title: 'Total Rides Today', value: '127', change: '+12%', icon: Car, color: 'text-blue-600' },
    { title: 'Active Employees', value: '284', change: '+3%', icon: Users, color: 'text-green-600' },
    { title: 'Active Routes', value: '15', change: '+2', icon: Route, color: 'text-orange-600' },
    { title: 'SOS Alerts', value: '1', change: 'Active', icon: AlertTriangle, color: 'text-red-600' },
  ];

  const recentActivity = [
    { id: 1, type: 'Route Assigned', employee: 'John Doe', department: 'IT', time: '2 mins ago', status: 'active' },
    { id: 2, type: 'Route Completed', employee: 'Sarah Smith', department: 'HR', time: '5 mins ago', status: 'completed' },
    { id: 3, type: 'VIP Booking', employee: 'Director Mike', department: 'Executive', time: '10 mins ago', status: 'approved' },
    { id: 4, type: 'SOS Alert', employee: 'Sarah Chen', department: 'Finance', time: '12 mins ago', status: 'active' },
    { id: 5, type: 'Route Optimized', employee: 'Alex Johnson', department: 'Marketing', time: '15 mins ago', status: 'completed' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest routing activities, bookings, and alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">On-time Rides</span>
                <span className="text-sm font-bold text-green-600">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-[94%]"></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Route Efficiency</span>
                <span className="text-sm font-bold text-blue-600">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-[87%]"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fleet Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { vehicle: 'Sedan Fleet', usage: 45, color: 'bg-blue-500' },
                { vehicle: 'SUV Fleet', usage: 32, color: 'bg-green-500' },
                { vehicle: 'Executive Cars', usage: 28, color: 'bg-purple-500' },
                { vehicle: 'Minibus Fleet', usage: 22, color: 'bg-orange-500' },
              ].map((fleet) => (
                <div key={fleet.vehicle} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${fleet.color}`}></div>
                    <span className="text-sm font-medium">{fleet.vehicle}</span>
                  </div>
                  <span className="text-sm font-bold">{fleet.usage}% utilized</span>
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
