import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Users, Calendar, DollarSign, Star, ArrowLeft, UserCheck, Clock, TrendingUp, MessageSquare, Shield, QrCode, Flag } from "lucide-react";
import { useState } from "react";
import SmsNotificationSystem from "./SmsNotificationSystem";
import CleanerVerificationSystem from "./CleanerVerificationSystem";
import OffPlatformTracker from "./OffPlatformTracker";
import BadgeTicketSystem from "./BadgeTicketSystem";

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

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

  const pendingApplications = [
    {
      id: 1,
      name: "David Mutua",
      experience: "2 years",
      rating: "4.6",
      location: "Nairobi",
      appliedDate: "2 days ago"
    },
    {
      id: 2,
      name: "Grace Njeri",
      experience: "3 years",
      rating: "4.8",
      location: "Kiambu",
      appliedDate: "1 day ago"
    }
  ];

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

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'applications', label: 'Cleaner Applications', icon: UserCheck },
    { id: 'sms', label: 'SMS Notifications', icon: MessageSquare },
    { id: 'verification', label: 'Cleaner Verification', icon: Shield },
    { id: 'tickets', label: 'Badge & Tickets', icon: QrCode },
    { id: 'incidents', label: 'Off-Platform Tracker', icon: Flag },
    { id: 'reviews', label: 'Reviews & Ratings', icon: Star },
    { id: 'payments', label: 'Payments & Payouts', icon: DollarSign },
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
          <div>
            <h2 className="text-xl font-bold text-blue-900">Admin Portal</h2>
            <p className="text-sm text-gray-500">Campus Clean Management</p>
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
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600">Monitor your platform performance and key metrics</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Cleaners</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">+7% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,521</div>
                  <p className="text-xs text-muted-foreground">+23% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KES 127,000</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
            </div>

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

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Bookings */}
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

              {/* Pending Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Cleaner Applications</CardTitle>
                  <CardDescription>New cleaners waiting for approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApplications.map((application) => (
                      <div key={application.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold">{application.name}</p>
                            <p className="text-sm text-gray-500">{application.experience} experience</p>
                            <p className="text-sm text-gray-500">{application.location}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              <span className="text-sm">{application.rating}</span>
                            </div>
                            <p className="text-xs text-gray-400">{application.appliedDate}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">Reject</Button>
                          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">Approve</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* New SMS Notifications Tab */}
        {activeTab === 'sms' && <SmsNotificationSystem />}
        
        {/* New Cleaner Verification Tab */}
        {activeTab === 'verification' && <CleanerVerificationSystem />}
        
        {/* New Badge & Tickets Tab */}
        {activeTab === 'tickets' && <BadgeTicketSystem />}
        
        {/* New Off-Platform Tracker Tab */}
        {activeTab === 'incidents' && <OffPlatformTracker />}

        {/* Other existing tabs content placeholders */}
        {(activeTab === 'users' || activeTab === 'bookings' || activeTab === 'applications' || activeTab === 'reviews' || activeTab === 'payments') && (
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'bookings' && 'Bookings Management'}
                {activeTab === 'applications' && 'Cleaner Applications'}
                {activeTab === 'reviews' && 'Reviews & Ratings'}
                {activeTab === 'payments' && 'Payments & Payouts'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'users' && 'Manage students, cleaners, and user accounts'}
                {activeTab === 'bookings' && 'View and manage all platform bookings'}
                {activeTab === 'applications' && 'Review and approve new cleaner applications'}
                {activeTab === 'reviews' && 'Monitor and moderate user reviews'}
                {activeTab === 'payments' && 'Handle payments, payouts, and financial transactions'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="h-16 w-16 text-gray-400 mx-auto mb-4">
                  {activeTab === 'users' && <Users className="h-16 w-16" />}
                  {activeTab === 'bookings' && <Calendar className="h-16 w-16" />}
                  {activeTab === 'applications' && <UserCheck className="h-16 w-16" />}
                  {activeTab === 'reviews' && <Star className="h-16 w-16" />}
                  {activeTab === 'payments' && <DollarSign className="h-16 w-16" />}
                </div>
                <p className="text-gray-500">This section is coming soon...</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
