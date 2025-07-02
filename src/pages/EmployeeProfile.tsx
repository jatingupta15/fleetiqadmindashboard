
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  User, 
  Car, 
  Calendar, 
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertTriangle
} from 'lucide-react';

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');

  const employee = {
    id: 1,
    code: 'EMP001',
    name: 'John Doe',
    designation: 'Software Engineer',
    department: 'IT',
    shift: 'Day',
    mobile: '+91 9876543210',
    email: 'john.doe@company.com',
    address: 'Sector 62, Noida, UP - 201301',
    gender: 'Male',
    status: 'Active',
    joinDate: '2023-01-15',
    emergencyContact: '+91 9876543220'
  };

  const rideHistory = [
    { id: 1, date: '2024-01-15', pickup: 'Sector 62, Noida', drop: 'DLF Cyber City', status: 'Completed', time: '09:15 AM' },
    { id: 2, date: '2024-01-14', pickup: 'DLF Cyber City', drop: 'Sector 62, Noida', status: 'Completed', time: '06:30 PM' },
    { id: 3, date: '2024-01-13', pickup: 'Sector 62, Noida', drop: 'DLF Cyber City', status: 'Completed', time: '09:20 AM' },
    { id: 4, date: '2024-01-12', pickup: 'DLF Cyber City', drop: 'Sector 62, Noida', status: 'Cancelled', time: '06:25 PM' },
  ];

  const requests = [
    { id: 1, date: '2024-01-10', type: 'Route Change', currentRoute: 'Sector 62 → DLF Cyber City', requestedRoute: 'Sector 62 → Gurgaon Mall', status: 'Approved', reason: 'Medical appointment' },
    { id: 2, date: '2024-01-08', type: 'Time Change', currentTime: '09:00 AM', requestedTime: '08:30 AM', status: 'Pending', reason: 'Early meeting' },
  ];

  const cancellations = [
    { id: 1, date: '2024-01-12', time: '6:25 PM', reason: 'Sudden illness', withinWindow: false },
    { id: 2, date: '2024-01-05', time: '9:00 AM', reason: 'Work from home', withinWindow: true },
    { id: 3, date: '2023-12-28', time: '6:30 PM', reason: 'Personal emergency', withinWindow: false },
  ];

  const lateCancellations = cancellations.filter(c => c.withinWindow).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/employees')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Employees
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
            <p className="text-gray-600">{employee.code} • {employee.designation}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Edit Profile</Button>
          <Button variant="destructive">Deactivate</Button>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-green-600">This month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">On-time Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <div className="text-sm text-gray-600">Average</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Cancellations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-red-600">{lateCancellations} late</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
            {lateCancellations >= 3 && (
              <Badge className="bg-red-100 text-red-800 mt-2">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Flagged
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="history">Ride History</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="cancellations">Cancellations</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Employee Code</label>
                    <div className="text-gray-900">{employee.code}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Gender</label>
                    <div className="text-gray-900">{employee.gender}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Department</label>
                    <div className="text-gray-900">{employee.department}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Shift</label>
                    <div className="text-gray-900">{employee.shift}</div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Join Date</label>
                  <div className="text-gray-900">{employee.joinDate}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Mobile</div>
                    <div className="text-gray-900">{employee.mobile}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-gray-900">{employee.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Address</div>
                    <div className="text-gray-900">{employee.address}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Emergency Contact</div>
                    <div className="text-gray-900">{employee.emergencyContact}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Rides</CardTitle>
              <CardDescription>Last 30 days ride history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rideHistory.map((ride) => (
                  <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        ride.status === 'Completed' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <div className="font-medium">{ride.pickup} → {ride.drop}</div>
                        <div className="text-sm text-gray-600">{ride.date} • {ride.time}</div>
                      </div>
                    </div>
                    <Badge className={ride.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {ride.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ride Change Requests</CardTitle>
              <CardDescription>Employee submitted requests for route or time changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="font-medium">{request.type}</div>
                        <div className="text-sm text-gray-600">
                          {request.type === 'Route Change' ? (
                            <>
                              <div>Current: {request.currentRoute}</div>
                              <div>Requested: {request.requestedRoute}</div>
                            </>
                          ) : (
                            <>
                              <div>Current: {request.currentTime}</div>
                              <div>Requested: {request.requestedTime}</div>
                            </>
                          )}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Reason:</span> {request.reason}
                        </div>
                        <div className="text-sm text-gray-500">{request.date}</div>
                      </div>
                      <Badge className={request.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancellations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <X className="w-5 h-5 mr-2" />
                Cancellation History
              </CardTitle>
              <CardDescription>
                Recent ride cancellations
                {lateCancellations >= 3 && (
                  <Badge className="bg-red-100 text-red-800 ml-2">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Frequent Late Cancellations
                  </Badge>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cancellations.map((cancellation) => (
                  <div key={cancellation.id} className={`p-4 border rounded-lg ${
                    cancellation.withinWindow ? 'border-red-200 bg-red-50' : 'border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">{cancellation.date} • {cancellation.time}</span>
                          {cancellation.withinWindow && (
                            <Badge variant="destructive" className="text-xs">
                              Within 4 hours
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Reason:</span> {cancellation.reason}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeProfile;
