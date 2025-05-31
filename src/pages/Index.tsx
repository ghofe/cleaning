
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Star, Clock, MapPin, Shield } from "lucide-react";
import { useState } from "react";
import StudentDashboard from "@/components/StudentDashboard";
import CleanerDashboard from "@/components/CleanerDashboard";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'student' | 'cleaner' | 'admin'>('landing');

  if (currentView === 'student') {
    return <StudentDashboard onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'cleaner') {
    return <CleanerDashboard onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'admin') {
    return <AdminDashboard onBack={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Shield className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-blue-900">Campus Clean</h1>
          </div>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('student')}
              className="hover:bg-blue-50"
            >
              Student Login
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('cleaner')}
              className="hover:bg-blue-50"
            >
              Cleaner Login
            </Button>
            <Button 
              onClick={() => setCurrentView('admin')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Admin Portal
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Professional Cleaning Services
            <span className="text-blue-600"> for University Students</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in">
            Connect with verified cleaners and cleaning companies. Book instantly, 
            track your appointments, and enjoy a spotless living space.
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in">
            <Button 
              size="lg" 
              onClick={() => setCurrentView('student')}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
            >
              Book Cleaning Service
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setCurrentView('cleaner')}
              className="text-lg px-8 py-4 hover:bg-blue-50"
            >
              Join as Cleaner
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Campus Clean?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Verified Cleaners</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                All cleaners are background-checked and rated by fellow students
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Flexible Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Book instantly or schedule in advance. Cancel or reschedule easily
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Quality Guaranteed</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Rate your experience and help maintain high service standards
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2">Choose Service</h4>
              <p className="text-gray-600 text-sm">Select room cleaning, bathroom, kitchen, or full service</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2">Pick Time & Cleaner</h4>
              <p className="text-gray-600 text-sm">Browse available cleaners and choose your preferred time</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2">Relax & Study</h4>
              <p className="text-gray-600 text-sm">Your cleaner arrives on time and does the work professionally</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h4 className="font-semibold mb-2">Rate & Review</h4>
              <p className="text-gray-600 text-sm">Share your experience to help other students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
            <p className="text-gray-600">Happy Students</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <p className="text-gray-600">Verified Cleaners</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">2000+</div>
            <p className="text-gray-600">Bookings Completed</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">4.9★</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-xl font-bold">Campus Clean</span>
              </div>
              <p className="text-gray-400">
                Making university life cleaner and more convenient for students across Kenya.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Students</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Book Service</li>
                <li>My Bookings</li>
                <li>Reviews</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Cleaners</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Join Platform</li>
                <li>Earnings</li>
                <li>Resources</li>
                <li>Help Center</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 support@campusclean.co.ke</li>
                <li>📱 +254 700 123 456</li>
                <li>📍 USIU-Africa Campus</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Campus Clean. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
