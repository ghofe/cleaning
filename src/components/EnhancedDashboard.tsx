
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Bell, 
  CreditCard, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  User,
  MessageSquare
} from 'lucide-react';
import { useAuth } from './auth/AuthProvider';
import RealTimeUpdates from './features/RealTimeUpdates';
import TwoFactorAuth from './features/TwoFactorAuth';
import PaymentEscrow from './features/PaymentEscrow';
import AuditLog from './features/AuditLog';
import NotificationSystem from './features/NotificationSystem';
import DarkModeToggle from './features/DarkModeToggle';

// Import existing components
import LoyaltyRewards from './student/LoyaltyRewards';
import InventoryManagement from './cleaner/InventoryManagement';
import ChatSystem from './messaging/ChatSystem';
import LiveTracking from './student/LiveTracking';

const EnhancedDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return null;

  const getDashboardTabs = () => {
    const commonTabs = [
      { id: 'overview', label: 'Overview', icon: BarChart3 },
      { id: 'notifications', label: 'Real-time Updates', icon: Bell },
      { id: 'security', label: 'Security', icon: Shield },
      { id: 'messages', label: 'Messages', icon: MessageSquare }
    ];

    const roleSpecificTabs = {
      student: [
        { id: 'loyalty', label: 'Loyalty & Rewards', icon: CreditCard },
        { id: 'tracking', label: 'Live Tracking', icon: BarChart3 }
      ],
      cleaner: [
        { id: 'inventory', label: 'Inventory', icon: BarChart3 },
        { id: 'earnings', label: 'Earnings', icon: CreditCard }
      ],
      admin: [
        { id: 'escrow', label: 'Payment Escrow', icon: CreditCard },
        { id: 'audit', label: 'Audit Log', icon: Shield },
        { id: 'users', label: 'User Management', icon: Users }
      ]
    };

    return [...commonTabs, ...(roleSpecificTabs[user.role] || [])];
  };

  const tabs = getDashboardTabs();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              CleanCampus Hub
            </h1>
            <Badge variant="outline" className="text-sm">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationSystem />
            <DarkModeToggle />
            
            <div className="flex items-center space-x-2 px-3 py-1 border rounded-lg">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{user.name}</span>
              {user.verified && (
                <Shield className="h-3 w-3 text-green-600" />
              )}
            </div>
            
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome Back, {user.name}!</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    You're logged in as a {user.role}. Your account is{' '}
                    {user.verified ? (
                      <span className="text-green-600 font-medium">verified</span>
                    ) : (
                      <span className="text-red-600 font-medium">unverified</span>
                    )}
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Email:</span> {user.email}
                    </div>
                    {user.phone && (
                      <div className="text-sm">
                        <span className="font-medium">Phone:</span> {user.phone}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Authentication</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Real-time Updates</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Payment System</span>
                      <Badge className="bg-green-100 text-green-800">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Security</span>
                      <Badge className="bg-blue-100 text-blue-800">Enhanced</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Security Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Notification Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <RealTimeUpdates />
          </TabsContent>

          <TabsContent value="security">
            <TwoFactorAuth />
          </TabsContent>

          <TabsContent value="messages">
            <ChatSystem 
              bookingId="BK123" 
              userType={user.role as "student" | "cleaner"} 
              recipientName="Jane Doe" 
            />
          </TabsContent>

          {user.role === 'student' && (
            <>
              <TabsContent value="loyalty">
                <LoyaltyRewards />
              </TabsContent>
              <TabsContent value="tracking">
                <LiveTracking />
              </TabsContent>
            </>
          )}

          {user.role === 'cleaner' && (
            <>
              <TabsContent value="inventory">
                <InventoryManagement />
              </TabsContent>
              <TabsContent value="earnings">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Dashboard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Enhanced earnings tracking coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}

          {user.role === 'admin' && (
            <>
              <TabsContent value="escrow">
                <PaymentEscrow />
              </TabsContent>
              <TabsContent value="audit">
                <AuditLog />
              </TabsContent>
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Advanced user management tools coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
