import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Employee {
  id: number;
  name: string;
  empId: string;
  pickup: string;
}

interface Route {
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

interface EditRouteDialogProps {
  route: Route | null;
  open: boolean;
  onClose: () => void;
  onSave: (route: Route) => void;
}

const EditRouteDialog: React.FC<EditRouteDialogProps> = ({ route, open, onClose, onSave }) => {
  const [editedRoute, setEditedRoute] = useState<Route | null>(route);
  const [newPickupPoint, setNewPickupPoint] = useState('');

  React.useEffect(() => {
    setEditedRoute(route);
  }, [route]);

  if (!editedRoute) return null;

  const handleSave = () => {
    onSave(editedRoute);
    toast({ title: "Route updated successfully" });
    onClose();
  };

  const addPickupPoint = () => {
    if (newPickupPoint.trim()) {
      setEditedRoute({
        ...editedRoute,
        pickupPoints: [...editedRoute.pickupPoints, newPickupPoint.trim()]
      });
      setNewPickupPoint('');
    }
  };

  const removePickupPoint = (index: number) => {
    setEditedRoute({
      ...editedRoute,
      pickupPoints: editedRoute.pickupPoints.filter((_, i) => i !== index)
    });
  };

  const removeEmployee = (employeeId: number) => {
    setEditedRoute({
      ...editedRoute,
      employees: editedRoute.employees.filter(emp => emp.id !== employeeId),
      assignedEmployees: editedRoute.assignedEmployees - 1
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Route - {editedRoute.routeName}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Route Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="routeName">Route Name</Label>
              <Input
                id="routeName"
                value={editedRoute.routeName}
                onChange={(e) => setEditedRoute({...editedRoute, routeName: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="area">Area</Label>
              <Select
                value={editedRoute.area}
                onValueChange={(value) => setEditedRoute({...editedRoute, area: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Noida-Gurgaon">Noida-Gurgaon</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="departureTime">Departure Time</Label>
              <Input
                id="departureTime"
                value={editedRoute.departureTime}
                onChange={(e) => setEditedRoute({...editedRoute, departureTime: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="estimatedDuration">Estimated Duration</Label>
              <Input
                id="estimatedDuration"
                value={editedRoute.estimatedDuration}
                onChange={(e) => setEditedRoute({...editedRoute, estimatedDuration: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="totalDistance">Total Distance</Label>
              <Input
                id="totalDistance"
                value={editedRoute.totalDistance}
                onChange={(e) => setEditedRoute({...editedRoute, totalDistance: e.target.value})}
              />
            </div>
          </div>

          {/* Vehicle & Driver Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="vehicleNumber">Vehicle Number</Label>
              <Input
                id="vehicleNumber"
                value={editedRoute.vehicleNumber}
                onChange={(e) => setEditedRoute({...editedRoute, vehicleNumber: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="cabName">Cab Name</Label>
              <Input
                id="cabName"
                value={editedRoute.cabName}
                onChange={(e) => setEditedRoute({...editedRoute, cabName: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="vendorCode">Vendor Code</Label>
              <Input
                id="vendorCode"
                value={editedRoute.vendorCode}
                onChange={(e) => setEditedRoute({...editedRoute, vendorCode: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="driverName">Driver Name</Label>
              <Input
                id="driverName"
                value={editedRoute.driverName}
                onChange={(e) => setEditedRoute({...editedRoute, driverName: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="driverPhone">Driver Phone</Label>
              <Input
                id="driverPhone"
                value={editedRoute.driverPhone}
                onChange={(e) => setEditedRoute({...editedRoute, driverPhone: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="vehicleCapacity">Vehicle Capacity</Label>
              <Input
                id="vehicleCapacity"
                type="number"
                value={editedRoute.vehicleCapacity}
                onChange={(e) => setEditedRoute({...editedRoute, vehicleCapacity: parseInt(e.target.value)})}
              />
            </div>
          </div>

          {/* Login Points */}
          <div className="space-y-4">
            <div>
              <Label>Login Points</Label>
              <div className="space-y-2">
                {editedRoute.pickupPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex-1 justify-between">
                      {point}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePickupPoint(index)}
                        className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new login point"
                    value={newPickupPoint}
                    onChange={(e) => setNewPickupPoint(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addPickupPoint()}
                  />
                  <Button onClick={addPickupPoint} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="dropPoint">Logout Point</Label>
              <Input
                id="dropPoint"
                value={editedRoute.dropPoint}
                onChange={(e) => setEditedRoute({...editedRoute, dropPoint: e.target.value})}
              />
            </div>
          </div>

          {/* Assigned Employees */}
          <div className="space-y-4">
            <Label>Assigned Employees ({editedRoute.employees.length})</Label>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {editedRoute.employees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div className="text-sm font-medium">{employee.name}</div>
                    <div className="text-xs text-gray-600">{employee.empId} • {employee.pickup}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEmployee(employee.id)}
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRouteDialog;