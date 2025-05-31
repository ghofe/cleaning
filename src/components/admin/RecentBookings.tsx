
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RecentBookings = () => {
  const recentBookings = [
    {
      id: 1,
      student: "Alice Wanjiru",
      cleaner: "Jane Wanjiku",
      service: "Room Cleaning",
      amount: "KES 800",
      status: "completed",
      date: "Today, 2:00 PM"
    },
    {
      id: 2,
      student: "Brian Otieno",
      cleaner: "Peter Kimani",
      service: "Deep Clean",
      amount: "KES 1,500",
      status: "in_progress",
      date: "Today, 3:30 PM"
    },
    {
      id: 3,
      student: "Carol Muthoni",
      cleaner: "Mary Achieng",
      service: "Bathroom Clean",
      amount: "KES 600",
      status: "scheduled",
      date: "Tomorrow, 10:00 AM"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>Latest booking activity on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-semibold text-sm">{booking.student}</p>
                <p className="text-xs text-gray-500">{booking.service} • {booking.cleaner}</p>
                <p className="text-xs text-gray-400">{booking.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">{booking.amount}</p>
                <Badge 
                  variant={
                    booking.status === 'completed' ? 'default' : 
                    booking.status === 'in_progress' ? 'secondary' : 
                    'outline'
                  }
                  className="text-xs"
                >
                  {booking.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBookings;
