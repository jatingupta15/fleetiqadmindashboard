
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Eye,
  Edit,
  UserX,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
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

interface EmployeeActionsProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDeactivate: (employee: Employee) => void;
}

const EmployeeActions = ({ employee, onEdit, onDeactivate }: EmployeeActionsProps) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/employee/${employee.id}`);
  };

  const handleEdit = () => {
    onEdit(employee);
  };

  const handleDeactivate = () => {
    onDeactivate(employee);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={handleView}
        title="View Employee"
      >
        <Eye className="w-4 h-4" />
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            size="sm" 
            variant="ghost"
            title="More Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleDeactivate}
            className="text-red-600 focus:text-red-600"
          >
            <UserX className="w-4 h-4 mr-2" />
            Deactivate Employee
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EmployeeActions;
