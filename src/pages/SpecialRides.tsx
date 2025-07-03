
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import GoogleLocationPicker from '@/components/GoogleLocationPicker';
import { 
  Plus, 
  User, 
  MapPin, 
  Calendar, 
  Clock,
  Car,
  Send
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SpecialRides = () => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Special Ride Request Submitted",
      description: "Your request has been sent to the Super Admin for approval",
    });
    // Reset form
    setFormData({
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLocationChange = (field: string, value: string, placeDetails?: google.maps.places.PlaceResult) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    console.log('Location selected:', { field, value, placeDetails });
  };

  const vehicleTypes = [
    { value: 'Economy', label: 'Economy', description: 'Standard sedan' },
    { value: 'Premium', label: 'Premium', description: 'Luxury sedan' },
    { value: 'Business', label: 'Business', description: 'Executive SUV' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Special Ride Booking</h1>
          <p className="text-gray-600">Book rides for guests, directors, and VIP requirements</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="w-5 h-5 mr-2" />
                New Special Ride Request
              </CardTitle>
              <CardDescription>
                Submit a request for special transportation needs. All requests require Super Admin approval.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                        onChange={(e) => handleInputChange('riderName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="riderPhone">Contact Number *</Label>
                      <Input
                        id="riderPhone"
                        placeholder="+91 9876543210"
                        value={formData.riderPhone}
                        onChange={(e) => handleInputChange('riderPhone', e.target.value)}
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
                      value={formData.pickupLocation}
                      onChange={(value, placeDetails) => handleLocationChange('pickupLocation', value, placeDetails)}
                      required
                    />
                    <GoogleLocationPicker
                      label="Drop Location"
                      placeholder="Search for drop location..."
                      value={formData.dropLocation}
                      onChange={(value, placeDetails) => handleLocationChange('dropLocation', value, placeDetails)}
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
                        onChange={(e) => handleInputChange('rideDate', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rideTime">Time *</Label>
                      <Input
                        id="rideTime"
                        type="time"
                        value={formData.rideTime}
                        onChange={(e) => handleInputChange('rideTime', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (hours)</Label>
                      <select
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
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
                        onClick={() => handleInputChange('vehicleType', type.value)}
                      >
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="vehicleType"
                            value={type.value}
                            checked={formData.vehicleType === type.value}
                            onChange={() => handleInputChange('vehicleType', type.value)}
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
                    onChange={(e) => handleInputChange('notes', e.target.value)}
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
                  <li>• All requests require Super Admin approval</li>
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
              <CardTitle>Recent Requests</CardTitle>
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
    </div>
  );
};

export default SpecialRides;
