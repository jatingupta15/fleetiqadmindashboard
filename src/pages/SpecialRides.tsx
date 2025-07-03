import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import GoogleLocationPicker from '@/components/GoogleLocationPicker';
import { 
  Plus, 
  User, 
  MapPin, 
  Calendar, 
  Clock,
  Car,
  Send,
  Users,
  CheckCircle,
  XCircle,
  MessageSquare
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SpecialRides = () => {
  // VIP Booking Form State
  const [vipFormData, setVipFormData] = useState({
    riderName: '',
    riderPhone: '',
    pickupLocation: '',
    dropLocation: '',
    rideDate: '',
    rideTime: '',
    duration: '1',
    vehicleType: 'Economy',
    notes: ''
  });

  // Employee Booking Form State
  const [empFormData, setEmpFormData] = useState({
    employeeName: '',
    employeeId: '',
    department: '',
    pickupLocation: '',
    dropLocation: '',
    rideDate: '',
    rideTime: '',
    reason: '',
    notes: ''
  });

  // Employee Booking Requests
  const [bookingRequests] = useState([
    {
      id: 1,
      employeeName: 'Sarah Smith',
      employeeId: 'EMP002',
      department: 'HR',
      pickupLocation: 'Sector 62, Noida',
      dropLocation: 'Airport Terminal 3',
      rideDate: '2024-01-20',
      rideTime: '14:00',
      reason: 'Client meeting in Mumbai',
      status: 'pending',
      requestDate: '2024-01-15',
      notes: 'Need to reach by 4 PM for 6 PM flight'
    },
    {
      id: 2,
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'IT',
      pickupLocation: 'Electronic City, Bangalore',
      dropLocation: 'Bangalore Railway Station',
      rideDate: '2024-01-18',
      rideTime: '06:30',
      reason: 'Personal emergency - family member hospitalization',
      status: 'approved',
      requestDate: '2024-01-14',
      notes: 'Urgent - approved for emergency travel'
    },
    {
      id: 3,
      employeeName: 'Alex Johnson',
      employeeId: 'EMP005',
      department: 'Marketing',
      pickupLocation: 'Gurgaon Office',
      dropLocation: 'Max Hospital, Saket',
      rideDate: '2024-01-16',
      rideTime: '10:00',
      reason: 'Medical appointment',
      status: 'declined',
      requestDate: '2024-01-13',
      notes: 'Alternative transportation arrangements made'
    }
  ]);

  const handleVipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "VIP Ride Request Submitted",
      description: "Your request has been sent to the Super Admin for approval",
    });
    setVipFormData({
      riderName: '',
      riderPhone: '',
      pickupLocation: '',
      dropLocation: '',
      rideDate: '',
      rideTime: '',
      duration: '1',
      vehicleType: 'Economy',
      notes: ''
    });
  };

  const handleEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Employee Ride Request Submitted",
      description: "Your booking request has been submitted for approval",
    });
    setEmpFormData({
      employeeName: '',
      employeeId: '',
      department: '',
      pickupLocation: '',
      dropLocation: '',
      rideDate: '',
      rideTime: '',
      reason: '',
      notes: ''
    });
  };

  const handleVipInputChange = (field: string, value: string) => {
    setVipFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmpInputChange = (field: string, value: string) => {
    setEmpFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVipLocationChange = (field: string, value: string, placeDetails?: any) => {
    setVipFormData(prev => ({ ...prev, [field]: value }));
    console.log('VIP Location selected:', { field, value, placeDetails });
  };

  const handleEmpLocationChange = (field: string, value: string, placeDetails?: any) => {
    setEmpFormData(prev => ({ ...prev, [field]: value }));
    console.log('Employee Location selected:', { field, value, placeDetails });
  };

  const vehicleTypes = [
    { value: 'Economy', label: 'Economy', description: 'Standard sedan' },
    { value: 'Premium', label: 'Premium', description: 'Luxury sedan' },
    { value: 'Business', label: 'Business', description: 'Executive SUV' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'declined': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Special Ride Booking</h1>
          <p className="text-gray-600">Book rides for VIP requirements and manage employee requests</p>
        </div>
      </div>

      <Tabs defaultValue="employee-requests" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="employee-requests" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Employee Requests
          </TabsTrigger>
          <TabsTrigger value="vip-booking" className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            VIP Booking
          </TabsTrigger>
        </TabsList>

        {/* Employee Requests Tab */}
        <TabsContent value="employee-requests" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Employee Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Employee Ride Request
                  </CardTitle>
                  <CardDescription>
                    Submit a ride request for official or emergency purposes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmployeeSubmit} className="space-y-6">
                    {/* Employee Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Employee Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="employeeName">Employee Name *</Label>
                          <Input
                            id="employeeName"
                            placeholder="Your full name"
                            value={empFormData.employeeName}
                            onChange={(e) => handleEmpInputChange('employeeName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employeeId">Employee ID *</Label>
                          <Input
                            id="employeeId"
                            placeholder="EMP001"
                            value={empFormData.employeeId}
                            onChange={(e) => handleEmpInputChange('employeeId', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department *</Label>
                          <Input
                            id="department"
                            placeholder="IT, HR, Finance, etc."
                            value={empFormData.department}
                            onChange={(e) => handleEmpInputChange('department', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Location Details
                      </h3>
                      <div className="space-y-4">
                        <GoogleLocationPicker
                          label="Pickup Location"
                          placeholder="Search for pickup location..."
                          value={empFormData.pickupLocation}
                          onChange={(value, placeDetails) => handleEmpLocationChange('pickupLocation', value, placeDetails)}
                          required
                        />
                        <GoogleLocationPicker
                          label="Drop Location"
                          placeholder="Search for drop location..."
                          value={empFormData.dropLocation}
                          onChange={(value, placeDetails) => handleEmpLocationChange('dropLocation', value, placeDetails)}
                          required
                        />
                      </div>
                    </div>

                    {/* Schedule Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Schedule Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="empRideDate">Date *</Label>
                          <Input
                            id="empRideDate"
                            type="date"
                            value={empFormData.rideDate}
                            onChange={(e) => handleEmpInputChange('rideDate', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="empRideTime">Time *</Label>
                          <Input
                            id="empRideTime"
                            type="time"
                            value={empFormData.rideTime}
                            onChange={(e) => handleEmpInputChange('rideTime', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Request *</Label>
                      <Input
                        id="reason"
                        placeholder="Official meeting, emergency, medical, etc."
                        value={empFormData.reason}
                        onChange={(e) => handleEmpInputChange('reason', e.target.value)}
                        required
                      />
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-2">
                      <Label htmlFor="empNotes">Additional Notes</Label>
                      <Textarea
                        id="empNotes"
                        placeholder="Any special instructions or requirements..."
                        value={empFormData.notes}
                        onChange={(e) => handleEmpInputChange('notes', e.target.value)}
                        className="h-20"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Recent Requests */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Requests</CardTitle>
                  <CardDescription>Your submitted booking requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bookingRequests.map((request) => (
                      <div key={request.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">{request.employeeName}</div>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(request.status)}
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div>{request.rideDate} at {request.rideTime}</div>
                          <div>{request.reason}</div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{request.pickupLocation} → {request.dropLocation}</span>
                          </div>
                        </div>
                        {request.notes && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                            <MessageSquare className="w-3 h-3 inline mr-1" />
                            {request.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* VIP Booking Tab */}
        <TabsContent value="vip-booking" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* VIP Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Car className="w-5 h-5 mr-2" />
                    VIP Ride Request
                  </CardTitle>
                  <CardDescription>
                    Submit a request for VIP transportation needs. All requests require Super Admin approval.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVipSubmit} className="space-y-6">
                    {/* Rider Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Rider Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="riderName">Rider Name *</Label>
                          <Input
                            id="riderName"
                            placeholder="Enter rider's full name"
                            value={vipFormData.riderName}
                            onChange={(e) => handleVipInputChange('riderName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="riderPhone">Contact Number *</Label>
                          <Input
                            id="riderPhone"
                            placeholder="+91 9876543210"
                            value={vipFormData.riderPhone}
                            onChange={(e) => handleVipInputChange('riderPhone', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Location Details
                      </h3>
                      <div className="space-y-4">
                        <GoogleLocationPicker
                          label="Pickup Location"
                          placeholder="Search for pickup location..."
                          value={vipFormData.pickupLocation}
                          onChange={(value, placeDetails) => handleVipLocationChange('pickupLocation', value, placeDetails)}
                          required
                        />
                        <GoogleLocationPicker
                          label="Drop Location"
                          placeholder="Search for drop location..."
                          value={vipFormData.dropLocation}
                          onChange={(value, placeDetails) => handleVipLocationChange('dropLocation', value, placeDetails)}
                          required
                        />
                      </div>
                    </div>

                    {/* Schedule Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Schedule Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="rideDate">Date *</Label>
                          <Input
                            id="rideDate"
                            type="date"
                            value={vipFormData.rideDate}
                            onChange={(e) => handleVipInputChange('rideDate', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rideTime">Time *</Label>
                          <Input
                            id="rideTime"
                            type="time"
                            value={vipFormData.rideTime}
                            onChange={(e) => handleVipInputChange('rideTime', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration (hours)</Label>
                          <select
                            id="duration"
                            value={vipFormData.duration}
                            onChange={(e) => handleVipInputChange('duration', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="1">1 hour</option>
                            <option value="2">2 hours</option>
                            <option value="4">4 hours</option>
                            <option value="8">8 hours</option>
                            <option value="12">12 hours</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Type */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Vehicle Type
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {vehicleTypes.map((type) => (
                          <div
                            key={type.value}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              vipFormData.vehicleType === type.value
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handleVipInputChange('vehicleType', type.value)}
                          >
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="vehicleType"
                                value={type.value}
                                checked={vipFormData.vehicleType === type.value}
                                onChange={() => handleVipInputChange('vehicleType', type.value)}
                              />
                              <div>
                                <div className="font-medium">{type.label}</div>
                                <div className="text-sm text-gray-600">{type.description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special instructions or requirements..."
                        value={vipFormData.notes}
                        onChange={(e) => handleVipInputChange('notes', e.target.value)}
                        className="h-20"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Information Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Important Notes:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• All VIP requests require Super Admin approval</li>
                      <li>• Submit requests at least 24 hours in advance</li>
                      <li>• Driver and vehicle assignment is handled by Super Admin</li>
                      <li>• You will receive approval/rejection notification</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Google Maps Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-sm font-medium">Enhanced Location Picker</div>
                      <div className="text-xs text-gray-600">
                        Search and select precise locations with Google Maps integration
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Requires Google Maps API key for full functionality
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent VIP Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="text-sm font-medium">Director Meeting</div>
                      <div className="text-xs text-gray-600">Jan 20, 2:00 PM • Pending</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-sm font-medium">Client Visit</div>
                      <div className="text-xs text-gray-600">Jan 18, 10:00 AM • Approved</div>
                    </div>
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="text-sm font-medium">Airport Pickup</div>
                      <div className="text-xs text-gray-600">Jan 15, 3:00 PM • Declined</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SpecialRides;
