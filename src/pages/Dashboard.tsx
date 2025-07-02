
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
  Phone
} from 'lucide-react';

const Dashboard = () => {
  const metrics = [
    { title: 'Total Rides Today', value: '127', change: '+12%', icon: Car, color: 'text-blue-600' },
    { title: 'Active Employees', value: '284', change: '+3%', icon: Users, color: 'text-green-600' },
    { title: 'Pending Requests', value: '8', change: '-2', icon: Calendar, color: 'text-orange-600' },
    { title: 'SOS Alerts', value: '1', change: 'Active', icon: AlertTriangle, color: 'text-red-600' },
  ];

  const recentActivity = [
    { id: 1, type: 'Ride Request', employee: 'John Doe', department: 'IT', time: '2 mins ago', status: 'pending' },
    { id: 2, type: 'Cancellation', employee: 'Sarah Smith', department: 'HR', time: '5 mins ago', status: 'cancelled' },
    { id: 3, type: 'Special Ride', employee: 'Director Mike', department: 'Executive', time: '10 mins ago', status: 'approved' },
    { id: 4, type: 'SOS Alert', employee: 'Sarah Chen', department: 'Finance', time: '12 mins ago', status: 'active' },
    { id: 5, type: 'Ride Completed', employee: 'Alex Johnson', department: 'Marketing', time: '15 mins ago', status: 'completed' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-red-100 text-red-800';
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest ride requests, cancellations, and alerts
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
                <span className="text-sm font-medium">Cancellation Rate</span>
                <span className="text-sm font-bold text-red-600">6%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full w-[6%]"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { dept: 'IT', rides: 45, color: 'bg-blue-500' },
                { dept: 'Finance', rides: 32, color: 'bg-green-500' },
                { dept: 'HR', rides: 28, color: 'bg-purple-500' },
                { dept: 'Marketing', rides: 22, color: 'bg-orange-500' },
              ].map((dept) => (
                <div key={dept.dept} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                    <span className="text-sm font-medium">{dept.dept}</span>
                  </div>
                  <span className="text-sm font-bold">{dept.rides} rides</span>
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
