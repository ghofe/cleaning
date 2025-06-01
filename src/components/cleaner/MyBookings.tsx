
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, CheckCircle, Phone, MessageSquare } from "lucide-react";

const CleanerMyBookings = () => {
  const [bookings] = useState([
    {
      id: 1,
      service: "Room Cleaning",
      student: "Sarah Mwangi",
      date: "2024-06-02",
      time: "2:00 PM - 4:00 PM",
      location: "Room 245, Block A",
      status: "confirmed",
      payment: "KES 800",
      commission: "KES 120",
      studentPhone: "+254 701 234 567",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      service: "Bathroom Deep Clean",
      student: "John Ochieng",
      date: "2024-06-03",
      time: "10:00 AM - 12:00 PM",
      location: "Room 25, Block B",
      status: "in_progress",
      payment: "KES 1,200",
      commission: "KES 180",
      studentPhone: "+254 702 345 678",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      service: "Kitchen Cleaning",
      student: "Emma Nduta",
      date: "2024-05-28",
      time: "12:00 PM - 2:00 PM",
      location: "Room 15, Block C",
      status: "completed",
      payment: "KES 1,000",
      commission: "KES 150",
      studentPhone: "+254 703 456 789",
      avatar: "/placeholder.svg"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "default";
      case "in_progress": return "secondary";
      case "completed": return "outline";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const activeBookings = bookings.filter(b => b.status !== "completed" && b.status !== "cancelled");
  const completedBookings = bookings.filter(b => b.status === "completed");

  const BookingCard = ({ booking }: { booking: typeof bookings[0] }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{booking.service}</h3>
            <p className="text-green-600 font-medium">{booking.payment}</p>
            <p className="text-sm text-gray-500">Commission: {booking.commission}</p>
          </div>
          <Badge variant={getStatusColor(booking.status)}>
            {booking.status.replace('_', ' ')}
          </Badge>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={booking.avatar} />
            <AvatarFallback>{booking.student.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{booking.student}</p>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {booking.date}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {booking.time}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {booking.location}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>
          {booking.status === "in_progress" && (
            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-gray-600">Manage your cleaning appointments</p>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Bookings ({activeBookings.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeBookings.length > 0 ? (
            activeBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No active bookings</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CleanerMyBookings;
