
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
  Ban,
  Fuel,
  Wrench,
  CheckCircle,
  XCircle,
  Activity,
  Navigation
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
    { 
      id: 1, 
      type: 'SOS Alert', 
      employee: 'Sarah Chen', 
      department: 'Finance', 
      time: '2 mins ago', 
      status: 'active',
      location: 'Sector 18, Noida',
      vehicle: 'DL-01-AB-1234'
    },
    { 
      id: 2, 
      type: 'Route Completed', 
      employee: 'John Doe', 
      department: 'IT', 
      time: '5 mins ago', 
      status: 'completed',
      location: 'DLF Cyber City',
      vehicle: 'DL-01-CD-5678'
    },
    { 
      id: 3, 
      type: 'Late Cancellation', 
      employee: 'Mike Wilson', 
      department: 'Marketing', 
      time: '8 mins ago', 
      status: 'flagged',
      location: 'Connaught Place',
      reason: 'Personal Emergency'
    },
    { 
      id: 4, 
      type: 'VIP Booking', 
      employee: 'Director Sarah', 
      department: 'Executive', 
      time: '10 mins ago', 
      status: 'approved',
      location: 'IGI Airport',
      vehicle: 'DL-01-EF-9012'
    },
    { 
      id: 5, 
      type: 'Route Optimized', 
      employee: 'System', 
      department: 'Auto', 
      time: '15 mins ago', 
      status: 'completed',
      location: 'Route A-12',
      improvement: '12% time saved'
    },
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'SOS Alert': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'Route Completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Late Cancellation': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'VIP Booking': return <Car className="w-4 h-4 text-purple-600" />;
      case 'Route Optimized': return <Navigation className="w-4 h-4 text-blue-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
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
              Latest routing activities, SOS alerts, and operational updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{activity.type}</span>
                        <Badge className={getStatusColor(activity.status)} variant="secondary">
                          {activity.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600">
                        <div>{activity.employee} • {activity.department}</div>
                        <div className="flex items-center space-x-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{activity.location}</span>
                        </div>
                        {activity.vehicle && (
                          <div className="flex items-center space-x-1">
                            <Car className="w-3 h-3" />
                            <span>{activity.vehicle}</span>
                          </div>
                        )}
                        {activity.reason && (
                          <div className="text-red-600">Reason: {activity.reason}</div>
                        )}
                        {activity.improvement && (
                          <div className="text-green-600">{activity.improvement}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{activity.time}</span>
                    {activity.status === 'active' && (
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                          <MapPin className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-6 w-6 p-0">
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

      {/* Enhanced Fleet Utilization */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Performance & Utilization</CardTitle>
          <CardDescription>Real-time fleet status and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                vehicle: 'Sedan Fleet', 
                usage: 85, 
                color: 'bg-blue-500', 
                total: 12, 
                active: 10, 
                maintenance: 1, 
                available: 1,
                fuelEfficiency: '18 km/l',
                avgTrips: '8.5/day'
              },
              { 
                vehicle: 'SUV Fleet', 
                usage: 70, 
                color: 'bg-green-500', 
                total: 8, 
                active: 6, 
                maintenance: 1, 
                available: 1,
                fuelEfficiency: '14 km/l',
                avgTrips: '6.2/day'
              },
              { 
                vehicle: 'Executive Cars', 
                usage: 60, 
                color: 'bg-purple-500', 
                total: 5, 
                active: 3, 
                maintenance: 0, 
                available: 2,
                fuelEfficiency: '16 km/l',
                avgTrips: '4.8/day'
              },
              { 
                vehicle: 'Backup Vehicles', 
                usage: 40, 
                color: 'bg-orange-500', 
                total: 3, 
                active: 1, 
                maintenance: 1, 
                available: 1,
                fuelEfficiency: '15 km/l',
                avgTrips: '2.1/day'
              },
            ].map((fleet) => (
              <div key={fleet.vehicle} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-3 h-3 rounded-full ${fleet.color}`}></div>
                  <span className="text-sm font-bold">{fleet.usage}%</span>
                </div>
                <div className="text-sm font-medium mb-2">{fleet.vehicle}</div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Active: {fleet.active}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Wrench className="w-3 h-3 text-orange-600" />
                    <span>Maintenance: {fleet.maintenance}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Car className="w-3 h-3 text-blue-600" />
                    <span>Available: {fleet.available}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Fuel className="w-3 h-3 text-green-600" />
                    <span>{fleet.fuelEfficiency}</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-600">
                  Avg: {fleet.avgTrips}
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${fleet.color} h-2 rounded-full transition-all duration-300`} 
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
