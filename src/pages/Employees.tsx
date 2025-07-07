
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Upload, 
  Download
} from 'lucide-react';
import AddEmployeeForm from '@/components/AddEmployeeForm';
import EmployeeTable from '@/components/EmployeeTable';
import EmployeeFilters from '@/components/EmployeeFilters';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: number;
  code: string;
  name: string;
  designation: string;
  department: string;
  shift: string;
  mobile: string;
  email: string;
  address: string;
  gender: string;
  status: string;
}

const Employees = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['all']);
  const [showAddForm, setShowAddForm] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      code: 'EMP001',
      name: 'John Doe',
      designation: 'Software Engineer',
      department: 'IT',
      shift: 'Day',
      mobile: '+91 9876543210',
      email: 'john.doe@company.com',
      address: 'Sector 62, Noida',
      gender: 'Male',
      status: 'Active'
    },
    {
      id: 2,
      code: 'EMP002',
      name: 'Sarah Smith',
      designation: 'HR Manager',
      department: 'HR',
      shift: 'Day',
      mobile: '+91 9876543211',
      email: 'sarah.smith@company.com',
      address: 'Gurgaon, Haryana',
      gender: 'Female',
      status: 'Active'
    },
    {
      id: 3,
      code: 'EMP003',
      name: 'Mike Johnson',
      designation: 'Finance Director',
      department: 'Finance',
      shift: 'Day',
      mobile: '+91 9876543212',
      email: 'mike.johnson@company.com',
      address: 'CP, Delhi',
      gender: 'Male',
      status: 'Active'
    },
    {
      id: 4,
      code: 'EMP004',
      name: 'Sarah Chen',
      designation: 'Accountant',
      department: 'Finance',
      shift: 'Night',
      mobile: '+91 9876543213',
      email: 'sarah.chen@company.com',
      address: 'Whitefield, Bangalore',
      gender: 'Female',
      status: 'Active'
    }
  ]);

  const departments = ['all', 'IT', 'HR', 'Finance', 'Marketing', 'Operations'];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilters.includes('all')) return matchesSearch;
    
    const matchesFilters = selectedFilters.some(filter => {
      if (departments.includes(filter)) {
        return emp.department === filter;
      } else if (filter === 'day') {
        return emp.shift === 'Day';
      } else if (filter === 'night') {
        return emp.shift === 'Night';
      } else if (filter === 'active') {
        return emp.status === 'Active';
      } else if (filter === 'inactive') {
        return emp.status === 'Inactive';
      }
      return false;
    });
    
    return matchesSearch && matchesFilters;
  });

  const handleAddEmployee = (data: any) => {
    const newEmployee: Employee = {
      id: employees.length + 1,
      code: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      name: data.name,
      designation: data.designation,
      department: data.department,
      shift: data.shift,
      mobile: data.mobile,
      email: data.email,
      address: data.address,
      gender: data.gender,
      status: 'Active'
    };
    
    setEmployees([...employees, newEmployee]);
    toast({
      title: "Employee Added",
      description: `${data.name} has been successfully added to the system.`,
    });
  };

  const handleEditEmployee = (employee: Employee) => {
    console.log('Edit employee:', employee);
  };

  const handleDeactivateEmployee = (employee: Employee) => {
    setEmployees(employees.map(emp => 
      emp.id === employee.id ? { ...emp, status: 'Inactive' } : emp
    ));
  };

  const handleViewEmployeeDetails = (employee: Employee) => {
    navigate(`/employee-profile/${employee.id}`);
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: "Employee template has been downloaded successfully.",
    });
  };

  const handleImportCSV = () => {
    toast({
      title: "Import CSV",
      description: "CSV import functionality will be implemented soon.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600">Manage employee profiles and ride access</p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      {/* Search and Filters */}
      <EmployeeFilters
        searchTerm={searchTerm}
        selectedFilters={selectedFilters}
        departments={departments}
        onSearchChange={setSearchTerm}
        onFiltersChange={setSelectedFilters}
      />

      {/* Employee Table */}
      <EmployeeTable
        employees={filteredEmployees}
        onEdit={handleEditEmployee}
        onDeactivate={handleDeactivateEmployee}
        onViewDetails={handleViewEmployeeDetails}
      />

      {/* Add Employee Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Fill in the employee details below or use the quick actions to import data
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="flex gap-2 p-4 bg-gray-50 rounded-lg">
              <Button variant="outline" className="flex items-center gap-2" onClick={handleDownloadTemplate}>
                <Download className="w-4 h-4" />
                Download Template
              </Button>
              <Button variant="outline" className="flex items-center gap-2" onClick={handleImportCSV}>
                <Upload className="w-4 h-4" />
                Upload CSV
              </Button>
            </div>

            {/* Add Employee Form */}
            <AddEmployeeForm 
              open={showAddForm}
              onOpenChange={setShowAddForm}
              onSubmit={handleAddEmployee}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
