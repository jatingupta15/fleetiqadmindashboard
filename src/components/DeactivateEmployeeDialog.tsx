
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const deactivateSchema = z.object({
  reason: z.string().min(1, 'Deactivation reason is required'),
  comments: z.string().optional(),
});

type DeactivateFormValues = z.infer<typeof deactivateSchema>;

interface DeactivateEmployeeDialogProps {
  employee: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (employee: any, reason: string, comments?: string) => void;
}

const DeactivateEmployeeDialog = ({ 
  employee, 
  open, 
  onOpenChange, 
  onConfirm 
}: DeactivateEmployeeDialogProps) => {
  const form = useForm<DeactivateFormValues>({
    resolver: zodResolver(deactivateSchema),
    defaultValues: {
      reason: '',
      comments: '',
    },
  });

  const handleSubmit = (data: DeactivateFormValues) => {
    onConfirm(employee, data.reason, data.comments);
    toast({
      title: "Employee Deactivated",
      description: `${employee.name} has been deactivated.`,
      variant: "destructive",
    });
    onOpenChange(false);
    form.reset();
  };

  const deactivationReasons = [
    'Resignation',
    'Termination',
    'End of Contract',
    'Performance Issues',
    'Attendance Issues',
    'Relocation',
    'Other'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deactivate Employee</DialogTitle>
          <DialogDescription>
            Are you sure you want to deactivate {employee?.name}? Please provide a reason for deactivation.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Deactivation</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {deactivationReasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Comments (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any additional comments..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="destructive">
                Deactivate Employee
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeactivateEmployeeDialog;
