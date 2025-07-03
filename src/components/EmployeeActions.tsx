
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Eye,
  Edit,
  UserX,
  MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
    toast({
      title: "Edit Employee",
      description: `Editing ${employee.name}'s profile.`,
    });
  };

  const handleDeactivate = () => {
    onDeactivate(employee);
    toast({
      title: "Employee Deactivated",
      description: `${employee.name} has been deactivated.`,
      variant: "destructive",
    });
  };

  const handleMore = () => {
    toast({
      title: "More Options",
      description: "Additional options for this employee.",
    });
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
      <Button 
        size="sm" 
        variant="ghost"
        onClick={handleEdit}
        title="Edit Employee"
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button 
        size="sm" 
        variant="ghost"
        onClick={handleDeactivate}
        title="Deactivate Employee"
      >
        <UserX className="w-4 h-4" />
      </Button>
      <Button 
        size="sm" 
        variant="ghost"
        onClick={handleMore}
        title="More Options"
      >
        <MoreHorizontal className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default EmployeeActions;
