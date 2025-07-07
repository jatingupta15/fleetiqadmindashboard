
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import GoogleLocationPicker from '@/components/GoogleLocationPicker';
import { User, MapPin, Calendar, Send, Users } from 'lucide-react';

interface EmployeeFormData {
  employeeName: string;
  employeeId: string;
  department: string;
  loginLocation: string;
  logoutLocation: string;
  rideDate: string;
  rideTime: string;
  tripType: string;
  reason: string;
  notes: string;
}

interface EmployeeRequestFormProps {
  formData: EmployeeFormData;
  onInputChange: (field: string, value: string) => void;
  onLocationChange: (field: string, value: string, placeDetails?: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EmployeeRequestForm: React.FC<EmployeeRequestFormProps> = ({
  formData,
  onInputChange,
  onLocationChange,
  onSubmit
}) => {
  return (
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
        <form onSubmit={onSubmit} className="space-y-6">
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
                  value={formData.employeeName}
                  onChange={(e) => onInputChange('employeeName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID *</Label>
                <Input
                  id="employeeId"
                  placeholder="EMP001"
                  value={formData.employeeId}
                  onChange={(e) => onInputChange('employeeId', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  placeholder="IT, HR, Finance, etc."
                  value={formData.department}
                  onChange={(e) => onInputChange('department', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Trip Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Trip Type *</h3>
            <RadioGroup
              value={formData.tripType}
              onValueChange={(value) => onInputChange('tripType', value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="login-only" id="login-only" />
                <Label htmlFor="login-only">Login Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="logout-only" id="logout-only" />
                <Label htmlFor="logout-only">Logout Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both">Both Login & Logout</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Location Details
            </h3>
            <div className="space-y-4">
              {(formData.tripType === 'login-only' || formData.tripType === 'both') && (
                <GoogleLocationPicker
                  label="Login Location"
                  placeholder="Search for login location..."
                  value={formData.loginLocation}
                  onChange={(value, placeDetails) => onLocationChange('loginLocation', value, placeDetails)}
                  required
                />
              )}
              {(formData.tripType === 'logout-only' || formData.tripType === 'both') && (
                <GoogleLocationPicker
                  label="Logout Location"
                  placeholder="Search for logout location..."
                  value={formData.logoutLocation}
                  onChange={(value, placeDetails) => onLocationChange('logoutLocation', value, placeDetails)}
                  required
                />
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
                <Label htmlFor="empRideDate">Date *</Label>
                <Input
                  id="empRideDate"
                  type="date"
                  value={formData.rideDate}
                  onChange={(e) => onInputChange('rideDate', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="empRideTime">Time *</Label>
                <Input
                  id="empRideTime"
                  type="time"
                  value={formData.rideTime}
                  onChange={(e) => onInputChange('rideTime', e.target.value)}
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
              value={formData.reason}
              onChange={(e) => onInputChange('reason', e.target.value)}
              required
            />
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="empNotes">Additional Notes</Label>
            <Textarea
              id="empNotes"
              placeholder="Any special instructions or requirements..."
              value={formData.notes}
              onChange={(e) => onInputChange('notes', e.target.value)}
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
  );
};

export default EmployeeRequestForm;
