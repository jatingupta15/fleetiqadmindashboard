
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, CheckCircle, XCircle, Clock, MessageSquare } from 'lucide-react';

interface BookingRequest {
  id: number;
  employeeName: string;
  employeeId: string;
  department: string;
  loginLocation: string;
  logoutLocation: string;
  rideDate: string;
  rideTime: string;
  reason: string;
  status: string;
  requestDate: string;
  notes?: string;
}

interface RequestStatusCardProps {
  request: BookingRequest;
}

const RequestStatusCard: React.FC<RequestStatusCardProps> = ({ request }) => {
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
    <div className="p-3 border rounded-lg">
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
          <span>{request.loginLocation} → {request.logoutLocation}</span>
        </div>
      </div>
      {request.notes && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
          <MessageSquare className="w-3 h-3 inline mr-1" />
          {request.notes}
        </div>
      )}
    </div>
  );
};

export default RequestStatusCard;
