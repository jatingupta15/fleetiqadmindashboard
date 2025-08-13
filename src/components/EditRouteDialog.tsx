import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { X, Plus, Users, Search, UserPlus } from 'lucide-react';
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

// Mock available employees data (in real app, this would come from an API)
const availableEmployees = [
  { id: 101, name: 'Ravi Kumar', empId: 'EMP101', department: 'Engineering' },
  { id: 102, name: 'Sneha Patel', empId: 'EMP102', department: 'Marketing' },
  { id: 103, name: 'Amit Singh', empId: 'EMP103', department: 'Sales' },
  { id: 104, name: 'Deepika Shah', empId: 'EMP104', department: 'HR' },
  { id: 105, name: 'Vikram Joshi', empId: 'EMP105', department: 'Finance' },
  { id: 106, name: 'Anjali Gupta', empId: 'EMP106', department: 'Operations' },
  { id: 107, name: 'Suresh Reddy', empId: 'EMP107', department: 'Engineering' },
  { id: 108, name: 'Preeti Sharma', empId: 'EMP108', department: 'Design' },
  { id: 109, name: 'Karan Mehta', empId: 'EMP109', department: 'Product' },
  { id: 110, name: 'Divya Agarwal', empId: 'EMP110', department: 'QA' }
];

const EditRouteDialog: React.FC<EditRouteDialogProps> = ({ route, open, onClose, onSave }) => {
  const [editedRoute, setEditedRoute] = useState<Route | null>(route);
  const [newPickupPoint, setNewPickupPoint] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState('');

  React.useEffect(() => {
    setEditedRoute(route);
    setSearchTerm('');
    setShowAddEmployee(false);
    setSelectedEmployeeId(null);
    setSelectedPickupPoint('');
  }, [route]);

  if (!editedRoute) return null;

  const availableSeats = editedRoute.vehicleCapacity - editedRoute.employees.length;
  const assignedEmployeeIds = editedRoute.employees.map(emp => emp.id);
  
  const filteredAvailableEmployees = availableEmployees.filter(emp => 
    !assignedEmployeeIds.includes(emp.id) &&
    (emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     emp.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     emp.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSave = () => {
    const updatedRoute = {
      ...editedRoute,
      assignedEmployees: editedRoute.employees.length
    };
    onSave(updatedRoute);
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
      employees: editedRoute.employees.filter(emp => emp.id !== employeeId)
    });
  };

  const addEmployee = () => {
    if (selectedEmployeeId && selectedPickupPoint) {
      const employee = availableEmployees.find(emp => emp.id === selectedEmployeeId);
      if (employee && availableSeats > 0) {
        const newEmployee: Employee = {
          id: employee.id,
          name: employee.name,
          empId: employee.empId,
          pickup: selectedPickupPoint
        };
        
        setEditedRoute({
          ...editedRoute,
          employees: [...editedRoute.employees, newEmployee]
        });
        
        setSelectedEmployeeId(null);
        setSelectedPickupPoint('');
        setShowAddEmployee(false);
        setSearchTerm('');
        
        toast({ title: `${employee.name} added to route successfully` });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Edit Route - {editedRoute.routeName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Basic Route & Vehicle Info */}
          <div className="space-y-6">
            {/* Basic Route Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Route Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="routeName">Route Name</Label>
                  <Input
                    id="routeName"
                    value={editedRoute.routeName}
                    onChange={(e) => setEditedRoute({...editedRoute, routeName: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="estimatedDuration">Duration</Label>
                    <Input
                      id="estimatedDuration"
                      value={editedRoute.estimatedDuration}
                      onChange={(e) => setEditedRoute({...editedRoute, estimatedDuration: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="totalDistance">Distance</Label>
                    <Input
                      id="totalDistance"
                      value={editedRoute.totalDistance}
                      onChange={(e) => setEditedRoute({...editedRoute, totalDistance: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dropPoint">Drop Point</Label>
                  <Input
                    id="dropPoint"
                    value={editedRoute.dropPoint}
                    onChange={(e) => setEditedRoute({...editedRoute, dropPoint: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Vehicle & Driver Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vehicle & Driver Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                    <Input
                      id="vehicleNumber"
                      value={editedRoute.vehicleNumber}
                      onChange={(e) => setEditedRoute({...editedRoute, vehicleNumber: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cabName">Cab Model</Label>
                    <Input
                      id="cabName"
                      value={editedRoute.cabName}
                      onChange={(e) => setEditedRoute({...editedRoute, cabName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vendorCode">Vendor Code</Label>
                    <Input
                      id="vendorCode"
                      value={editedRoute.vendorCode}
                      onChange={(e) => setEditedRoute({...editedRoute, vendorCode: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="vehicleCapacity">Capacity</Label>
                    <Input
                      id="vehicleCapacity"
                      type="number"
                      min="1"
                      max="10"
                      value={editedRoute.vehicleCapacity}
                      onChange={(e) => setEditedRoute({...editedRoute, vehicleCapacity: parseInt(e.target.value) || 4})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                </div>
              </CardContent>
            </Card>

            {/* Pickup Points */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pickup Points</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                      placeholder="Add new pickup point"
                      value={newPickupPoint}
                      onChange={(e) => setNewPickupPoint(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addPickupPoint()}
                    />
                    <Button onClick={addPickupPoint} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Employee Management */}
          <div className="space-y-6">
            {/* Seat Capacity Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Seat Management</span>
                  <Badge variant={availableSeats > 0 ? "secondary" : "destructive"}>
                    {editedRoute.employees.length}/{editedRoute.vehicleCapacity} Occupied
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-2">Available Seats</div>
                    <div className="text-2xl font-bold text-primary">{availableSeats}</div>
                  </div>
                  {availableSeats > 0 && (
                    <Button 
                      onClick={() => setShowAddEmployee(!showAddEmployee)}
                      className="gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      Add Employee
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Add Employee Section */}
            {showAddEmployee && availableSeats > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Employee to Route</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search employees by name, ID, or department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="max-h-40 overflow-y-auto border border-border rounded-lg">
                    {filteredAvailableEmployees.length > 0 ? (
                      filteredAvailableEmployees.slice(0, 5).map((employee) => (
                        <div 
                          key={employee.id} 
                          className={`p-3 border-b border-border last:border-b-0 cursor-pointer hover:bg-muted/50 ${
                            selectedEmployeeId === employee.id ? 'bg-primary/10' : ''
                          }`}
                          onClick={() => setSelectedEmployeeId(employee.id)}
                        >
                          <div className="text-sm font-medium">{employee.name}</div>
                          <div className="text-xs text-muted-foreground">{employee.empId} • {employee.department}</div>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-sm text-muted-foreground text-center">
                        No employees found
                      </div>
                    )}
                  </div>

                  {selectedEmployeeId && (
                    <div className="space-y-3">
                      <div>
                        <Label>Select Pickup Point</Label>
                        <Select value={selectedPickupPoint} onValueChange={setSelectedPickupPoint}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose pickup point" />
                          </SelectTrigger>
                          <SelectContent>
                            {editedRoute.pickupPoints.map((point, index) => (
                              <SelectItem key={index} value={point}>{point}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={addEmployee} 
                          disabled={!selectedPickupPoint}
                          className="flex-1"
                        >
                          Add to Route
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setSelectedEmployeeId(null);
                            setSelectedPickupPoint('');
                            setShowAddEmployee(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Current Employees */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Current Passengers ({editedRoute.employees.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editedRoute.employees.length > 0 ? (
                  <div className="border border-border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="text-xs">Name</TableHead>
                          <TableHead className="text-xs">ID</TableHead>
                          <TableHead className="text-xs">Pickup</TableHead>
                          <TableHead className="text-xs w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {editedRoute.employees.map((employee) => (
                          <TableRow key={employee.id}>
                            <TableCell className="text-sm font-medium">{employee.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{employee.empId}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{employee.pickup}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeEmployee(employee.id)}
                                className="h-6 w-6 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No employees assigned to this route</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t">
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