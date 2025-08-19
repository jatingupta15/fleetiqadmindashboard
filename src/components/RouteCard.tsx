import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Route, 
  MapPin, 
  Clock, 
  User,
  Car,
  Users,
  Eye,
  Edit,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Employee {
  id: number;
  name: string;
  empId: string;
  pickup: string;
}

interface RouteData {
  id: number;
  routeName: string;
  vehicleNumber: string;
  cabName: string;
  vendorCode: string;
  driverName: string;
  driverPhone: string;
  vehicleCapacity: number;
  assignedEmployees: number;
  pickupPoints: string[];
  dropPoint: string;
  departureTime: string;
  estimatedDuration: string;
  totalDistance: string;
  area: string;
  employees: Employee[];
}

interface RouteCardProps {
  route: RouteData;
  onViewRoute: (route: RouteData) => void;
  onEditRoute: (route: RouteData) => void;
  collapsed?: boolean;
}

const RouteCard: React.FC<RouteCardProps> = ({ route, onViewRoute, onEditRoute, collapsed = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const pickupLocation = route.pickupPoints[0] || 'Multiple Locations';
  const dropLocation = route.dropPoint;

  // Sync with parent collapse state
  useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);

  return (
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-background">
      {/* Route Header */}
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Route className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Route #{route.id}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {pickupLocation} → {dropLocation}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="gap-2"
            >
              {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewRoute(route)}
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              Map View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditRoute(route)}
              className="gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="p-6 animate-accordion-down">
          {/* Route Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Route ID</span>
              <p className="text-sm font-semibold text-foreground">RT-{String(route.id).padStart(3, '0')}</p>
            </div>
            
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</span>
              <p className="text-sm font-semibold text-foreground">
                {pickupLocation.length > 15 ? pickupLocation.substring(0, 15) + '...' : pickupLocation} → {dropLocation.length > 15 ? dropLocation.substring(0, 15) + '...' : dropLocation}
              </p>
            </div>
            
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Vendor ID</span>
              <p className="text-sm font-semibold text-foreground">{route.vendorCode}</p>
            </div>
            
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Passengers Travelling</span>
              <p className="text-sm font-semibold text-foreground">{route.assignedEmployees}/{route.vehicleCapacity}</p>
            </div>
          </div>

          {/* Vehicle & Driver Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Car className="w-4 h-4 text-primary" />
                <span className="text-sm">Vehicle Details</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Cab: <span className="text-foreground font-medium">{route.cabName}</span></p>
                <p className="text-xs text-muted-foreground">Number: <span className="text-foreground font-medium">{route.vehicleNumber}</span></p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm">Driver Details</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Name: <span className="text-foreground font-medium">{route.driverName}</span></p>
                <p className="text-xs text-muted-foreground">Phone: <span className="text-foreground font-medium">{route.driverPhone}</span></p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm">Schedule</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Departure: <span className="text-foreground font-medium">{route.departureTime}</span></p>
                <p className="text-xs text-muted-foreground">Duration: <span className="text-foreground font-medium">{route.estimatedDuration}</span></p>
              </div>
            </div>
          </div>

          {/* Employee Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Users className="w-5 h-5 text-primary" />
                Employee Details ({route.assignedEmployees} passengers)
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                {route.assignedEmployees}/{route.vehicleCapacity} seats
              </Badge>
            </div>
            
            <div className="border border-border/50 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">S.No</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employee Name</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employee ID</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pickup Location</TableHead>
                    <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {route.employees.map((employee, index) => (
                    <TableRow key={employee.id} className="border-border/50">
                      <TableCell className="text-sm font-medium text-foreground">{index + 1}</TableCell>
                      <TableCell className="text-sm font-medium text-foreground">{employee.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{employee.empId}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{employee.pickup}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-200">
                          Confirmed
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default RouteCard;