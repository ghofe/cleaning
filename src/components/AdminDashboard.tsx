
import { useState } from "react";
import AdminSidebar from "./admin/AdminSidebar";
import AdminDashboardOverview from "./admin/AdminDashboardOverview";
import AdminTabPlaceholder from "./admin/AdminTabPlaceholder";
import SmsNotificationSystem from "./SmsNotificationSystem";
import CleanerVerificationSystem from "./CleanerVerificationSystem";
import OffPlatformTracker from "./OffPlatformTracker";
import BadgeTicketSystem from "./BadgeTicketSystem";

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBack={onBack}
      />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'overview' && <AdminDashboardOverview />}
        {activeTab === 'sms' && <SmsNotificationSystem />}
        {activeTab === 'verification' && <CleanerVerificationSystem />}
        {activeTab === 'tickets' && <BadgeTicketSystem />}
        {activeTab === 'incidents' && <OffPlatformTracker />}
        {(activeTab === 'users' || activeTab === 'bookings' || activeTab === 'applications' || activeTab === 'reviews' || activeTab === 'payments') && (
          <AdminTabPlaceholder activeTab={activeTab} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
