
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  User, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Edit, 
  Save, 
  X,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface BookingRequest {
  id: number;
  employeeName: string;
  employeeId: string;
  department: string;
  pickupLocation: string;
  dropLocation: string;
  rideDate: string;
  rideTime: string;
  tripType?: string;
  reason: string;
  status: string;
  requestDate: string;
  notes?: string;
}

interface RequestPreviewDialogProps {
  request: BookingRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (updatedRequest: BookingRequest) => void;
}

const RequestPreviewDialog: React.FC<RequestPreviewDialogProps> = ({
  request,
  isOpen,
  onClose,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRequest, setEditedRequest] = useState<BookingRequest | null>(null);

  useEffect(() => {
    if (request) {
      setEditedRequest({ ...request, tripType: request.tripType || 'both' });
    }
  }, [request]);

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

  const handleSave = () => {
    if (editedRequest && onSave) {
      onSave(editedRequest);
    }
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof BookingRequest, value: string) => {
    if (editedRequest) {
      setEditedRequest({ ...editedRequest, [field]: value });
    }
  };

  if (!request || !editedRequest) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Request Details - #{request.id}
              </DialogTitle>
              <DialogDescription>
                Submitted on {new Date(request.requestDate).toLocaleDateString()}
              </DialogDescription>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(request.status)}
              <Badge className={getStatusColor(request.status)}>
                {request.status}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Employee Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Employee Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Employee Name</Label>
                {isEditing ? (
                  <Input
                    value={editedRequest.employeeName}
                    onChange={(e) => handleInputChange('employeeName', e.target.value)}
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded">{request.employeeName}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Employee ID</Label>
                {isEditing ? (
                  <Input
                    value={editedRequest.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded">{request.employeeId}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                {isEditing ? (
                  <Input
                    value={editedRequest.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded">{request.department}</div>
                )}
              </div>
            </div>
          </div>

          {/* Trip Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Trip Type</h3>
            {isEditing ? (
              <RadioGroup
                value={editedRequest.tripType}
                onValueChange={(value) => handleInputChange('tripType', value)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup-only" id="edit-pickup-only" />
                  <Label htmlFor="edit-pickup-only">Pickup Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="drop-only" id="edit-drop-only" />
                  <Label htmlFor="edit-drop-only">Drop Off Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="edit-both" />
                  <Label htmlFor="edit-both">Both Pickup & Drop</Label>
                </div>
              </RadioGroup>
            ) : (
              <div className="p-2 bg-gray-50 rounded capitalize">
                {(request.tripType || 'both').replace('-', ' ')}
              </div>
            )}
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Location Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {((editedRequest.tripType === 'pickup-only' || editedRequest.tripType === 'both') || !editedRequest.tripType) && (
                <div className="space-y-2">
                  <Label>Pickup Location</Label>
                  {isEditing ? (
                    <Input
                      value={editedRequest.pickupLocation}
                      onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded">{request.pickupLocation}</div>
                  )}
                </div>
              )}
              {((editedRequest.tripType === 'drop-only' || editedRequest.tripType === 'both') || !editedRequest.tripType) && (
                <div className="space-y-2">
                  <Label>Drop Location</Label>
                  {isEditing ? (
                    <Input
                      value={editedRequest.dropLocation}
                      onChange={(e) => handleInputChange('dropLocation', e.target.value)}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded">{request.dropLocation}</div>
                  )}
                </div>
              )}
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
                <Label>Date</Label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={editedRequest.rideDate}
                    onChange={(e) => handleInputChange('rideDate', e.target.value)}
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded">{request.rideDate}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                {isEditing ? (
                  <Input
                    type="time"
                    value={editedRequest.rideTime}
                    onChange={(e) => handleInputChange('rideTime', e.target.value)}
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded">{request.rideTime}</div>
                )}
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label>Reason for Request</Label>
            {isEditing ? (
              <Input
                value={editedRequest.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
              />
            ) : (
              <div className="p-2 bg-gray-50 rounded">{request.reason}</div>
            )}
          </div>

          {/* Notes */}
          {(request.notes || isEditing) && (
            <div className="space-y-2">
              <Label className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Additional Notes
              </Label>
              {isEditing ? (
                <Textarea
                  value={editedRequest.notes || ''}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="h-20"
                />
              ) : (
                <div className="p-2 bg-gray-50 rounded">{request.notes}</div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedRequest({ ...request, tripType: request.tripType || 'both' });
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Request
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestPreviewDialog;
