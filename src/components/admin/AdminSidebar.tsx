
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3, Users, Calendar, UserCheck, MessageSquare, Shield, AlertTriangle, Star, CreditCard, FileText, TrendingUp, Scale } from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBack: () => void;
}

const AdminSidebar = ({ activeTab, setActiveTab, onBack }: AdminSidebarProps) => {
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'analytics', label: 'Advanced Analytics', icon: TrendingUp },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'applications', label: 'Cleaner Applications', icon: UserCheck },
    { id: 'disputes', label: 'Dispute Resolution', icon: Scale },
    { id: 'reviews', label: 'Reviews & Ratings', icon: Star },
    { id: 'payments', label: 'Payments & Payouts', icon: CreditCard },
    { id: 'sms', label: 'SMS Notifications', icon: MessageSquare },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'tickets', label: 'Support Tickets', icon: FileText },
    { id: 'incidents', label: 'Off-Platform Tracker', icon: AlertTriangle },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 w-full justify-start"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        <div>
          <h2 className="text-xl font-bold">Admin Portal</h2>
          <p className="text-sm text-gray-500">Campus Clean Management</p>
        </div>
      </div>
      
      <nav className="p-4">
        {sidebarItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="h-4 w-4 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
