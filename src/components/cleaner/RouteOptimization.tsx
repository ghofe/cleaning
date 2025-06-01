
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Route, Navigation } from "lucide-react";

const RouteOptimization = () => {
  const todayBookings = [
    {
      id: 1,
      student: "Sarah Mwangi",
      location: "Hostel A, Room 12",
      time: "10:00 AM - 12:00 PM",
      service: "Room Cleaning",
      distance: "0.2 km",
      payment: "KES 800",
      priority: 1
    },
    {
      id: 2,
      student: "John Ochieng",
      location: "Hostel B, Room 25",
      time: "1:00 PM - 3:00 PM",
      service: "Bathroom Clean",
      distance: "0.5 km from previous",
      payment: "KES 1,200",
      priority: 2
    },
    {
      id: 3,
      student: "Emma Nduta",
      location: "Hostel A, Room 8",
      time: "3:30 PM - 5:30 PM",
      service: "Full Service",
      distance: "0.3 km from previous",
      payment: "KES 1,500",
      priority: 3
    }
  ];

  const routeStats = {
    totalDistance: "1.2 km",
    totalTime: "7.5 hours",
    estimatedEarnings: "KES 3,500",
    travelTime: "15 minutes"
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Route Optimization</h1>
        <p className="text-gray-600">Optimized route for today's bookings</p>
      </div>

      {/* Route Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Route className="h-5 w-5" />
            <span>Today's Route Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{routeStats.totalDistance}</div>
              <p className="text-sm text-gray-500">Total Distance</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{routeStats.totalTime}</div>
              <p className="text-sm text-gray-500">Working Time</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{routeStats.estimatedEarnings}</div>
              <p className="text-sm text-gray-500">Est. Earnings</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{routeStats.travelTime}</div>
              <p className="text-sm text-gray-500">Travel Time</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <Button className="flex-1">
              <Navigation className="h-4 w-4 mr-2" />
              Start Navigation
            </Button>
            <Button variant="outline">Optimize Route</Button>
          </div>
        </CardContent>
      </Card>

      {/* Optimized Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Optimized Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayBookings.map((booking) => (
              <div key={booking.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {booking.priority}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{booking.student}</h3>
                      <p className="text-sm text-gray-600">{booking.service}</p>
                    </div>
                    <Badge variant="outline">{booking.payment}</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {booking.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {booking.location}
                    </div>
                    <div className="flex items-center">
                      <Route className="h-4 w-4 mr-1" />
                      {booking.distance}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">Navigate</Button>
                  <Button size="sm">Start Job</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Route Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Route Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Interactive route map would be displayed here</p>
              <p className="text-sm text-gray-400">Integration with Google Maps or similar service</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteOptimization;
