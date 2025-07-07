
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X,
  Clock,
  User,
  Car,
  Route
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'sos' | 'ride' | 'employee' | 'system' | 'maintenance';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionRequired?: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'sos',
      title: 'SOS Alert',
      message: 'Sarah Chen has triggered an emergency alert. Location: Downtown Office',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      read: false,
      priority: 'high',
      actionRequired: true
    },
    {
      id: '2',
      type: 'ride',
      title: 'Ride Cancelled',
      message: 'John Doe cancelled his ride to Airport. Reason: Traffic delay',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'employee',
      title: 'New Employee Request',
      message: 'Emily Johnson has requested transport access for project meeting',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
      priority: 'medium',
      actionRequired: true
    },
    {
      id: '4',
      type: 'maintenance',
      title: 'Vehicle Maintenance Due',
      message: 'Vehicle FL-123 is due for scheduled maintenance in 2 days',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'system',
      title: 'System Update',
      message: 'FleetPro system will undergo maintenance tonight from 2-4 AM',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true,
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'high' | 'actionRequired'>('all');

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'sos': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'ride': return <Car className="w-5 h-5 text-blue-500" />;
      case 'employee': return <User className="w-5 h-5 text-green-500" />;
      case 'maintenance': return <Route className="w-5 h-5 text-orange-500" />;
      case 'system': return <Info className="w-5 h-5 text-gray-500" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({ title: "Notification dismissed" });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({ title: "All notifications marked as read" });
  };

  const handleAction = (notification: Notification) => {
    switch (notification.type) {
      case 'sos':
        toast({ title: "Emergency response initiated", description: "Contacting emergency services..." });
        break;
      case 'employee':
        toast({ title: "Request processed", description: "Employee transport request approved" });
        break;
      default:
        toast({ title: "Action completed" });
    }
    markAsRead(notification.id);
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (filter) {
      case 'unread': return !notif.read;
      case 'high': return notif.priority === 'high';
      case 'actionRequired': return notif.actionRequired;
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'unread', label: 'Unread' },
          { key: 'high', label: 'High Priority' },
          { key: 'actionRequired', label: 'Action Required' }
        ].map(filterOption => (
          <Button
            key={filterOption.key}
            variant={filter === filterOption.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(filterOption.key as any)}
          >
            {filterOption.label}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No notifications found</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map(notification => (
            <Card 
              key={notification.id}
              className={`transition-all hover:shadow-md ${
                !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        <Badge variant={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        {notification.actionRequired && (
                          <Badge variant="outline">Action Required</Badge>
                        )}
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatTime(notification.timestamp)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {notification.actionRequired && (
                      <Button
                        size="sm"
                        onClick={() => handleAction(notification)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Take Action
                      </Button>
                    )}
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark Read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
