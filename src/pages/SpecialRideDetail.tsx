
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Clock, 
  Car,
  Edit,
  Save,
  X,
  Phone,
  Calendar
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SpecialRideDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedRequest, setEditedRequest] = useState({
    pickup: 'Sector 62, Noida',
    destination: 'IGI Airport Terminal 3',
    date: '2024-01-20',
    time: '14:30',
    passengers: '2',
    specialRequirements: 'Need child seat, Airport pickup required'
  });

  const request = {
    id: 'SR001',
    employee: 'Sarah Chen',
    employeeId: 'EMP004',
    department: 'Finance',
    phone: '+91 9876543213',
    requestType: 'VIP Booking',
    status: 'Pending',
    priority: 'High',
    createdAt: '2024-01-15 10:30:00',
    requestedFor: '2024-01-20 14:30:00',
    pickup: 'Sector 62, Noida',
    destination: 'IGI Airport Terminal 3',
    estimatedDuration: '45 mins',
    estimatedDistance: '28 km',
    passengers: 2,
    specialRequirements: 'Need child seat, Airport pickup required',
    assignedVehicle: null,
    assignedDriver: null,
    approvedBy: null,
    canEdit: true, // This would come from super admin settings
    editDeadline: '2024-01-18 10:30:00' // 3 days from creation
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    toast({
      title: "Request Updated",
      description: "Special ride request has been successfully updated",
    });
  };

  const handleApprove = () => {
    toast({
      title: "Request Approved",
      description: "Special ride request has been approved and assigned",
    });
  };

  const handleReject = () => {
    toast({
      title: "Request Rejected",
      description: "Special ride request has been rejected",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/special-rides')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Special Rides
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Special Ride Request #{request.id}</h1>
            <p className="text-gray-600">{request.requestType} • {request.employee}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge className={getStatusColor(request.status)}>
            {request.status}
          </Badge>
          <Badge className={getPriorityColor(request.priority)}>
            {request.priority} Priority
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Request Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Employee Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Employee Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <div className="text-gray-900 font-medium">{request.employee}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Employee ID</label>
                  <div className="text-gray-900">{request.employeeId}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Department</label>
                  <div className="text-gray-900">{request.department}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <div className="text-gray-900 flex items-center gap-2">
                    {request.phone}
                    <Button variant="ghost" size="sm">
                      <Phone className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trip Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Trip Details
                </div>
                {request.canEdit && new Date() < new Date(request.editDeadline) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Pickup Location</label>
                  {isEditing ? (
                    <Input
                      value={editedRequest.pickup}
                      onChange={(e) => setEditedRequest({...editedRequest, pickup: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-gray-900">{request.pickup}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Destination</label>
                  {isEditing ? (
                    <Input
                      value={editedRequest.destination}
                      onChange={(e) => setEditedRequest({...editedRequest, destination: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-gray-900">{request.destination}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Date</label>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={editedRequest.date}
                      onChange={(e) => setEditedRequest({...editedRequest, date: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-gray-900">{request.requestedFor.split(' ')[0]}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Time</label>
                  {isEditing ? (
                    <Input
                      type="time"
                      value={editedRequest.time}
                      onChange={(e) => setEditedRequest({...editedRequest, time: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-gray-900">{request.requestedFor.split(' ')[1]}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Passengers</label>
                  {isEditing ? (
                    <Input
                      type="number"
                      min="1"
                      max="4"
                      value={editedRequest.passengers}
                      onChange={(e) => setEditedRequest({...editedRequest, passengers: e.target.value})}
                      className="mt-1"
                    />
                  ) : (
                    <div className="text-gray-900">{request.passengers}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Estimated Duration</label>
                  <div className="text-gray-900">{request.estimatedDuration}</div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Special Requirements</label>
                {isEditing ? (
                  <Textarea
                    value={editedRequest.specialRequirements}
                    onChange={(e) => setEditedRequest({...editedRequest, specialRequirements: e.target.value})}
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <div className="text-gray-900 mt-1">{request.specialRequirements}</div>
                )}
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <Button onClick={handleSaveEdit}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions & Status */}
        <div className="space-y-6">
          {/* Request Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Request Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Created</label>
                <div className="text-sm text-gray-900">{request.createdAt}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Requested For</label>
                <div className="text-sm text-gray-900">{request.requestedFor}</div>
              </div>
              {request.canEdit && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Edit Deadline</label>
                  <div className="text-sm text-gray-900">{request.editDeadline}</div>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-600">Current Status</label>
                <Badge className={`${getStatusColor(request.status)} mt-1`}>
                  {request.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          {request.status === 'Pending' && (
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleApprove}
                >
                  Approve Request
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleReject}
                >
                  Reject Request
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Assignment (if approved) */}
          {request.status === 'Approved' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="w-5 h-5 mr-2" />
                  Vehicle Assignment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Vehicle</label>
                    <div className="text-sm">DL-01-VIP-001 (Honda City)</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Driver</label>
                    <div className="text-sm">Suresh Kumar</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Driver Contact</label>
                    <div className="text-sm">+91 9876543200</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialRideDetail;
