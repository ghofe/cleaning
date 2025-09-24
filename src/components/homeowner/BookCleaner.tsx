
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock, MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import CleanerSelection from "./CleanerSelection";
import PaymentMethods from "./PaymentMethods";

const BookCleaner = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [serviceType, setServiceType] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [location, setLocation] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [selectedCleaner, setSelectedCleaner] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

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

  const steps = [
    { number: 1, title: "Service Details", description: "Choose service and schedule" },
    { number: 2, title: "Select Cleaner", description: "Pick your preferred cleaner" },
    { number: 3, title: "Payment", description: "Complete your booking" }
  ];

  const canProceedFromStep1 = selectedDate && serviceType && timeSlot && location;
  const canProceedFromStep2 = selectedCleaner;
  const canCompleteBooking = paymentMethod;

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePaymentComplete = () => {
    const booking = {
      date: selectedDate,
      service: serviceType,
      time: timeSlot,
      location,
      instructions: specialInstructions,
      cleaner: selectedCleaner,
      paymentMethod,
      id: Date.now()
    };
    
    console.log("Booking completed:", booking);
    alert("Booking completed successfully!");
    
    // Reset form
    setCurrentStep(1);
    setSelectedDate(undefined);
    setServiceType("");
    setTimeSlot("");
    setLocation("");
    setSpecialInstructions("");
    setSelectedCleaner("");
    setPaymentMethod("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium",
                  currentStep >= step.number 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-600"
                )}>
                  {step.number}
                </div>
                <div className="ml-3">
                  <p className={cn(
                    "font-medium",
                    currentStep >= step.number ? "text-blue-600" : "text-gray-600"
                  )}>
                    {step.title}
                  </p>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-12 h-0.5 mx-6",
                    currentStep > step.number ? "bg-blue-600" : "bg-gray-200"
                  )} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
            <CardDescription>Choose your cleaning service and schedule</CardDescription>
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
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <CleanerSelection 
          selectedCleaner={selectedCleaner}
          onCleanerChange={setSelectedCleaner}
        />
      )}

      {currentStep === 3 && (
        <PaymentMethods
          selectedMethod={paymentMethod}
          onMethodChange={setPaymentMethod}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        {currentStep < 3 ? (
          <Button 
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !canProceedFromStep1) ||
              (currentStep === 2 && !canProceedFromStep2)
            }
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button 
            disabled={!canCompleteBooking}
            className="bg-green-600 hover:bg-green-700"
          >
            Complete Booking
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookCleaner;
