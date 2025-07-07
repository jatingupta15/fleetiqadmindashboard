
import React, { useState } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EmployeeFiltersProps {
  searchTerm: string;
  selectedDepartments: string[];
  departments: string[];
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string[]) => void;
}

const EmployeeFilters = ({ 
  searchTerm, 
  selectedDepartments, 
  departments, 
  onSearchChange, 
  onDepartmentChange 
}: EmployeeFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleDepartmentSelect = (department: string) => {
    if (selectedDepartments.includes(department)) {
      onDepartmentChange(selectedDepartments.filter(d => d !== department));
    } else {
      onDepartmentChange([...selectedDepartments, department]);
    }
  };

  const removeDepartment = (department: string) => {
    onDepartmentChange(selectedDepartments.filter(d => d !== department));
  };

  const clearAllFilters = () => {
    onDepartmentChange([]);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4">
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
            
            {/* Filter Toggle */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {selectedDepartments.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedDepartments.length}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Departments</h4>
                  {selectedDepartments.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearAllFilters}
                      className="text-xs"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
                
                <Select onValueChange={handleDepartmentSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select departments..." />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem 
                        key={dept} 
                        value={dept}
                        disabled={selectedDepartments.includes(dept)}
                      >
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Selected Departments */}
                {selectedDepartments.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedDepartments.map(dept => (
                      <Badge key={dept} variant="secondary" className="flex items-center gap-1">
                        {dept}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-red-500" 
                          onClick={() => removeDepartment(dept)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default EmployeeFilters;
