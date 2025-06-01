
import { useState } from "react";
import AdminSidebar from "./admin/AdminSidebar";
import AdminDashboardOverview from "./admin/AdminDashboardOverview";
import AdminTabPlaceholder from "./admin/AdminTabPlaceholder";
import SmsNotificationSystem from "./SmsNotificationSystem";
import CleanerVerificationSystem from "./CleanerVerificationSystem";
import OffPlatformTracker from "./OffPlatformTracker";
import BadgeTicketSystem from "./BadgeTicketSystem";
import UserManagement from "./admin/UserManagement";
import BookingsManagement from "./admin/BookingsManagement";
import CleanerApplications from "./admin/CleanerApplications";
import ReviewsRatings from "./admin/ReviewsRatings";
import PaymentsPayouts from "./admin/PaymentsPayouts";

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
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'bookings' && <BookingsManagement />}
        {activeTab === 'applications' && <CleanerApplications />}
        {activeTab === 'sms' && <SmsNotificationSystem />}
        {activeTab === 'verification' && <CleanerVerificationSystem />}
        {activeTab === 'tickets' && <BadgeTicketSystem />}
        {activeTab === 'incidents' && <OffPlatformTracker />}
        {activeTab === 'reviews' && <ReviewsRatings />}
        {activeTab === 'payments' && <PaymentsPayouts />}
      </div>
    </div>
  );
};

export default AdminDashboard;
