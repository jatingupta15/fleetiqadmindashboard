import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Phone,
  User,
  Car,
  MessageSquare,
  CheckCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SOSAlerts = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false);
  const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);
  const [resolutionReason, setResolutionReason] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');

  const activeAlerts = [
    {
      id: 1,
      employee: 'Sarah Chen',
      employeeId: 'EMP004',
      department: 'Finance',
      phone: '+91 9876543213',
      location: 'NH-8, Gurgaon (Near Udyog Vihar)',
      coordinates: '28.4595, 77.0266',
      timestamp: '2024-01-15 14:23:45',
      duration: '2 minutes ago',
      driver: 'Rajesh Kumar',
      driverPhone: '+91 9876543220',
      vehicle: 'DL 01 AB 1234',
      status: 'active',
      responses: [
        { time: '2 min ago', action: 'SOS triggered by employee', type: 'alert' },
        { time: '1 min ago', action: 'Admin notified', type: 'system' },
        { time: '30 sec ago', action: 'Driver contacted', type: 'action' }
      ]
    }
  ];

  const pastAlerts = [
    {
      id: 2,
      employee: 'John Doe',
      employeeId: 'EMP001',
      department: 'IT',
      phone: '+91 9876543210',
      location: 'MG Road, Bangalore',
      timestamp: '2024-01-14 16:45:22',
      duration: '1 day ago',
      driver: 'Suresh Reddy',
      driverPhone: '+91 9876543221',
      vehicle: 'KA 05 CD 5678',
      status: 'resolved',
      resolutionTime: '5 minutes',
      resolutionNotes: 'False alarm - employee accidentally triggered SOS. All safe.'
    },
    {
      id: 3,
      employee: 'Lisa Wang',
      employeeId: 'EMP006',
      department: 'Finance',
      phone: '+91 9876543214',
      location: 'Electronic City, Bangalore',
      timestamp: '2024-01-12 18:30:15',
      duration: '3 days ago',
      driver: 'Ravi Kumar',
      driverPhone: '+91 9876543222',
      vehicle: 'KA 01 EF 9012',
      status: 'resolved',
      resolutionTime: '12 minutes',
      resolutionNotes: 'Vehicle breakdown. Employee safely transferred to backup vehicle. Breakdown service contacted.'
    }
  ];

  const resolutionReasons = [
    'False alarm - accidental trigger',
    'Vehicle breakdown',
    'Medical emergency',
    'Security concern',
    'Traffic incident',
    'Route change required',
    'Driver issue',
    'Other'
  ];

  const handleCall = (phone: string, name: string) => {
    toast({
      title: `Calling ${name}`,
      description: `Initiating call to ${phone}`,
    });
  };

  const handleResolveClick = (alertId: number) => {
    setSelectedAlertId(alertId);
    setResolveDialogOpen(true);
  };

  const handleResolveSubmit = () => {
    if (!resolutionReason) {
      toast({
        title: "Error",
        description: "Please select a resolution reason",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Alert Resolved",
      description: `SOS alert has been marked as resolved. Reason: ${resolutionReason}`,
    });

    // Reset form and close dialog
    setResolveDialogOpen(false);
    setSelectedAlertId(null);
    setResolutionReason('');
    setResolutionNotes('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 border-red-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
            SOS Alert Management
          </h1>
          <p className="text-gray-600">Monitor and respond to emergency alerts from employees</p>
        </div>
        <div className="flex items-center gap-2">
          {activeAlerts.length > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {activeAlerts.length} Active Alert{activeAlerts.length > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </div>

      {/* Active Alert Banner */}
      {activeAlerts.length > 0 && (
        <div className="bg-red-600 text-white p-4 rounded-lg border border-red-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
              <div>
                <h3 className="font-bold text-lg">ACTIVE SOS ALERT</h3>
                <p>Employee {activeAlerts[0].employee} has triggered an emergency alert</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                onClick={() => handleCall(activeAlerts[0].phone, activeAlerts[0].employee)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Employee
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleCall(activeAlerts[0].driverPhone, activeAlerts[0].driver)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Driver
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Active Alerts ({activeAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" />
            Alert History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {activeAlerts.length > 0 ? (
            <div className="space-y-6">
              {activeAlerts.map((alert) => (
                <Card key={alert.id} className="border-red-200 bg-red-50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-red-800">{alert.employee}</CardTitle>
                          <CardDescription className="text-red-600">
                            {alert.employeeId} • {alert.department}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-red-600 text-white animate-pulse">
                        ACTIVE - {alert.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Alert Details */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            Location Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start space-x-2">
                              <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                              <div>
                                <div className="font-medium">{alert.location}</div>
                                <div className="text-gray-600">Coordinates: {alert.coordinates}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span>Alert Time: {alert.timestamp}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Car className="w-4 h-4 mr-2" />
                            Vehicle & Driver
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>Driver: {alert.driver}</div>
                            <div>Vehicle: {alert.vehicle}</div>
                            <div>Driver Phone: {alert.driverPhone}</div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleCall(alert.phone, alert.employee)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call Employee
                          </Button>
                          <Button
                            onClick={() => handleCall(alert.driverPhone, alert.driver)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call Driver
                          </Button>
                        </div>
                      </div>

                      {/* Response Timeline */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 flex items-center">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Response Timeline
                        </h4>
                        <div className="space-y-3">
                          {alert.responses.map((response, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                response.type === 'alert' ? 'bg-red-500' :
                                response.type === 'system' ? 'bg-blue-500' : 'bg-green-500'
                              }`}></div>
                              <div className="flex-1">
                                <div className="text-sm font-medium">{response.action}</div>
                                <div className="text-xs text-gray-500">{response.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <Button
                          onClick={() => handleResolveClick(alert.id)}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Resolved
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h3>
                <p className="text-gray-600">All employees are safe. No emergency alerts at this time.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Past SOS Alerts</CardTitle>
              <CardDescription>Historical emergency alerts and their resolutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{alert.employee}</div>
                          <div className="text-sm text-gray-600">{alert.employeeId} • {alert.department}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(alert.status)} text-xs`}>
                          {alert.status.toUpperCase()}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">{alert.duration}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-700">Location:</div>
                        <div className="text-gray-600">{alert.location}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Resolution Time:</div>
                        <div className="text-gray-600">{alert.resolutionTime}</div>
                      </div>
                    </div>
                    
                    {alert.resolutionNotes && (
                      <div className="mt-3 p-3 bg-white rounded border">
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Resolution Notes:</span>{' '}
                          <span className="text-gray-600">{alert.resolutionNotes}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Resolution Dialog */}
      <Dialog open={resolveDialogOpen} onOpenChange={setResolveDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Resolve SOS Alert
            </DialogTitle>
            <DialogDescription>
              Please provide the reason for resolving this SOS alert to maintain proper records.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Resolution Reason *</Label>
              <Select value={resolutionReason} onValueChange={setResolutionReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason for SOS alert..." />
                </SelectTrigger>
                <SelectContent>
                  {resolutionReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional details about the resolution..."
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setResolveDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleResolveSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Resolve Alert
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SOSAlerts;
