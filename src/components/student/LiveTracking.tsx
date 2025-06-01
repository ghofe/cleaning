
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, CheckCircle, Route } from "lucide-react";

const LiveTracking = () => {
  const [trackingStatus, setTrackingStatus] = useState("on_way");
  const [estimatedArrival, setEstimatedArrival] = useState("15 minutes");
  
  const statusSteps = [
    { id: "confirmed", label: "Booking Confirmed", completed: true },
    { id: "on_way", label: "Cleaner On The Way", completed: true },
    { id: "arrived", label: "Arrived at Location", completed: false },
    { id: "in_progress", label: "Cleaning in Progress", completed: false },
    { id: "completed", label: "Service Completed", completed: false }
  ];

  const cleaner = {
    name: "Jane Wanjiku",
    avatar: "/placeholder.svg",
    phone: "+254 701 234 567",
    currentLocation: "500m away"
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Route className="h-5 w-5" />
            <span>Live Tracking</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={cleaner.avatar} />
                <AvatarFallback>JW</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{cleaner.name}</h3>
                <p className="text-sm text-gray-500">{cleaner.phone}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-green-600">On The Way</Badge>
              <p className="text-sm text-gray-500 mt-1">ETA: {estimatedArrival}</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-green-600 text-white' 
                    : step.id === trackingStatus 
                      ? 'bg-blue-600 text-white animate-pulse' 
                      : 'bg-gray-200 text-gray-400'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                <div>
                  <p className={`font-medium ${
                    step.completed || step.id === trackingStatus 
                      ? 'text-gray-900' 
                      : 'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                  {step.id === trackingStatus && (
                    <p className="text-sm text-blue-600">In Progress...</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Location Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-700">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Current Location: {cleaner.currentLocation}</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-700 mt-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Estimated arrival: {estimatedArrival}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveTracking;
