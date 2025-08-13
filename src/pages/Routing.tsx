
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import RouteMapView from '@/components/RouteMapView';
import EditRouteDialog from '@/components/EditRouteDialog';
import RouteCard from '@/components/RouteCard';

const Routing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [areaFilter, setAreaFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('today');
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [editingRoute, setEditingRoute] = useState<any>(null);

  const [routes, setRoutes] = useState([
    {
      id: 1,
      routeName: 'Noida Sector 62 - Gurgaon Route A',
      vehicleNumber: 'DL-01-AB-1234',
      cabName: 'Innova Crysta',
      vendorCode: 'VND001',
      driverName: 'Rajesh Kumar',
      driverPhone: '+91 9876543210',
      vehicleCapacity: 12,
      assignedEmployees: 8,
      pickupPoints: ['Sector 62 Metro', 'Sector 18 Mall', 'Botanical Garden'],
      dropPoint: 'DLF Cyber City, Gurgaon',
      departureTime: '08:30 AM',
      estimatedDuration: '45 mins',
      totalDistance: '28 km',
      area: 'Noida-Gurgaon',
      employees: [
        { id: 1, name: 'Sarah Smith', empId: 'EMP002', pickup: 'Sector 62 Metro' },
        { id: 2, name: 'John Doe', empId: 'EMP001', pickup: 'Sector 18 Mall' },
        { id: 3, name: 'Mike Wilson', empId: 'EMP003', pickup: 'Sector 62 Metro' },
        { id: 4, name: 'Lisa Chen', empId: 'EMP004', pickup: 'Botanical Garden' },
        { id: 5, name: 'David Kumar', empId: 'EMP007', pickup: 'Sector 18 Mall' },
        { id: 6, name: 'Anna Patel', empId: 'EMP008', pickup: 'Sector 62 Metro' },
        { id: 7, name: 'Tom Brown', empId: 'EMP009', pickup: 'Botanical Garden' },
        { id: 8, name: 'Emma Davis', empId: 'EMP010', pickup: 'Sector 18 Mall' }
      ]
    },
    {
      id: 2,
      routeName: 'Whitefield - Electronic City Route B',
      vehicleNumber: 'KA-05-CD-5678',
      cabName: 'Toyota Hiace',
      vendorCode: 'VND002',
      driverName: 'Suresh Reddy',
      driverPhone: '+91 9876543211',
      vehicleCapacity: 15,
      assignedEmployees: 12,
      pickupPoints: ['Whitefield IT Park', 'Marathahalli Bridge', 'Silk Board'],
      dropPoint: 'Electronic City Phase 1',
      departureTime: '09:00 AM',
      estimatedDuration: '55 mins',
      totalDistance: '32 km',
      area: 'Bangalore',
      employees: [
        { id: 9, name: 'Alex Johnson', empId: 'EMP005', pickup: 'Whitefield IT Park' },
        { id: 10, name: 'Priya Sharma', empId: 'EMP011', pickup: 'Marathahalli Bridge' },
        { id: 11, name: 'Rohit Gupta', empId: 'EMP012', pickup: 'Silk Board' },
        { id: 12, name: 'Kavya Nair', empId: 'EMP013', pickup: 'Whitefield IT Park' }
      ]
    },
    {
      id: 3,
      routeName: 'Andheri - BKC Route C',
      vehicleNumber: 'MH-12-EF-9012',
      cabName: 'Maruti Ertiga',
      vendorCode: 'VND003',
      driverName: 'Ramesh Patil',
      driverPhone: '+91 9876543212',
      vehicleCapacity: 10,
      assignedEmployees: 7,
      pickupPoints: ['Andheri Station', 'MIDC', 'Seepz'],
      dropPoint: 'Bandra Kurla Complex',
      departureTime: '08:45 AM',
      estimatedDuration: '40 mins',
      totalDistance: '18 km',
      area: 'Mumbai',
      employees: [
        { id: 13, name: 'Neha Joshi', empId: 'EMP014', pickup: 'Andheri Station' },
        { id: 14, name: 'Arjun Mehta', empId: 'EMP015', pickup: 'MIDC' },
        { id: 15, name: 'Pooja Singh', empId: 'EMP016', pickup: 'Seepz' }
      ]
    }
  ]);

  const handleSaveRoute = (updatedRoute: any) => {
    setRoutes(routes.map(route => 
      route.id === updatedRoute.id ? updatedRoute : route
    ));
  };

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.cabName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.vendorCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = areaFilter === 'all' || route.area.toLowerCase().includes(areaFilter.toLowerCase());
    return matchesSearch && matchesArea;
  });

  const areas = ['all', 'Noida-Gurgaon', 'Bangalore', 'Mumbai'];
  const timeFilters = [
    { value: 'today', label: 'Today' },
    { value: 'this_week', label: 'This Week' },
    { value: 'this_month', label: 'This Month' },
    { value: 'custom', label: 'Custom' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Smart Routing</h1>
          <p className="text-gray-600">View optimized route assignments and vehicle details</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {routes.length} Active Routes
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search routes, vehicles, drivers, or cab names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {areas.map(area => (
                <option key={area} value={area}>
                  {area === 'all' ? 'All Areas' : area}
                </option>
              ))}
            </select>
            
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {timeFilters.map(filter => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>
      </Card>

      {/* Routes List */}
      <div className="grid gap-6">
        {filteredRoutes.map((route) => (
          <RouteCard 
            key={route.id} 
            route={route}
            onViewRoute={setSelectedRoute}
            onEditRoute={setEditingRoute}
          />
        ))}
      </div>

      {/* Route Map View Modal */}
      {selectedRoute && (
        <RouteMapView
          route={selectedRoute}
          onClose={() => setSelectedRoute(null)}
        />
      )}

      {/* Edit Route Modal */}
      {editingRoute && (
        <EditRouteDialog
          route={editingRoute}
          open={!!editingRoute}
          onClose={() => setEditingRoute(null)}
          onSave={handleSaveRoute}
        />
      )}
    </div>
  );
};

export default Routing;
