
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  Users,
  Car,
  X,
  Clock,
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Sample data for charts
  const rideUsageData = [
    { date: 'Jan 1', rides: 45, cancellations: 3, lateRides: 2 },
    { date: 'Jan 2', rides: 52, cancellations: 1, lateRides: 1 },
    { date: 'Jan 3', rides: 48, cancellations: 2, lateRides: 3 },
    { date: 'Jan 4', rides: 61, cancellations: 4, lateRides: 2 },
    { date: 'Jan 5', rides: 55, cancellations: 2, lateRides: 1 },
    { date: 'Jan 6', rides: 39, cancellations: 1, lateRides: 0 },
    { date: 'Jan 7', rides: 44, cancellations: 3, lateRides: 2 },
  ];

  const departmentData = [
    { name: 'IT', rides: 145, color: '#3B82F6' },
    { name: 'Finance', rides: 98, color: '#10B981' },
    { name: 'HR', rides: 67, color: '#F59E0B' },
    { name: 'Marketing', rides: 54, color: '#EF4444' },
    { name: 'Operations', rides: 43, color: '#8B5CF6' },
  ];

  const requestTrendsData = [
    { month: 'Oct', routeChanges: 12, timeChanges: 8, additionalStops: 3 },
    { month: 'Nov', routeChanges: 15, timeChanges: 11, additionalStops: 5 },
    { month: 'Dec', routeChanges: 18, timeChanges: 9, additionalStops: 4 },
    { month: 'Jan', routeChanges: 21, timeChanges: 13, additionalStops: 7 },
  ];

  const performanceMetrics = [
    { metric: 'On-Time Rate', value: '94.2%', change: '+2.1%', trend: 'up' },
    { metric: 'Cancellation Rate', value: '5.8%', change: '-1.3%', trend: 'down' },
    { metric: 'Employee Satisfaction', value: '4.6/5', change: '+0.2', trend: 'up' },
    { metric: 'Avg Response Time', value: '3.2 min', change: '-0.5 min', trend: 'down' },
  ];

  const topCancellationReasons = [
    { reason: 'Illness', count: 23, percentage: 35 },
    { reason: 'Work from Home', count: 18, percentage: 27 },
    { reason: 'Personal Emergency', count: 12, percentage: 18 },
    { reason: 'Meeting Cancelled', count: 8, percentage: 12 },
    { reason: 'Other', count: 5, percentage: 8 },
  ];

  const departments = ['all', 'IT', 'Finance', 'HR', 'Marketing', 'Operations'];

  const handleExportReport = () => {
    // Simulate report generation
    const reportData = {
      dateRange,
      department: selectedDepartment,
      metrics: performanceMetrics,
      rideData: rideUsageData,
      departmentUsage: departmentData
    };
    
    console.log('Generating report with data:', reportData);
    
    // Create a simple text report
    const report = `
Fleet Management Analytics Report
Generated: ${new Date().toLocaleDateString()}
Date Range: Last ${dateRange} days
Department: ${selectedDepartment === 'all' ? 'All Departments' : selectedDepartment}

Performance Metrics:
${performanceMetrics.map(m => `- ${m.metric}: ${m.value} (${m.change})`).join('\n')}

Department Usage:
${departmentData.map(d => `- ${d.name}: ${d.rides} rides`).join('\n')}

Top Cancellation Reasons:
${topCancellationReasons.map(r => `- ${r.reason}: ${r.count} (${r.percentage}%)`).join('\n')}
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fleet-analytics-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="w-6 h-6 mr-2" />
            Analytics & Reports
          </h1>
          <p className="text-gray-600">Comprehensive insights into fleet usage and performance</p>
        </div>
        <Button onClick={handleExportReport} className="flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={`flex items-center text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`w-4 h-4 mr-1 ${
                  metric.trend === 'down' ? 'rotate-180' : ''
                }`} />
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ride Usage Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Ride Usage Trends</CardTitle>
            <CardDescription>Daily ride volume, cancellations, and delays</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rideUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rides" fill="#3B82F6" name="Total Rides" />
                <Bar dataKey="cancellations" fill="#EF4444" name="Cancellations" />
                <Bar dataKey="lateRides" fill="#F59E0B" name="Late Rides" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Department Usage</CardTitle>
            <CardDescription>Ride distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="rides"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Request Trends</CardTitle>
            <CardDescription>Employee ride change requests over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={requestTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="routeChanges" stroke="#3B82F6" name="Route Changes" strokeWidth={2} />
                <Line type="monotone" dataKey="timeChanges" stroke="#10B981" name="Time Changes" strokeWidth={2} />
                <Line type="monotone" dataKey="additionalStops" stroke="#F59E0B" name="Additional Stops" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cancellation Reasons */}
        <Card>
          <CardHeader>
            <CardTitle>Top Cancellation Reasons</CardTitle>
            <CardDescription>Most common reasons for ride cancellations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCancellationReasons.map((reason, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
                    <span className="font-medium">{reason.reason}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${reason.percentage}%` }}
                      ></div>
                    </div>
                    <Badge variant="secondary">{reason.count}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Peak Usage Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Morning (8-10 AM)</span>
                <Badge>67% of rides</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Evening (6-8 PM)</span>
                <Badge>74% of rides</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Lunch (12-2 PM)</span>
                <Badge>23% of rides</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Route Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Route Time</span>
                <Badge variant="secondary">28 min</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Fastest Route</span>
                <Badge variant="secondary">18 min</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Longest Route</span>
                <Badge variant="secondary">45 min</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employee Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Users</span>
                <Badge>284 employees</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Daily Avg Rides</span>
                <Badge>127 rides</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Utilization Rate</span>
                <Badge>89%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
