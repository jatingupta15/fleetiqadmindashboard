
import React, { useState } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from '@/components/ui/checkbox';

interface EmployeeFiltersProps {
  searchTerm: string;
  selectedDepartments: string[];
  selectedShifts: string[];
  selectedStatuses: string[];
  departments: string[];
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string[]) => void;
  onShiftChange: (value: string[]) => void;
  onStatusChange: (value: string[]) => void;
}

const EmployeeFilters = ({ 
  searchTerm, 
  selectedDepartments,
  selectedShifts,
  selectedStatuses,
  departments, 
  onSearchChange, 
  onDepartmentChange,
  onShiftChange,
  onStatusChange
}: EmployeeFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const shifts = ['Day', 'Night', 'Rotational'];
  const statuses = ['Active', 'Inactive'];

  const handleDepartmentToggle = (department: string) => {
    if (selectedDepartments.includes(department)) {
      onDepartmentChange(selectedDepartments.filter(d => d !== department));
    } else {
      onDepartmentChange([...selectedDepartments, department]);
    }
  };

  const handleShiftToggle = (shift: string) => {
    if (selectedShifts.includes(shift)) {
      onShiftChange(selectedShifts.filter(s => s !== shift));
    } else {
      onShiftChange([...selectedShifts, shift]);
    }
  };

  const handleStatusToggle = (status: string) => {
    if (selectedStatuses.includes(status)) {
      onStatusChange(selectedStatuses.filter(s => s !== status));
    } else {
      onStatusChange([...selectedStatuses, status]);
    }
  };

  const clearAllFilters = () => {
    onDepartmentChange([]);
    onShiftChange([]);
    onStatusChange([]);
  };

  const totalFilters = selectedDepartments.length + selectedShifts.length + selectedStatuses.length;

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
              {totalFilters > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {totalFilters}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Active Filters</h4>
                {totalFilters > 0 && (
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Department Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Department</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {selectedDepartments.length > 0 
                          ? `${selectedDepartments.length} selected`
                          : "Select departments"
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-3">
                      <div className="space-y-2">
                        {departments.map((dept) => (
                          <div key={dept} className="flex items-center space-x-2">
                            <Checkbox
                              id={`dept-${dept}`}
                              checked={selectedDepartments.includes(dept)}
                              onCheckedChange={() => handleDepartmentToggle(dept)}
                            />
                            <label htmlFor={`dept-${dept}`} className="text-sm">
                              {dept}
                            </label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Shift Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Shift</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {selectedShifts.length > 0 
                          ? `${selectedShifts.length} selected`
                          : "Select shifts"
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-3">
                      <div className="space-y-2">
                        {shifts.map((shift) => (
                          <div key={shift} className="flex items-center space-x-2">
                            <Checkbox
                              id={`shift-${shift}`}
                              checked={selectedShifts.includes(shift)}
                              onCheckedChange={() => handleShiftToggle(shift)}
                            />
                            <label htmlFor={`shift-${shift}`} className="text-sm">
                              {shift}
                            </label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {selectedStatuses.length > 0 
                          ? `${selectedStatuses.length} selected`
                          : "Select status"
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-3">
                      <div className="space-y-2">
                        {statuses.map((status) => (
                          <div key={status} className="flex items-center space-x-2">
                            <Checkbox
                              id={`status-${status}`}
                              checked={selectedStatuses.includes(status)}
                              onCheckedChange={() => handleStatusToggle(status)}
                            />
                            <label htmlFor={`status-${status}`} className="text-sm">
                              {status}
                            </label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Selected Filters Display */}
              {totalFilters > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedDepartments.map(dept => (
                    <Badge key={`dept-${dept}`} variant="secondary" className="flex items-center gap-1">
                      Dept: {dept}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-500" 
                        onClick={() => handleDepartmentToggle(dept)}
                      />
                    </Badge>
                  ))}
                  {selectedShifts.map(shift => (
                    <Badge key={`shift-${shift}`} variant="secondary" className="flex items-center gap-1">
                      Shift: {shift}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-500" 
                        onClick={() => handleShiftToggle(shift)}
                      />
                    </Badge>
                  ))}
                  {selectedStatuses.map(status => (
                    <Badge key={`status-${status}`} variant="secondary" className="flex items-center gap-1">
                      Status: {status}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-500" 
                        onClick={() => handleStatusToggle(status)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default EmployeeFilters;
