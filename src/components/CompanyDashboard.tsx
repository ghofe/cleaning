
import { useState } from "react";
import CompanySidebar from "./company/CompanySidebar";
import CompanyOverview from "./company/CompanyOverview";
import CleanerManagement from "./company/CleanerManagement";
import ServiceManagement from "./company/ServiceManagement";
import CompanyBookings from "./company/CompanyBookings";
import CompanyEarnings from "./company/CompanyEarnings";
import CompanyProfile from "./company/CompanyProfile";

interface CompanyDashboardProps {
  onBack: () => void;
}

const CompanyDashboard = ({ onBack }: CompanyDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <CompanySidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBack={onBack}
      />

      <div className="flex-1 p-8">
        {activeTab === 'overview' && <CompanyOverview />}
        {activeTab === 'cleaners' && <CleanerManagement />}
        {activeTab === 'services' && <ServiceManagement />}
        {activeTab === 'bookings' && <CompanyBookings />}
        {activeTab === 'earnings' && <CompanyEarnings />}
        {activeTab === 'profile' && <CompanyProfile />}
      </div>
    </div>
  );
};

export default CompanyDashboard;
