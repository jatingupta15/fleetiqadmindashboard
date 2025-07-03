import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Upload, 
  Download,
  Eye,
  Edit,
  UserX,
  MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddEmployeeForm from '@/components/AddEmployeeForm';
import { toast } from '@/hooks/use-toast';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const employees = [
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
  ];

  const departments = ['all', 'IT', 'HR', 'Finance', 'Marketing', 'Operations'];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleAddEmployee = (data: any) => {
    console.log('New employee data:', data);
    toast({
      title: "Employee Added",
      description: `${data.name} has been successfully added to the system.`,
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
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Template
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
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
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
            
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employees ({filteredEmployees.length})</CardTitle>
          <CardDescription>
            Complete list of registered employees with ride access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-600">Employee</th>
                  <th className="text-left p-3 font-medium text-gray-600">Department</th>
                  <th className="text-left p-3 font-medium text-gray-600">Shift</th>
                  <th className="text-left p-3 font-medium text-gray-600">Contact</th>
                  <th className="text-left p-3 font-medium text-gray-600">Status</th>
                  <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <div>
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-600">{employee.code} • {employee.designation}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="secondary">{employee.department}</Badge>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        employee.shift === 'Day' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {employee.shift}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="text-sm">
                        <div>{employee.mobile}</div>
                        <div className="text-gray-600">{employee.email}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {employee.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/employee/${employee.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <UserX className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddEmployeeForm 
        open={showAddForm}
        onOpenChange={setShowAddForm}
        onSubmit={handleAddEmployee}
      />
    </div>
  );
};

export default Employees;
