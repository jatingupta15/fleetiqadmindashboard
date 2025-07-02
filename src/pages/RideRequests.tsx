
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  User,
  Filter,
  Search,
  Check,
  X,
  MessageSquare
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const RideRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const requests = [
    {
      id: 1,
      employee: 'Sarah Smith',
      employeeId: 'EMP002',
      department: 'HR',
      requestType: 'Route Change',
      currentPickup: 'Sector 62, Noida',
      currentDrop: 'DLF Cyber City, Gurgaon',
      requestedPickup: 'Sector 18, Noida',
      requestedDrop: 'DLF Cyber City, Gurgaon',
      reason: 'Relocated to new apartment',
      requestDate: '2024-01-15',
      effectiveDate: '2024-01-20',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 2,
      employee: 'John Doe',
      employeeId: 'EMP001',
      department: 'IT',
      requestType: 'Time Change',
      currentTime: '09:00 AM',
      requestedTime: '08:30 AM',
      reason: 'Early morning meetings with US clients',
      requestDate: '2024-01-14',
      effectiveDate: '2024-01-18',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 3,
      employee: 'Alex Johnson',
      employeeId: 'EMP005',
      department: 'Marketing',
      requestType: 'Route Change',
      currentPickup: 'Whitefield, Bangalore',
      currentDrop: 'Electronic City, Bangalore',
      requestedPickup: 'Koramangala, Bangalore',
      requestedDrop: 'Electronic City, Bangalore',
      reason: 'Temporary stay at friend\'s place',
      requestDate: '2024-01-13',
      effectiveDate: '2024-01-16',
      status: 'approved',
      priority: 'low',
      reviewNotes: 'Approved for 30 days. Please update permanent address if staying longer.'
    },
    {
      id: 4,
      employee: 'Lisa Wang',
      employeeId: 'EMP006',
      department: 'Finance',
      requestType: 'Additional Stop',
      currentRoute: 'Gurgaon → DLF Phase 1',
      requestedRoute: 'Gurgaon → Hospital → DLF Phase 1',
      reason: 'Medical treatment for elderly parent',
      requestDate: '2024-01-12',
      effectiveDate: '2024-01-15',
      status: 'declined',
      priority: 'medium',
      reviewNotes: 'Cannot accommodate additional stops. Please use alternative transportation.'
    }
  ];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (requestId: number) => {
    toast({
      title: "Request Approved",
      description: "Employee will be notified of the approval",
    });
    // Handle approval logic
  };

  const handleDecline = (requestId: number) => {
    if (!reviewNotes.trim()) {
      toast({
        title: "Review notes required",
        description: "Please provide a reason for declining the request",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Request Declined",
      description: "Employee will be notified with your notes",
    });
    setSelectedRequest(null);
    setReviewNotes('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ride Requests</h1>
          <p className="text-gray-600">Review and approve employee ride change requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            {filteredRequests.filter(r => r.status === 'pending').length} Pending
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
            </select>
          </div>
        </CardHeader>
      </Card>

      {/* Requests List */}
      <div className="grid gap-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{request.employee}</CardTitle>
                    <CardDescription>{request.employeeId} • {request.department}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(request.priority)}>
                    {request.priority} priority
                  </Badge>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Request Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{request.requestType}</h4>
                    
                    {request.requestType === 'Route Change' && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Current:</span>
                          <span>{request.currentPickup} → {request.currentDrop}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-indigo-600" />
                          <span className="text-gray-600">Requested:</span>
                          <span className="font-medium">{request.requestedPickup} → {request.requestedDrop}</span>
                        </div>
                      </div>
                    )}
                    
                    {request.requestType === 'Time Change' && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Current:</span>
                          <span>{request.currentTime}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-indigo-600" />
                          <span className="text-gray-600">Requested:</span>
                          <span className="font-medium">{request.requestedTime}</span>
                        </div>
                      </div>
                    )}
                    
                    {request.requestType === 'Additional Stop' && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">Current:</span>
                          <span>{request.currentRoute}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-indigo-600" />
                          <span className="text-gray-600">Requested:</span>
                          <span className="font-medium">{request.requestedRoute}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Reason</h4>
                    <p className="text-sm text-gray-600">{request.reason}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Requested: {request.requestDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Effective: {request.effectiveDate}</span>
                    </div>
                  </div>
                  
                  {request.reviewNotes && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1 flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Review Notes
                      </h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{request.reviewNotes}</p>
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                {request.status === 'pending' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Review Notes (Optional)
                      </label>
                      <Textarea
                        placeholder="Add notes for your decision..."
                        value={selectedRequest?.id === request.id ? reviewNotes : ''}
                        onChange={(e) => {
                          setSelectedRequest(request);
                          setReviewNotes(e.target.value);
                        }}
                        className="h-20"
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => handleApprove(request.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDecline(request.id)}
                        className="flex-1"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Decline
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RideRequests;
