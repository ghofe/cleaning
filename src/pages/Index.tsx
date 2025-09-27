import { Button } from "@/components/ui/button";
import { Shield, MapPin, Calendar, Star } from "lucide-react";
import { useState } from "react";
import HomeOwnerDashboard from "@/components/HomeownerDashboard";
import CleanerDashboard from "@/components/CleanerDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import CompanyDashboard from "@/components/CompanyDashboard";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import heroImage from "@/assets/hero-cleaning-illustration.png";

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "login" | "signup" | string>("landing");

  // Handle different views
  if (currentView === "login") {
    return (
      <LoginForm
        onBack={() => setCurrentView("landing")}
        onLogin={(userType) => setCurrentView(userType)}
      />
    );
  }

  if (currentView === "signup") {
    return (
      <SignupForm
        onBack={() => setCurrentView("landing")}
        onSignup={(userType) => setCurrentView(userType)}
      />
    );
  }

  // Show selected dashboard based on user selection
  if (currentView === 'homeowner') {
    return <HomeOwnerDashboard onBack={() => setCurrentView("landing")} />;
  }

  if (currentView === 'cleaner') {
    return <CleanerDashboard onBack={() => setCurrentView("landing")} />;
  }

  if (currentView === 'admin') {
    return <AdminDashboard onBack={() => setCurrentView("landing")} />;
  }

  if (currentView === 'company') {
    return <CompanyDashboard onBack={() => setCurrentView("landing")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/png/8c321e35-db19-4660-acb4-90f2e30e158b.png" 
              alt="CampusClean Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold text-gray-900">CampusClean</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            <Button variant="ghost" onClick={() => setCurrentView("login")}>
              Login
            </Button>
            <Button onClick={() => setCurrentView("signup")}>
              Sign Up
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Your Trusted Cleaning Partner, Anytime.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              CampusClean connects homeowners with verified cleaners and companies. Book 
              services in minutes, track in real-time, and enjoy peace of mind.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => setCurrentView("signup")}>
                Get Started
              </Button>
              <Button variant="outline" size="lg" onClick={() => setCurrentView("login")}>
                Login
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <img 
              src={heroImage} 
              alt="Professional cleaning service illustration" 
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Features</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-16 w-16 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Verified Cleaners & Companies
            </h3>
            <p className="text-gray-600 mb-4">
              All cleaners are vetted and background checked
            </p>
            <div className="flex items-center justify-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">4.9+ average rating</span>
            </div>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <MapPin className="h-16 w-16 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Real-time Tracking
            </h3>
            <p className="text-gray-600">
              Track cleaner's location and progress live
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Calendar className="h-16 w-16 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Flexible Scheduling
            </h3>
            <p className="text-gray-600">
              Book services to fit your schedule, 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;