
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, DollarSign, MapPin, Search, User, Phone, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceName: string;
  cleanerName: string;
  cleanerPhone: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  location: string;
  specialInstructions?: string;
  paymentStatus: "pending" | "paid" | "refunded";
}

const CompanyBookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      customerName: "John Kamau",
      customerPhone: "+254 712 345 678",
      customerEmail: "john.kamau@email.com",
      serviceName: "Deep Cleaning Service",
      cleanerName: "Sarah Mwangi",
      cleanerPhone: "+254 701 234 567",
      date: "2024-12-08",
      time: "09:00",
      duration: 180,
      price: 2500,
      status: "confirmed",
      location: "Westlands, Nairobi",
      specialInstructions: "Please bring extra vacuum bags",
      paymentStatus: "paid"
    },
    {
      id: 2,
      customerName: "Mary Wanjiku",
      customerPhone: "+254 722 456 789",
      customerEmail: "mary.wanjiku@email.com",
      serviceName: "Office Cleaning",
      cleanerName: "James Kipkorir",
      cleanerPhone: "+254 702 345 678",
      date: "2024-12-08",
      time: "14:00",
      duration: 120,
      price: 1800,
      status: "in-progress",
      location: "CBD, Nairobi",
      paymentStatus: "paid"
    },
    {
      id: 3,
      customerName: "Peter Ochieng",
      customerPhone: "+254 733 567 890",
      customerEmail: "peter.ochieng@email.com",
      serviceName: "Carpet Cleaning",
      cleanerName: "Grace Wanjiku",
      cleanerPhone: "+254 703 456 789",
      date: "2024-12-09",
      time: "10:00",
      duration: 90,
      price: 1500,
      status: "pending",
      location: "Karen, Nairobi",
      paymentStatus: "pending"
    },
    {
      id: 4,
      customerName: "Alice Muthoni",
      customerPhone: "+254 744 678 901",
      customerEmail: "alice.muthoni@email.com",
      serviceName: "Window Cleaning",
      cleanerName: "Sarah Mwangi",
      cleanerPhone: "+254 701 234 567",
      date: "2024-12-07",
      time: "16:00",
      duration: 60,
      price: 800,
      status: "completed",
      location: "Kilimani, Nairobi",
      paymentStatus: "paid"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.cleanerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    const matchesDate = !filterDate || booking.date === filterDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleStatusChange = (bookingId: number, newStatus: Booking['status']) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
    toast({
      title: "Status Updated",
      description: `Booking status changed to ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "secondary";
      case "confirmed": return "default";
      case "in-progress": return "outline";
      case "completed": return "default";
      case "cancelled": return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <AlertCircle className="h-4 w-4" />;
      case "confirmed": return <CheckCircle className="h-4 w-4" />;
      case "in-progress": return <Clock className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "cancelled": return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "default";
      case "pending": return "secondary";
      case "refunded": return "destructive";
      default: return "outline";
    }
  };

  const todaysBookings = bookings.filter(booking => booking.date === new Date().toISOString().split('T')[0]);
  const upcomingBookings = bookings.filter(booking => new Date(booking.date) > new Date());
  const totalRevenue = bookings.filter(b => b.paymentStatus === "paid").reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Bookings</h1>
        <p className="text-gray-600">Manage all bookings for your company</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <p className="text-2xl font-bold text-green-600">{todaysBookings.length}</p>
              <p className="text-sm text-gray-500">Today's Bookings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{upcomingBookings.length}</p>
              <p className="text-sm text-gray-500">Upcoming</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">KES {(totalRevenue / 1000).toFixed(0)}K</p>
              <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-48"
            />
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Management ({filteredBookings.length})</CardTitle>
          <CardDescription>View and manage all customer bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Customer & Service Info */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{booking.customerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{booking.customerName}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Phone className="h-3 w-3" />
                          <span>{booking.customerPhone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium">{booking.serviceName}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{booking.location}</span>
                      </div>
                    </div>

                    {booking.specialInstructions && (
                      <div className="text-sm">
                        <p className="font-medium">Special Instructions:</p>
                        <p className="text-gray-600">{booking.specialInstructions}</p>
                      </div>
                    )}
                  </div>

                  {/* Cleaner & Schedule Info */}
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">Assigned Cleaner</p>
                      <p className="text-sm text-gray-600">{booking.cleanerName}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Phone className="h-3 w-3" />
                        <span>{booking.cleanerPhone}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span>{booking.time} ({booking.duration} mins)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <DollarSign className="h-4 w-4 text-orange-600" />
                        <span>KES {booking.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(booking.status)}
                        <Badge variant={getStatusColor(booking.status)}>
                          {booking.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <Badge variant={getPaymentStatusColor(booking.paymentStatus)} className="w-fit">
                        Payment: {booking.paymentStatus}
                      </Badge>
                    </div>

                    <div className="flex flex-col space-y-2">
                      {booking.status === "pending" && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleStatusChange(booking.id, "confirmed")}
                          >
                            Confirm Booking
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleStatusChange(booking.id, "cancelled")}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      
                      {booking.status === "confirmed" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusChange(booking.id, "in-progress")}
                        >
                          Mark In Progress
                        </Button>
                      )}
                      
                      {booking.status === "in-progress" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusChange(booking.id, "completed")}
                        >
                          Mark Completed
                        </Button>
                      )}

                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact Customer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredBookings.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No bookings found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyBookings;
