import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Star, User, DollarSign, Users, Settings, ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";
import CleanerMyBookings from "./cleaner/MyBookings";
import Availability from "./cleaner/Availability";
import Earnings from "./cleaner/Earnings";
import TeamManagement from "./cleaner/TeamManagement";
import CleanerProfile from "./cleaner/CleanerProfile";

interface CleanerDashboardProps {
  onBack: () => void;
}

const CleanerDashboard = ({ onBack }: CleanerDashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const todaysJobs = [
    {
      id: 1,
      time: "10:00 AM",
      student: "Sarah Mwangi",
      location: "Hostel A, Room 12",
      service: "Room Cleaning",
      status: "confirmed",
      payment: "KES 800"
    },
    {
      id: 2,
      time: "2:00 PM",
      student: "John Ochieng",
      location: "Hostel B, Room 25",
      service: "Bathroom Deep Clean",
      status: "pending",
      payment: "KES 1,200"
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      student: "Emma Nduta",
      time: "Tomorrow, 9:00 AM",
      service: "Full Room Service",
      payment: "KES 1,500",
      timeLeft: "2 hours to respond"
    }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Calendar },
    { id: 'bookings', label: 'My Bookings', icon: Clock },
    { id: 'availability', label: 'Availability', icon: Settings },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
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
              <AvatarFallback>JW</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Jane Wanjiku</p>
              <p className="text-sm text-gray-500">Professional Cleaner</p>
              <Badge variant="outline" className="mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Available Today
              </Badge>
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
            {/* Welcome Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, Jane! 👋</h1>
                <p className="text-gray-600">You have 2 appointments today</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                Update Availability
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Today's Jobs */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Appointments</CardTitle>
                    <CardDescription>Your scheduled jobs for today</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {todaysJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col items-center">
                            <Clock className="h-4 w-4 text-gray-400 mb-1" />
                            <span className="text-sm font-semibold">{job.time}</span>
                          </div>
                          <div>
                            <p className="font-semibold">{job.student}</p>
                            <p className="text-sm text-gray-500">{job.service}</p>
                            <p className="text-sm text-gray-400">{job.location}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge variant={job.status === 'confirmed' ? 'default' : 'secondary'}>
                            {job.status}
                          </Badge>
                          <p className="text-sm font-semibold text-green-600">{job.payment}</p>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Pending Requests */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Requests</CardTitle>
                    <CardDescription>New booking requests waiting for your response</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pendingRequests.map((request) => (
                      <div key={request.id} className="p-4 border rounded-lg bg-blue-50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold">{request.student}</p>
                            <p className="text-sm text-gray-600">{request.service}</p>
                            <p className="text-sm text-gray-500">{request.time}</p>
                          </div>
                          <p className="font-semibold text-green-600">{request.payment}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-orange-600">{request.timeLeft}</p>
                          <div className="space-x-2">
                            <Button size="sm" variant="outline">Decline</Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">Accept</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">This Week</p>
                        <p className="text-2xl font-bold text-green-600">KES 2,400</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">This Month</p>
                        <p className="text-2xl font-bold text-blue-600">KES 8,200</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Earned</p>
                        <p className="text-2xl font-bold text-purple-600">KES 40,000</p>
                      </div>
                      <Button className="w-full" variant="outline">
                        Request Payout
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Rating</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-semibold">4.8</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Jobs Completed</span>
                        <span className="font-semibold">127</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Response Rate</span>
                        <span className="font-semibold">98%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">On-time Rate</span>
                        <span className="font-semibold">95%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="flex items-center mb-1">
                          <div className="flex text-yellow-400 text-sm">★★★★★</div>
                        </div>
                        <p className="text-sm text-gray-600">"Excellent work! Very thorough."</p>
                        <p className="text-xs text-gray-400 mt-1">- Sarah M.</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="flex items-center mb-1">
                          <div className="flex text-yellow-400 text-sm">★★★★★</div>
                        </div>
                        <p className="text-sm text-gray-600">"Always on time and professional."</p>
                        <p className="text-xs text-gray-400 mt-1">- John O.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && <CleanerMyBookings />}
        {activeTab === 'availability' && <Availability />}
        {activeTab === 'earnings' && <Earnings />}
        {activeTab === 'team' && <TeamManagement />}
        {activeTab === 'profile' && <CleanerProfile />}
      </div>
    </div>
  );
};

export default CleanerDashboard;
