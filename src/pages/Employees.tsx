
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Plus, 
  Upload, 
  Download
} from 'lucide-react';
import AddEmployeeForm from '@/components/AddEmployeeForm';
import EmployeeTable from '@/components/EmployeeTable';
import EmployeeFilters from '@/components/EmployeeFilters';
import { toast } from '@/hooks/use-toast';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
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

  const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations'];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(emp.department);
    return matchesSearch && matchesDepartment;
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
    setShowAddForm(false);
    setShowAddDialog(false);
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

  const handleDownloadTemplate = () => {
    const csvContent = `Name,Designation,Department,Shift,Mobile,Email,Address,Gender
John Sample,Software Engineer,IT,Day,+91 9876543210,john@company.com,Sample Address,Male`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employee-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Template Downloaded",
      description: "Employee template has been downloaded successfully.",
    });
  };

  const handleImportCSV = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast({
          title: "CSV Import",
          description: `Importing ${file.name}. This feature will be fully implemented soon.`,
        });
      }
    };
    input.click();
  };

  const handleManualAdd = () => {
    setShowAddDialog(false);
    setShowAddForm(true);
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
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      {/* Search and Filters */}
      <EmployeeFilters
        searchTerm={searchTerm}
        selectedDepartments={selectedDepartments}
        departments={departments}
        onSearchChange={setSearchTerm}
        onDepartmentChange={setSelectedDepartments}
      />

      {/* Employee Table */}
      <EmployeeTable
        employees={filteredEmployees}
        onEdit={handleEditEmployee}
        onDeactivate={handleDeactivateEmployee}
      />

      {/* Add Employee Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button 
              onClick={handleManualAdd}
              className="w-full justify-start"
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Manually
            </Button>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleDownloadTemplate}
                variant="outline" 
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
              <Button 
                onClick={handleImportCSV}
                variant="outline"
                className="flex-1"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload CSV
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddEmployeeForm 
        open={showAddForm}
        onOpenChange={setShowAddForm}
        onSubmit={handleAddEmployee}
      />
    </div>
  );
};

export default Employees;
