
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Route, Clock, Car } from 'lucide-react';

interface RouteMapViewProps {
  route: {
    id: number;
    routeName: string;
    vehicleNumber: string;
    cabName: string;
    vendorCode: string;
    driverName: string;
    pickupPoints: string[];
    dropPoint: string;
    departureTime: string;
    estimatedDuration: string;
    totalDistance: string;
    employees: Array<{
      id: number;
      name: string;
      empId: string;
      pickup: string;
    }>;
  };
  onClose: () => void;
}

const RouteMapView: React.FC<RouteMapViewProps> = ({ route, onClose }) => {
  // Group employees by pickup point to show pickup sequence
  const pickupSequence = route.pickupPoints.map((point, index) => {
    const employeesAtPoint = route.employees.filter(emp => emp.pickup === point);
    return {
      point,
      sequence: index + 1,
      employees: employeesAtPoint,
      count: employeesAtPoint.length
    };
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{route.routeName}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Car className="w-4 h-4" />
                  <span>{route.cabName}</span>
                </div>
                <Badge variant="outline">{route.vendorCode}</Badge>
                <span>{route.vehicleNumber}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="w-5 h-5" />
                  Route Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Interactive Map View</p>
                    <p className="text-xs mt-1">Showing route from pickup points to destination</p>
                  </div>
                </div>
                
                {/* Route Summary */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Distance:</span>
                    <span className="font-medium">{route.totalDistance}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Estimated Duration:</span>
                    <span className="font-medium">{route.estimatedDuration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Departure Time:</span>
                    <span className="font-medium">{route.departureTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Sequence */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Pickup Sequence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Start Point */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      S
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-green-700">Route Start</div>
                      <div className="text-sm text-gray-600">Driver: {route.driverName}</div>
                      <div className="text-xs text-gray-500">Cab: {route.cabName} ({route.vendorCode})</div>
                    </div>
                  </div>

                  {/* Pickup Points */}
                  {pickupSequence.map((pickup, index) => (
                    <div key={pickup.point} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {pickup.sequence}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-blue-700">{pickup.point}</div>
                        <div className="text-sm text-gray-600 mb-2">
                          Pickup {pickup.count} employee{pickup.count > 1 ? 's' : ''}
                        </div>
                        <div className="space-y-1">
                          {pickup.employees.map((employee) => (
                            <div key={employee.id} className="text-xs bg-blue-50 px-2 py-1 rounded">
                              {employee.name} ({employee.empId})
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Drop Point */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      D
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-red-700">Final Destination</div>
                      <div className="text-sm text-gray-600">{route.dropPoint}</div>
                      <div className="text-xs text-gray-500">
                        Drop all {route.employees.length} employees
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Route Details */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Route Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Vehicle Information</h4>
                  <div className="text-sm space-y-1">
                    <div>Cab Name: <span className="font-medium">{route.cabName}</span></div>
                    <div>Vendor Code: <span className="font-medium">{route.vendorCode}</span></div>
                    <div>Vehicle Number: <span className="font-medium">{route.vehicleNumber}</span></div>
                    <div>Driver: <span className="font-medium">{route.driverName}</span></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Pickup Points ({route.pickupPoints.length})</h4>
                  <div className="text-sm space-y-1">
                    {route.pickupPoints.map((point, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">
                          {index + 1}
                        </div>
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Assigned Employees ({route.employees.length})</h4>
                  <div className="text-sm max-h-32 overflow-y-auto space-y-1">
                    {route.employees.map((employee) => (
                      <div key={employee.id} className="flex justify-between">
                        <span>{employee.name}</span>
                        <span className="text-gray-500">{employee.empId}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RouteMapView;
