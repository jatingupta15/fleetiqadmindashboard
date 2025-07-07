
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Car,
  Route
} from 'lucide-react';

interface Employee {
  id: number;
  code: string;
  name: string;
  designation: string;
  department: string;
  shift: string;
  mobile: string;
  email: string;
  address: string;
  gender: string;
  status: string;
}

interface EmployeeSideDrawerProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

const EmployeeSideDrawer = ({ employee, isOpen, onClose }: EmployeeSideDrawerProps) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Employee Details</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <User className="w-4 h-4 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-600">{employee.code}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Department:</span>
                    <div className="font-medium">{employee.department}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Designation:</span>
                    <div className="font-medium">{employee.designation}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Shift:</span>
                    <Badge className={`text-xs ${
                      employee.shift === 'Day' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {employee.shift}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                      {employee.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Mobile</div>
                    <div className="text-sm text-gray-900">{employee.mobile}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-sm text-gray-900">{employee.email}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                  <div>
                    <div className="text-sm font-medium">Address</div>
                    <div className="text-sm text-gray-900">{employee.address}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Car className="w-4 h-4 mr-2" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">24</div>
                    <div className="text-xs text-gray-600">Rides This Month</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">95%</div>
                    <div className="text-xs text-gray-600">On-time Rate</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">2</div>
                    <div className="text-xs text-gray-600">Cancellations</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">Route A</div>
                    <div className="text-xs text-gray-600">Current Route</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button className="w-full" onClick={() => window.open(`/employee-profile/${employee.id}`, '_blank')}>
                <User className="w-4 h-4 mr-2" />
                View Full Profile
              </Button>
              <Button variant="outline" className="w-full">
                <Route className="w-4 h-4 mr-2" />
                View Route Details
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                View Ride History
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSideDrawer;
