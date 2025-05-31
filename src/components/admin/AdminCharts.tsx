
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const AdminCharts = () => {
  const bookingData = [
    { name: 'Mon', bookings: 12 },
    { name: 'Tue', bookings: 19 },
    { name: 'Wed', bookings: 15 },
    { name: 'Thu', bookings: 25 },
    { name: 'Fri', bookings: 22 },
    { name: 'Sat', bookings: 18 },
    { name: 'Sun', bookings: 8 },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 48000 },
    { name: 'Apr', revenue: 61000 },
    { name: 'May', revenue: 58000 },
    { name: 'Jun', revenue: 67000 },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Booking Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Booking Trends</CardTitle>
          <CardDescription>Number of bookings per day this week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>Monthly revenue over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCharts;
