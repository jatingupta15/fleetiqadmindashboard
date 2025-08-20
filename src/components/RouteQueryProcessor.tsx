import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Clock, 
  Users, 
  Car,
  Route,
  Eye,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react';
import VehicleTypeIcon from '@/components/VehicleTypeIcon';

interface RouteResult {
  id: number;
  routeName: string;
  from: string;
  to: string;
  departureTime: string;
  duration: string;
  distance: string;
  vehicleType: string;
  vehicleNumber: string;
  driverName: string;
  availableSeats: number;
  totalSeats: number;
  status: 'active' | 'completed' | 'scheduled';
  confidence: number;
}

interface RouteQueryProcessorProps {
  query: string;
  results: RouteResult[];
  isLoading: boolean;
}

const RouteQueryProcessor: React.FC<RouteQueryProcessorProps> = ({ query, results, isLoading }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Zap className="w-4 h-4 text-green-600" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-orange-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-200';
      case 'completed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'scheduled': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">Processing your request...</p>
              <p className="text-sm text-muted-foreground">Analyzing routes and finding the best matches</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!query) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Query Summary */}
      <Card className="border-0 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Route className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Query Analysis</h3>
              <p className="text-muted-foreground mb-3">"{query}"</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  {results.length} matches found
                </span>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Smart AI Match
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Route Results</h3>
          <div className="grid gap-4">
            {results.map((route) => (
              <Card key={route.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Vehicle Type */}
                    <VehicleTypeIcon vehicleType={route.vehicleType} />
                    
                    {/* Route Details */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">{route.routeName}</h4>
                          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{route.from} → {route.to}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(route.status)} variant="outline">
                            {getStatusIcon(route.status)}
                            {route.status}
                          </Badge>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Match Confidence</div>
                            <div className="text-sm font-semibold text-green-600">{route.confidence}%</div>
                          </div>
                        </div>
                      </div>

                      {/* Route Info Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            Departure
                          </div>
                          <div className="font-semibold text-foreground">{route.departureTime}</div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Route className="w-3 h-3" />
                            Duration
                          </div>
                          <div className="font-semibold text-foreground">{route.duration}</div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            Distance
                          </div>
                          <div className="font-semibold text-foreground">{route.distance}</div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            Available Seats
                          </div>
                          <div className="font-semibold text-green-600">
                            {route.availableSeats}/{route.totalSeats}
                          </div>
                        </div>
                      </div>

                      {/* Vehicle & Driver Info */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Car className="w-4 h-4" />
                            {route.vehicleNumber}
                          </span>
                          <span>Driver: {route.driverName}</span>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye className="w-4 h-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card className="border-0 border-dashed border-2 border-border/50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">No routes found</h3>
            <p className="text-muted-foreground mb-4">
              Try refining your search or use different locations and times.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>💡 Try: "Routes from Noida to Gurgaon" or "Show available seats"</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RouteQueryProcessor;