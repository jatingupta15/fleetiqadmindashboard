
import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

interface EmployeeFiltersProps {
  searchTerm: string;
  selectedFilters: string[];
  departments: string[];
  onSearchChange: (value: string) => void;
  onFiltersChange: (filters: string[]) => void;
}

const EmployeeFilters = ({ 
  searchTerm, 
  selectedFilters, 
  departments, 
  onSearchChange, 
  onFiltersChange 
}: EmployeeFiltersProps) => {
  const handleFilterChange = (value: string) => {
    if (value === 'all') {
      onFiltersChange(['all']);
      return;
    }
    
    if (selectedFilters.includes('all')) {
      onFiltersChange([value]);
      return;
    }
    
    if (selectedFilters.includes(value)) {
      const newFilters = selectedFilters.filter(f => f !== value);
      onFiltersChange(newFilters.length === 0 ? ['all'] : newFilters);
    } else {
      onFiltersChange([...selectedFilters, value]);
    }
  };

  const removeFilter = (filterToRemove: string) => {
    const newFilters = selectedFilters.filter(f => f !== filterToRemove);
    onFiltersChange(newFilters.length === 0 ? ['all'] : newFilters);
  };

  const getFilterDisplayName = (filter: string) => {
    switch (filter) {
      case 'all': return 'All Employees';
      case 'day': return 'Day Shift';
      case 'night': return 'Night Shift';
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'both': return 'Both Trips';
      case 'pickup': return 'Pickup Only';
      case 'drop': return 'Drop Only';
      default: return filter;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filters Dropdown */}
            <Select onValueChange={handleFilterChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Add filters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                <SelectItem value="department-header" disabled className="font-medium text-gray-900">
                  Department
                </SelectItem>
                {departments.slice(1).map(dept => (
                  <SelectItem key={`dept-${dept}`} value={dept} className="pl-6">
                    {dept}
                  </SelectItem>
                ))}
                <SelectItem value="shift-header" disabled className="font-medium text-gray-900">
                  Shift
                </SelectItem>
                <SelectItem value="day" className="pl-6">Day Shift</SelectItem>
                <SelectItem value="night" className="pl-6">Night Shift</SelectItem>
                <SelectItem value="status-header" disabled className="font-medium text-gray-900">
                  Status
                </SelectItem>
                <SelectItem value="active" className="pl-6">Active</SelectItem>
                <SelectItem value="inactive" className="pl-6">Inactive</SelectItem>
                <SelectItem value="triptype-header" disabled className="font-medium text-gray-900">
                  Trip Type
                </SelectItem>
                <SelectItem value="both" className="pl-6">Both</SelectItem>
                <SelectItem value="pickup" className="pl-6">Pickup Only</SelectItem>
                <SelectItem value="drop" className="pl-6">Drop Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {!selectedFilters.includes('all') && selectedFilters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                  {getFilterDisplayName(filter)}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-500" 
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default EmployeeFilters;
