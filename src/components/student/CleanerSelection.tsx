
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Clock, DollarSign, Filter } from "lucide-react";

interface CleanerSelectionProps {
  selectedCleaner: string;
  onCleanerChange: (cleanerId: string) => void;
}

const CleanerSelection = ({ selectedCleaner, onCleanerChange }: CleanerSelectionProps) => {
  const [sortBy, setSortBy] = useState("rating");
  const [filterLocation, setFilterLocation] = useState("all");

  const cleaners = [
    {
      id: "1",
      name: "Jane Wanjiku",
      rating: 4.9,
      reviews: 127,
      location: "Block A",
      distance: "0.2 km",
      price: 800,
      specialties: ["Room Cleaning", "Bathroom", "Kitchen"],
      availability: "Available now",
      completedJobs: 156,
      avatar: "/placeholder.svg",
      verified: true,
      responseTime: "< 5 min"
    },
    {
      id: "2",
      name: "Peter Kimani",
      rating: 4.8,
      reviews: 89,
      location: "Block B",
      distance: "0.4 km",
      price: 750,
      specialties: ["Deep Cleaning", "Laundry", "General"],
      availability: "Available in 30 min",
      completedJobs: 98,
      avatar: "/placeholder.svg",
      verified: true,
      responseTime: "< 10 min"
    },
    {
      id: "3",
      name: "Mary Achieng",
      rating: 4.7,
      reviews: 203,
      location: "Block A",
      distance: "0.1 km",
      price: 850,
      specialties: ["Kitchen", "Bathroom", "Windows"],
      availability: "Available now",
      completedJobs: 245,
      avatar: "/placeholder.svg",
      verified: true,
      responseTime: "< 3 min"
    },
    {
      id: "4",
      name: "David Mutua",
      rating: 4.6,
      reviews: 67,
      location: "Block C",
      distance: "0.6 km",
      price: 700,
      specialties: ["Room Cleaning", "General"],
      availability: "Available in 1 hour",
      completedJobs: 78,
      avatar: "/placeholder.svg",
      verified: false,
      responseTime: "< 15 min"
    }
  ];

  const sortedCleaners = [...cleaners].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "distance":
        return parseFloat(a.distance) - parseFloat(b.distance);
      default:
        return 0;
    }
  });

  const filteredCleaners = sortedCleaners.filter(cleaner => 
    filterLocation === "all" || cleaner.location === filterLocation
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Cleaner</CardTitle>
        <CardDescription>Select from our verified cleaners in your area</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="distance">Nearest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Block A">Block A</SelectItem>
                <SelectItem value="Block B">Block B</SelectItem>
                <SelectItem value="Block C">Block C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cleaners List */}
        <div className="space-y-4">
          {filteredCleaners.map((cleaner) => (
            <Card 
              key={cleaner.id} 
              className={`cursor-pointer transition-all ${
                selectedCleaner === cleaner.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => onCleanerChange(cleaner.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={cleaner.avatar} />
                      <AvatarFallback>{cleaner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-lg">{cleaner.name}</h3>
                        {cleaner.verified && (
                          <Badge variant="default" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{cleaner.rating}</span>
                          <span>({cleaner.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{cleaner.location} • {cleaner.distance}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {cleaner.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{cleaner.availability}</span>
                        </div>
                        <span>Response time: {cleaner.responseTime}</span>
                        <span>{cleaner.completedJobs} jobs completed</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-lg font-bold text-green-600">
                      <DollarSign className="h-5 w-5" />
                      <span>KES {cleaner.price}</span>
                    </div>
                    <p className="text-sm text-gray-500">per service</p>
                    
                    {selectedCleaner === cleaner.id && (
                      <Badge className="mt-2 bg-blue-600">Selected</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCleaners.length === 0 && (
          <div className="text-center py-8">
            <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No cleaners found matching your filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CleanerSelection;
