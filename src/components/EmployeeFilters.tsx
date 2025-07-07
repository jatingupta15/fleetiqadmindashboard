
import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface EmployeeFiltersProps {
  searchTerm: string;
  selectedDepartment: string;
  departments: string[];
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
}

const EmployeeFilters = ({ 
  searchTerm, 
  selectedDepartment, 
  departments, 
  onSearchChange, 
  onDepartmentChange 
}: EmployeeFiltersProps) => {
  const filterOptions = [
    { label: 'All Filters', value: 'all' },
    { label: 'Department', value: 'department' },
    { label: 'Shift', value: 'shift' },
    { label: 'Status', value: 'status' },
    { label: 'Trip Type', value: 'tripType' },
    { label: 'Gender', value: 'gender' },
  ];

  const getFilterContent = (filterType: string) => {
    switch (filterType) {
      case 'department':
        return departments.map(dept => (
          <SelectItem key={dept} value={dept}>
            {dept === 'all' ? 'All Departments' : dept}
          </SelectItem>
        ));
      case 'shift':
        return ['All Shifts', 'Day', 'Night'].map(shift => (
          <SelectItem key={shift} value={shift.toLowerCase().replace(' ', '')}>
            {shift}
          </SelectItem>
        ));
      case 'status':
        return ['All Status', 'Active', 'Inactive'].map(status => (
          <SelectItem key={status} value={status.toLowerCase().replace(' ', '')}>
            {status}
          </SelectItem>
        ));
      case 'tripType':
        return ['All Trip Types', 'Both', 'Pickup Only', 'Drop Only'].map(type => (
          <SelectItem key={type} value={type.toLowerCase().replace(' ', '')}>
            {type}
          </SelectItem>
        ));
      case 'gender':
        return ['All Genders', 'Male', 'Female', 'Other'].map(gender => (
          <SelectItem key={gender} value={gender.toLowerCase().replace(' ', '')}>
            {gender}
          </SelectItem>
        ));
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
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
          
          {/* Unified Filters Dropdown */}
          <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select filters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Filters</SelectItem>
              <SelectItem value="department-header" disabled className="font-medium text-gray-900">Department</SelectItem>
              {departments.slice(1).map(dept => (
                <SelectItem key={`dept-${dept}`} value={dept} className="pl-6">
                  {dept}
                </SelectItem>
              ))}
              <SelectItem value="shift-header" disabled className="font-medium text-gray-900">Shift</SelectItem>
              <SelectItem value="day" className="pl-6">Day Shift</SelectItem>
              <SelectItem value="night" className="pl-6">Night Shift</SelectItem>
              <SelectItem value="status-header" disabled className="font-medium text-gray-900">Status</SelectItem>
              <SelectItem value="active" className="pl-6">Active</SelectItem>
              <SelectItem value="inactive" className="pl-6">Inactive</SelectItem>
              <SelectItem value="triptype-header" disabled className="font-medium text-gray-900">Trip Type</SelectItem>
              <SelectItem value="both" className="pl-6">Both</SelectItem>
              <SelectItem value="pickup" className="pl-6">Pickup Only</SelectItem>
              <SelectItem value="drop" className="pl-6">Drop Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
    </Card>
  );
};

export default EmployeeFilters;
