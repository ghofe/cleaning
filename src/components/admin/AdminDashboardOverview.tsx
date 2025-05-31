
import AdminSummaryCards from "./AdminSummaryCards";
import AdminCharts from "./AdminCharts";
import RecentBookings from "./RecentBookings";
import PendingApplications from "./PendingApplications";

const AdminDashboardOverview = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Monitor your platform performance and key metrics</p>
      </div>

      {/* Summary Cards */}
      <AdminSummaryCards />

      {/* Charts */}
      <AdminCharts />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <RecentBookings />

        {/* Pending Applications */}
        <PendingApplications />
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
