
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, Clock, MapPin, DollarSign, Eye } from "lucide-react";

const BookingsManagement = () => {
  const [bookings] = useState([
    {
      id: 1,
      bookingId: "BK001",
      student: "Prince Ahmed",
      cleaner: "Jane Wanjiku",
      service: "Room Cleaning",
      date: "2024-06-02",
      time: "2:00 PM - 4:00 PM",
      location: "Room 245, Block A",
      amount: 800,
      commission: 120,
      status: "completed",
      paymentStatus: "paid",
      escrowStatus: "released",
      studentAvatar: "/placeholder.svg",
      cleanerAvatar: "/placeholder.svg"
    },
    {
      id: 2,
      bookingId: "BK002",
      student: "Sarah Mwangi",
      cleaner: "Peter Kimani",
      service: "Bathroom Deep Clean",
      date: "2024-06-03",
      time: "10:00 AM - 12:00 PM",
      location: "Room 12, Block A",
      amount: 1200,
      commission: 180,
      status: "in_progress",
      paymentStatus: "paid",
      escrowStatus: "held",
      studentAvatar: "/placeholder.svg",
      cleanerAvatar: "/placeholder.svg"
    },
    {
      id: 3,
      bookingId: "BK003",
      student: "John Ochieng",
      cleaner: "Mary Achieng",
      service: "Kitchen Cleaning",
      date: "2024-06-04",
      time: "12:00 PM - 2:00 PM",
      location: "Room 25, Block B",
      amount: 1000,
      commission: 150,
      status: "confirmed",
      paymentStatus: "paid",
      escrowStatus: "held",
      studentAvatar: "/placeholder.svg",
      cleanerAvatar: "/placeholder.svg"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "default";
      case "in_progress": return "secondary";
      case "completed": return "outline";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const getEscrowColor = (status: string) => {
    switch (status) {
      case "held": return "secondary";
      case "released": return "default";
      case "disputed": return "destructive";
      default: return "outline";
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.cleaner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    const matchesPayment = filterPayment === "all" || booking.paymentStatus === filterPayment;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bookings Management</h1>
        <p className="text-gray-600">Monitor and manage all cleaning bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
              <p className="text-sm text-gray-500">Total Bookings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {bookings.filter(b => b.status === "completed").length}
              </p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {bookings.filter(b => b.status === "in_progress").length}
              </p>
              <p className="text-sm text-gray-500">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                KES {bookings.reduce((acc, b) => acc + b.amount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                KES {bookings.reduce((acc, b) => acc + b.commission, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Commission</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPayment} onValueChange={setFilterPayment}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-semibold">#{booking.bookingId}</p>
                      <p className="text-lg font-medium">{booking.service}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant={getStatusColor(booking.status)}>
                      {booking.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant={getEscrowColor(booking.escrowStatus)}>
                      Escrow: {booking.escrowStatus}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Student & Cleaner Info */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={booking.studentAvatar} />
                        <AvatarFallback>{booking.student.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{booking.student}</p>
                        <p className="text-sm text-gray-500">Student</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={booking.cleanerAvatar} />
                        <AvatarFallback>{booking.cleaner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{booking.cleaner}</p>
                        <p className="text-sm text-gray-500">Cleaner</p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-2">
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
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      KES {booking.amount} (Commission: KES {booking.commission})
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Payment: <Badge variant="outline">{booking.paymentStatus}</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    {booking.escrowStatus === "held" && booking.status === "completed" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Release Payment
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsManagement;
