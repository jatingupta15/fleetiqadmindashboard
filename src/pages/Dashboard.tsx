
import React, { useState } from 'react';
import SmartPromptInterface from '@/components/SmartPromptInterface';
import RouteQueryProcessor from '@/components/RouteQueryProcessor';
import DashboardStats from '@/components/DashboardStats';

const Dashboard = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock route data for demonstration
  const mockRoutes = [
    {
      id: 1,
      routeName: 'Noida Sector 62 - Gurgaon Express',
      from: 'Noida Sector 62',
      to: 'DLF Cyber City, Gurgaon',
      departureTime: '08:30 AM',
      duration: '45 mins',
      distance: '28 km',
      vehicleType: 'SUV',
      vehicleNumber: 'DL-01-AB-1234',
      driverName: 'Rajesh Kumar',
      availableSeats: 1,
      totalSeats: 4,
      status: 'active' as const,
      confidence: 95
    },
    {
      id: 2,
      routeName: 'Whitefield - Electronic City Route',
      from: 'Whitefield IT Park',
      to: 'Electronic City Phase 1',
      departureTime: '09:00 AM',
      duration: '55 mins',
      distance: '32 km',
      vehicleType: 'Compact SUV',
      vehicleNumber: 'KA-05-CD-5678',
      driverName: 'Suresh Reddy',
      availableSeats: 0,
      totalSeats: 4,
      status: 'active' as const,
      confidence: 88
    },
    {
      id: 3,
      routeName: 'Andheri - BKC Business Route',
      from: 'Andheri Station',
      to: 'Bandra Kurla Complex',
      departureTime: '08:45 AM',
      duration: '40 mins',
      distance: '18 km',
      vehicleType: 'Sedan',
      vehicleNumber: 'MH-12-EF-9012',
      driverName: 'Ramesh Patil',
      availableSeats: 1,
      totalSeats: 4,
      status: 'scheduled' as const,
      confidence: 92
    }
  ];

  const processQuery = async (query: string) => {
    setCurrentQuery(query);
    setIsLoading(true);
    
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple query processing logic (in real app, this would be AI-powered)
    const lowerQuery = query.toLowerCase();
    let filteredResults = [...mockRoutes];
    
    // Filter by locations
    if (lowerQuery.includes('noida') || lowerQuery.includes('gurgaon')) {
      filteredResults = filteredResults.filter(route => 
        route.from.toLowerCase().includes('noida') || 
        route.to.toLowerCase().includes('gurgaon')
      );
    } else if (lowerQuery.includes('whitefield') || lowerQuery.includes('electronic city')) {
      filteredResults = filteredResults.filter(route => 
        route.from.toLowerCase().includes('whitefield') || 
        route.to.toLowerCase().includes('electronic city')
      );
    } else if (lowerQuery.includes('andheri') || lowerQuery.includes('bkc') || lowerQuery.includes('bandra')) {
      filteredResults = filteredResults.filter(route => 
        route.from.toLowerCase().includes('andheri') || 
        route.to.toLowerCase().includes('bkc') || 
        route.to.toLowerCase().includes('bandra')
      );
    }
    
    // Filter by availability
    if (lowerQuery.includes('available seats') || lowerQuery.includes('seats available')) {
      filteredResults = filteredResults.filter(route => route.availableSeats > 0);
    }
    
    // Filter by status
    if (lowerQuery.includes('active') || lowerQuery.includes('right now')) {
      filteredResults = filteredResults.filter(route => route.status === 'active');
    }
    
    setQueryResults(filteredResults);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Intelligent Transport Dashboard
        </h1>
        <p className="text-muted-foreground">
          Ask me anything about routes, get real-time insights, and manage your transport needs
        </p>
      </div>

      {/* Smart Prompt Interface */}
      <SmartPromptInterface onQuery={processQuery} isLoading={isLoading} />

      {/* Query Results */}
      <RouteQueryProcessor 
        query={currentQuery} 
        results={queryResults} 
        isLoading={isLoading} 
      />

      {/* Dashboard Stats */}
      <DashboardStats />
    </div>
  );
};

export default Dashboard;
