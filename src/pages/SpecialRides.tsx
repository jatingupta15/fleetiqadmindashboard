
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmployeeRequestForm from '@/components/EmployeeRequestForm';
import VipBookingForm from '@/components/VipBookingForm';
import RequestStatusCard from '@/components/RequestStatusCard';
import RequestPreviewDialog from '@/components/RequestPreviewDialog';
import VipRequestInfo from '@/components/VipRequestInfo';
import { Users, Car } from 'lucide-react';
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
    tripType: 'both',
    reason: '',
    notes: ''
  });

  // Preview Dialog State
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Employee Booking Requests
  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 1,
      employeeName: 'Sarah Smith',
      employeeId: 'EMP002',
      department: 'HR',
      pickupLocation: 'Sector 62, Noida',
      dropLocation: 'Airport Terminal 3',
      rideDate: '2024-01-20',
      rideTime: '14:00',
      tripType: 'both',
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
      tripType: 'pickup-only',
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
      tripType: 'drop-only',
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
      tripType: 'both',
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

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setIsPreviewOpen(true);
  };

  const handleRequestSave = (updatedRequest) => {
    setBookingRequests(prev => 
      prev.map(req => req.id === updatedRequest.id ? updatedRequest : req)
    );
    toast({
      title: "Request Updated",
      description: "The booking request has been successfully updated",
    });
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
              <EmployeeRequestForm
                formData={empFormData}
                onInputChange={handleEmpInputChange}
                onLocationChange={handleEmpLocationChange}
                onSubmit={handleEmployeeSubmit}
              />
            </div>

            {/* Recent Requests */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Requests</CardTitle>
                  <CardDescription>Click on any request to view details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bookingRequests.map((request) => (
                      <div 
                        key={request.id} 
                        onClick={() => handleRequestClick(request)}
                        className="cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <RequestStatusCard request={request} />
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
              <VipBookingForm
                formData={vipFormData}
                onInputChange={handleVipInputChange}
                onLocationChange={handleVipLocationChange}
                onSubmit={handleVipSubmit}
              />
            </div>

            {/* Information Panel */}
            <VipRequestInfo />
          </div>
        </TabsContent>
      </Tabs>

      {/* Request Preview Dialog */}
      <RequestPreviewDialog
        request={selectedRequest}
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setSelectedRequest(null);
        }}
        onSave={handleRequestSave}
      />
    </div>
  );
};

export default SpecialRides;
