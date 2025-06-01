
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const BookCleaner = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [serviceType, setServiceType] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [location, setLocation] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const serviceTypes = [
    { value: "room", label: "Room Cleaning", price: "KES 800" },
    { value: "bathroom", label: "Bathroom Deep Clean", price: "KES 1,200" },
    { value: "kitchen", label: "Kitchen Cleaning", price: "KES 1,000" },
    { value: "laundry", label: "Laundry Service", price: "KES 600" },
    { value: "full", label: "Full Room Service", price: "KES 2,000" }
  ];

  const timeSlots = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM"
  ];

  const handleBooking = () => {
    if (!selectedDate || !serviceType || !timeSlot || !location) {
      alert("Please fill in all required fields");
      return;
    }
    
    const booking = {
      date: selectedDate,
      service: serviceType,
      time: timeSlot,
      location,
      instructions: specialInstructions,
      id: Date.now()
    };
    
    console.log("Booking created:", booking);
    alert("Booking request submitted successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book a Cleaner</CardTitle>
          <CardDescription>Schedule your cleaning service with our verified cleaners</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Service Type */}
          <div className="space-y-2">
            <Label>Service Type *</Label>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger>
                <SelectValue placeholder="Select cleaning service" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    <div className="flex justify-between w-full">
                      <span>{service.label}</span>
                      <span className="text-green-600 font-medium ml-4">{service.price}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Preferred Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Slot */}
          <div className="space-y-2">
            <Label>Time Slot *</Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger>
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {slot}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="location"
                placeholder="e.g., Room 245, Block A"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              placeholder="Any specific requirements or areas that need special attention..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={3}
            />
          </div>

          <Button onClick={handleBooking} className="w-full" size="lg">
            Book Cleaning Service
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookCleaner;
