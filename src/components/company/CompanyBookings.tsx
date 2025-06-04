
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CompanyBookings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Bookings</h1>
        <p className="text-gray-600">Manage all bookings for your company</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
          <CardDescription>View and manage all customer bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Company booking management features coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyBookings;
