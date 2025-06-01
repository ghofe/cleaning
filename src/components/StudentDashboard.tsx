import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Star, User, BookOpen, MessageSquare, Settings, ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import BookCleaner from "./student/BookCleaner";
import MyBookings from "./student/MyBookings";
import Reviews from "./student/Reviews";
import Profile from "./student/Profile";
import Support from "./student/Support";

interface StudentDashboardProps {
  onBack: () => void;
}

const StudentDashboard = ({ onBack }: StudentDashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const upcomingBookings = [
    {
      id: 1,
      date: "Today, 2:00 PM",
      cleaner: "Jane Wanjiku",
      rating: 4.8,
      service: "Room Cleaning",
      status: "confirmed",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      date: "Tomorrow, 10:00 AM",
      cleaner: "Peter Kimani",
      rating: 4.9,
      service: "Bathroom Deep Clean",
      status: "pending",
      avatar: "/placeholder.svg"
    }
  ];

  const favoriteCleaners = [
    {
      id: 1,
      name: "Jane Wanjiku",
      rating: 4.8,
      specialties: ["Kitchen", "Bathroom", "General"],
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Mary Achieng",
      rating: 4.9,
      specialties: ["Deep Clean", "Laundry"],
      avatar: "/placeholder.svg"
    }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'book', label: 'Book Cleaner', icon: Plus },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'support', label: 'Support', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 w-full justify-start"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>PA</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Prince Ahmed</p>
              <p className="text-sm text-gray-500">Student</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className="w-full justify-start mb-2"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Welcome Banner */}
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Good Afternoon, Prince! 👋</CardTitle>
                <CardDescription className="text-blue-100">
                  Ready to book your next cleaning?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => setActiveTab('book')}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Upcoming Bookings */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Upcoming Bookings</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab('bookings')}
                    >
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={booking.avatar} />
                            <AvatarFallback>{booking.cleaner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{booking.cleaner}</p>
                            <p className="text-sm text-gray-500">{booking.service}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-500">{booking.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                            {booking.status}
                          </Badge>
                          <div className="flex items-center mt-2">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm ml-1">{booking.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">3</p>
                        <p className="text-sm text-gray-500">Cleanings booked</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">6 hrs</p>
                        <p className="text-sm text-gray-500">Time saved</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-yellow-600">KES 2,400</p>
                        <p className="text-sm text-gray-500">Total spent</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Cleaners</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {favoriteCleaners.map((cleaner) => (
                      <div key={cleaner.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={cleaner.avatar} />
                            <AvatarFallback>{cleaner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-sm">{cleaner.name}</p>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs ml-1">{cleaner.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">Book</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'book' && <BookCleaner />}
        {activeTab === 'bookings' && <MyBookings />}
        {activeTab === 'reviews' && <Reviews />}
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'support' && <Support />}
      </div>
    </div>
  );
};

export default StudentDashboard;
