
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const VipRequestInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Request Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Important Notes:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• All VIP requests require Super Admin approval</li>
              <li>• Submit requests at least 24 hours in advance</li>
              <li>• Driver and vehicle assignment is handled by Super Admin</li>
              <li>• You will receive approval/rejection notification</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent VIP Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-sm font-medium">Director Meeting</div>
              <div className="text-xs text-gray-600">Jan 20, 2:00 PM • Pending</div>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-sm font-medium">Client Visit</div>
              <div className="text-xs text-gray-600">Jan 18, 10:00 AM • Approved</div>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-sm font-medium">Airport Pickup</div>
              <div className="text-xs text-gray-600">Jan 15, 3:00 PM • Declined</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VipRequestInfo;
