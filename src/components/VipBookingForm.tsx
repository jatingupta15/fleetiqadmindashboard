
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import GoogleLocationPicker from '@/components/GoogleLocationPicker';
import { User, MapPin, Calendar, Send, Car } from 'lucide-react';

interface VipFormData {
  riderName: string;
  riderPhone: string;
  loginLocation: string;
  logoutLocation: string;
  rideDate: string;
  rideTime: string;
  duration: string;
  vehicleType: string;
  notes: string;
}

interface VipBookingFormProps {
  formData: VipFormData;
  onInputChange: (field: string, value: string) => void;
  onLocationChange: (field: string, value: string, placeDetails?: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const VipBookingForm: React.FC<VipBookingFormProps> = ({
  formData,
  onInputChange,
  onLocationChange,
  onSubmit
}) => {
  const vehicleTypes = [
    { value: 'Economy', label: 'Economy', description: 'Standard sedan' },
    { value: 'Premium', label: 'Premium', description: 'Luxury sedan' },
    { value: 'Business', label: 'Business', description: 'Executive SUV' }
  ];

  return (
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
        <form onSubmit={onSubmit} className="space-y-6">
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
                  value={formData.riderName}
                  onChange={(e) => onInputChange('riderName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="riderPhone">Contact Number *</Label>
                <Input
                  id="riderPhone"
                  placeholder="+91 9876543210"
                  value={formData.riderPhone}
                  onChange={(e) => onInputChange('riderPhone', e.target.value)}
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
                label="Login Location"
                placeholder="Search for login location..."
                value={formData.loginLocation}
                onChange={(value, placeDetails) => onLocationChange('loginLocation', value, placeDetails)}
                required
              />
              <GoogleLocationPicker
                label="Logout Location"
                placeholder="Search for logout location..."
                value={formData.logoutLocation}
                onChange={(value, placeDetails) => onLocationChange('logoutLocation', value, placeDetails)}
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
                  value={formData.rideDate}
                  onChange={(e) => onInputChange('rideDate', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rideTime">Time *</Label>
                <Input
                  id="rideTime"
                  type="time"
                  value={formData.rideTime}
                  onChange={(e) => onInputChange('rideTime', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <select
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => onInputChange('duration', e.target.value)}
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
                    formData.vehicleType === type.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => onInputChange('vehicleType', type.value)}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="vehicleType"
                      value={type.value}
                      checked={formData.vehicleType === type.value}
                      onChange={() => onInputChange('vehicleType', type.value)}
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

export default VipBookingForm;
