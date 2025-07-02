
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Search, 
  Filter, 
  AlertTriangle,
  Clock,
  User,
  Calendar,
  Building
} from 'lucide-react';

const Cancellations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('7');

  const cancellations = [
    {
      id: 1,
      employee: 'Sarah Chen',
      employeeId: 'EMP004',
      department: 'Finance',
      date: '2024-01-15',
      scheduledTime: '06:30 PM',
      cancellationTime: '02:45 PM',
      reason: 'Sudden illness - fever',
      withinWindow: true,
      hoursNotice: 3.75,
      repeatOffender: false
    },
    {
      id: 2,
      employee: 'John Doe',
      employeeId: 'EMP001',
      department: 'IT',
      date: '2024-01-14',
      scheduledTime: '09:00 AM',
      cancellationTime: '07:30 AM',
      reason: 'Work from home approved',
      withinWindow: true,
      hoursNotice: 1.5,
      repeatOffender: true
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      employeeId: 'EMP003',
      department: 'Finance',
      date: '2024-01-13',
      scheduledTime: '06:45 PM',
      cancellationTime: '01:00 PM',
      reason: 'Family emergency',
      withinWindow: false,
      hoursNotice: 5.75,
      repeatOffender: false
    },
    {
      id: 4,
      employee: 'Lisa Wang',
      employeeId: 'EMP006',
      department: 'Finance',
      date: '2024-01-12',
      scheduledTime: '09:15 AM',
      cancellationTime: '06:00 AM',
      reason: 'Car breakdown - using personal vehicle',
      withinWindow: true,
      hoursNotice: 3.25,
      repeatOffender: true
    },
    {
      id: 5,
      employee: 'Sarah Smith',
      employeeId: 'EMP002',
      department: 'HR',
      date: '2024-01-11',
      scheduledTime: '06:30 PM',
      cancellationTime: '10:30 AM',
      reason: 'Extended office hours',
      withinWindow: false,
      hoursNotice: 8,
      repeatOffender: false
    }
  ];

  const departments = ['all', 'IT', 'HR', 'Finance', 'Marketing', 'Operations'];

  const filteredCancellations = cancellations.filter(cancellation => {
    const matchesSearch = cancellation.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cancellation.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || cancellation.department === departmentFilter;
    
    // Date filter logic
    const cancellationDate = new Date(cancellation.date);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - cancellationDate.getTime()) / (1000 * 3600 * 24));
    const matchesDate = dateFilter === 'all' || daysDiff <= parseInt(dateFilter);
    
    return matchesSearch && matchesDepartment && matchesDate;
  });

  const lateCancellations = filteredCancellations.filter(c => c.withinWindow);
  const repeatOffenders = filteredCancellations.filter(c => c.repeatOffender);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cancellation Tracker</h1>
          <p className="text-gray-600">Monitor ride cancellations and identify patterns</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            {lateCancellations.length} Late Cancellations
          </Badge>
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            {repeatOffenders.length} Repeat Offenders
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Cancellations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredCancellations.length}</div>
            <div className="text-sm text-gray-600">This period</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Late Cancellations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lateCancellations.length}</div>
            <div className="text-sm text-gray-600">Within 4 hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Repeat Offenders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{repeatOffenders.length}</div>
            <div className="text-sm text-gray-600">Flagged employees</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredCancellations.length > 0 
                ? (filteredCancellations.reduce((sum, c) => sum + c.hoursNotice, 0) / filteredCancellations.length).toFixed(1)
                : '0'
              }h
            </div>
            <div className="text-sm text-gray-600">Hours notice</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
            
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="all">All time</option>
            </select>
          </div>
        </CardHeader>
      </Card>

      {/* Cancellations List */}
      <Card>
        <CardHeader>
          <CardTitle>Cancellation History</CardTitle>
          <CardDescription>
            Recent ride cancellations with timing and reason analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCancellations.map((cancellation) => (
              <div
                key={cancellation.id}
                className={`p-4 border rounded-lg ${
                  cancellation.withinWindow ? 'border-red-200 bg-red-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="font-medium text-gray-900 flex items-center space-x-2">
                          <span>{cancellation.employee}</span>
                          {cancellation.repeatOffender && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Repeat Offender
                            </Badge>
                          )}
                          {cancellation.withinWindow && (
                            <Badge variant="destructive" className="text-xs">
                              Late Cancellation
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {cancellation.employeeId} • {cancellation.department}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>{cancellation.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>Scheduled: {cancellation.scheduledTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <X className="w-4 h-4 text-red-500" />
                          <span>Cancelled: {cancellation.cancellationTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span>{cancellation.hoursNotice}h notice</span>
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded border">
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Reason:</span>{' '}
                          <span className="text-gray-600">{cancellation.reason}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cancellations;
