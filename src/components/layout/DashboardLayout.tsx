
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Users, 
  Calendar, 
  Settings, 
  BarChart3, 
  AlertTriangle,
  Menu,
  Plus,
  Route,
  Shield
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sosActive] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem('userRole') || '';
    const email = localStorage.getItem('userEmail') || '';
    setUserRole(role);
    setUserEmail(email);
  }, []);

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/employees', label: 'Employees', icon: Users },
    { path: '/routing', label: 'Smart Routing', icon: Route },
    { path: '/special-rides', label: 'Special Rides', icon: Plus },
    { path: '/sos-alerts', label: 'SOS Alerts', icon: AlertTriangle, badge: sosActive ? '1' : undefined },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    toast({ title: "Logged out successfully" });
    navigate('/');
  };

  const getRoleColor = (role: string) => {
    return role === 'super-admin' ? 'bg-purple-600' : 'bg-indigo-600';
  };

  const getRoleLabel = (role: string) => {
    return role === 'super-admin' ? 'Super Admin' : 'Admin';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-2 ${!sidebarOpen && 'justify-center'}`}>
              <div className={`w-8 h-8 ${getRoleColor(userRole)} rounded-lg flex items-center justify-center`}>
                {userRole === 'super-admin' ? (
                  <Shield className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-white font-bold text-sm">FP</span>
                )}
              </div>
              {sidebarOpen && <span className="font-bold text-gray-900">FleetPro</span>}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
          {sidebarOpen && userRole && (
            <div className="mt-3">
              <Badge className={`${getRoleColor(userRole)} text-white`}>
                {getRoleLabel(userRole)}
              </Badge>
              <p className="text-xs text-gray-500 mt-1 truncate">{userEmail}</p>
            </div>
          )}
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start ${!sidebarOpen && 'px-3'}`}
                    onClick={() => navigate(item.path)}
                  >
                    <Icon className="w-4 h-4" />
                    {sidebarOpen && (
                      <>
                        <span className="ml-3">{item.label}</span>
                        {item.badge && (
                          <Badge variant="destructive" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* SOS Alert Bar */}
        {sosActive && (
          <div className="bg-red-600 text-white p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-semibold">SOS ALERT: Sarah Chen - 2 minutes ago</span>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate('/sos-alerts')}
              >
                View
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => toast({ title: "Calling emergency contact..." })}
              >
                Call
              </Button>
            </div>
          </div>
        )}

        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Fleet Management Dashboard
              </h1>
              {userRole === 'super-admin' && (
                <Badge className="bg-purple-100 text-purple-800">
                  Super Admin Access
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/special-rides')}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Book Special Ride
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{getRoleLabel(userRole)}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
