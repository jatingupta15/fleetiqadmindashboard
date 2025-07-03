
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
  const [selectedDepartment, setSelectedDepartment] = useState('all');
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
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
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
    toast({
      title: "Employee Added",
      description: `${data.name} has been successfully added to the system.`,
    });
  };

  const handleEditEmployee = (employee: Employee) => {
    console.log('Edit employee:', employee);
    // Here you would typically open an edit form or navigate to edit page
  };

  const handleDeactivateEmployee = (employee: Employee) => {
    setEmployees(employees.map(emp => 
      emp.id === employee.id ? { ...emp, status: 'Inactive' } : emp
    ));
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
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleDownloadTemplate}>
            <Download className="w-4 h-4" />
            Template
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleImportCSV}>
            <Upload className="w-4 h-4" />
            Import CSV
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <EmployeeFilters
        searchTerm={searchTerm}
        selectedDepartment={selectedDepartment}
        departments={departments}
        onSearchChange={setSearchTerm}
        onDepartmentChange={setSelectedDepartment}
      />

      {/* Employee Table */}
      <EmployeeTable
        employees={filteredEmployees}
        onEdit={handleEditEmployee}
        onDeactivate={handleDeactivateEmployee}
      />

      <AddEmployeeForm 
        open={showAddForm}
        onOpenChange={setShowAddForm}
        onSubmit={handleAddEmployee}
      />
    </div>
  );
};

export default Employees;
