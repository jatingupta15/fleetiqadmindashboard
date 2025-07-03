
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EmployeeActions from './EmployeeActions';

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

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDeactivate: (employee: Employee) => void;
}

const EmployeeTable = ({ employees, onEdit, onDeactivate }: EmployeeTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees ({employees.length})</CardTitle>
        <CardDescription>
          Complete list of registered employees with ride access
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-600">{employee.code} • {employee.designation}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{employee.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      employee.shift === 'Day' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {employee.shift}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{employee.mobile}</div>
                      <div className="text-gray-600">{employee.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <EmployeeActions 
                      employee={employee}
                      onEdit={onEdit}
                      onDeactivate={onDeactivate}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeTable;
