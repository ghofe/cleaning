
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, UserCheck, Star, DollarSign } from "lucide-react";

interface AdminTabPlaceholderProps {
  activeTab: string;
}

const AdminTabPlaceholder = ({ activeTab }: AdminTabPlaceholderProps) => {
  const getTabInfo = () => {
    switch (activeTab) {
      case 'users':
        return {
          title: 'User Management',
          description: 'Manage students, cleaners, and user accounts',
          icon: Users
        };
      case 'bookings':
        return {
          title: 'Bookings Management',
          description: 'View and manage all platform bookings',
          icon: Calendar
        };
      case 'applications':
        return {
          title: 'Cleaner Applications',
          description: 'Review and approve new cleaner applications',
          icon: UserCheck
        };
      case 'reviews':
        return {
          title: 'Reviews & Ratings',
          description: 'Monitor and moderate user reviews',
          icon: Star
        };
      case 'payments':
        return {
          title: 'Payments & Payouts',
          description: 'Handle payments, payouts, and financial transactions',
          icon: DollarSign
        };
      default:
        return {
          title: 'Coming Soon',
          description: 'This section is being developed',
          icon: Users
        };
    }
  };

  const { title, description, icon: Icon } = getTabInfo();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <div className="h-16 w-16 text-gray-400 mx-auto mb-4">
            <Icon className="h-16 w-16" />
          </div>
          <p className="text-gray-500">This section is coming soon...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminTabPlaceholder;
