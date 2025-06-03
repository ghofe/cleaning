
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Star, Clock, MapPin, Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import StudentDashboard from "@/components/StudentDashboard";
import CleanerDashboard from "@/components/CleanerDashboard";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  const { user } = useAuth();
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(null);

  // Show selected dashboard
  if (selectedDashboard === 'student') {
    return <StudentDashboard onBack={() => setSelectedDashboard(null)} />;
  }

  if (selectedDashboard === 'cleaner') {
    return <CleanerDashboard onBack={() => setSelectedDashboard(null)} />;
  }

  if (selectedDashboard === 'admin') {
    return <AdminDashboard onBack={() => setSelectedDashboard(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 text-white p-4 rounded-full mr-4">
              <Shield className="h-12 w-12" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900">
              CleanCampus
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Revolutionary cleaning service platform connecting students with trusted professional cleaners. 
            Experience seamless booking, real-time tracking, and premium quality service.
          </p>
          
          {user && (
            <div className="mb-8 p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
              <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
              <p className="text-sm text-blue-600">Role: {user.role}</p>
              <Button 
                className="mt-2"
                onClick={() => setSelectedDashboard(user.role)}
              >
                Go to My Dashboard
              </Button>
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Verified Cleaners</CardTitle>
              <CardDescription>
                All our cleaning professionals are thoroughly vetted and background-checked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">4.9+ average rating</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Clock className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Real-time Tracking</CardTitle>
              <CardDescription>
                Track your cleaner's location and service progress in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">Live GPS tracking</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Calendar className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Flexible Scheduling</CardTitle>
              <CardDescription>
                Book cleaning services that fit your schedule, from daily to weekly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-gray-600">24/7 availability</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Selection */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Choose Your Dashboard</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow bg-white border-2 hover:border-blue-500"
              onClick={() => setSelectedDashboard('student')}
            >
              <CardHeader>
                <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <CardTitle>Student Portal</CardTitle>
                <CardDescription>
                  Book cleaning services, track orders, manage payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Access Student Dashboard</Button>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow bg-white border-2 hover:border-green-500"
              onClick={() => setSelectedDashboard('cleaner')}
            >
              <CardHeader>
                <Star className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <CardTitle>Cleaner Portal</CardTitle>
                <CardDescription>
                  Manage bookings, optimize routes, track earnings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-green-600 hover:bg-green-700">Access Cleaner Dashboard</Button>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow bg-white border-2 hover:border-purple-500"
              onClick={() => setSelectedDashboard('admin')}
            >
              <CardHeader>
                <Shield className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                <CardTitle>Admin Portal</CardTitle>
                <CardDescription>
                  System management, analytics, user oversight
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Access Admin Dashboard</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
