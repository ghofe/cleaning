
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3, Users, Briefcase, Calendar, CreditCard, Building } from "lucide-react";

interface CompanySidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBack: () => void;
}

const CompanySidebar = ({ activeTab, setActiveTab, onBack }: CompanySidebarProps) => {
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'cleaners', label: 'Cleaner Management', icon: Users },
    { id: 'services', label: 'Service Management', icon: Briefcase },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'earnings', label: 'Earnings', icon: CreditCard },
    { id: 'profile', label: 'Company Profile', icon: Building },
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
          <h2 className="text-xl font-bold">Company Portal</h2>
          <p className="text-sm text-gray-500">Manage your cleaning business</p>
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

export default CompanySidebar;
