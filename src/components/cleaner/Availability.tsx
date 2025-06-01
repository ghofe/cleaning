
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock } from "lucide-react";

const Availability = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [workingDays, setWorkingDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false
  });
  const [workingHours, setWorkingHours] = useState({
    start: "08:00",
    end: "18:00"
  });
  const [maxBookingsPerDay, setMaxBookingsPerDay] = useState("4");
  const [unavailableDates, setUnavailableDates] = useState([
    "2024-06-15",
    "2024-06-20"
  ]);
  const [notes, setNotes] = useState("Available for emergency cleanings on weekends with prior notice.");

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Availability Settings</h1>
        <p className="text-gray-600">Manage your working schedule and availability</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* General Availability */}
        <Card>
          <CardHeader>
            <CardTitle>General Availability</CardTitle>
            <CardDescription>Set your overall availability status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="available">Currently Available</Label>
                <p className="text-sm text-gray-500">Accept new booking requests</p>
              </div>
              <Switch
                id="available"
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant={isAvailable ? "default" : "secondary"}>
                <div className={`w-2 h-2 rounded-full mr-2 ${isAvailable ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                {isAvailable ? 'Available' : 'Unavailable'}
              </Badge>
            </div>

            <div className="space-y-3">
              <Label>Maximum Bookings Per Day</Label>
              <Select value={maxBookingsPerDay} onValueChange={setMaxBookingsPerDay}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 booking</SelectItem>
                  <SelectItem value="2">2 bookings</SelectItem>
                  <SelectItem value="3">3 bookings</SelectItem>
                  <SelectItem value="4">4 bookings</SelectItem>
                  <SelectItem value="5">5 bookings</SelectItem>
                  <SelectItem value="6">6 bookings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Working Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Working Hours</CardTitle>
            <CardDescription>Set your daily working schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time">Start Time</Label>
                <Select value={workingHours.start} onValueChange={(value) => setWorkingHours({...workingHours, start: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({length: 24}, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="end-time">End Time</Label>
                <Select value={workingHours.end} onValueChange={(value) => setWorkingHours({...workingHours, end: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({length: 24}, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              Current: {workingHours.start} - {workingHours.end}
            </div>
          </CardContent>
        </Card>

        {/* Working Days */}
        <Card>
          <CardHeader>
            <CardTitle>Working Days</CardTitle>
            <CardDescription>Select which days you're available to work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {days.map((day) => (
                <div key={day.key} className="flex items-center justify-between">
                  <Label htmlFor={day.key}>{day.label}</Label>
                  <Switch
                    id={day.key}
                    checked={workingDays[day.key as keyof typeof workingDays]}
                    onCheckedChange={(checked) => 
                      setWorkingDays({...workingDays, [day.key]: checked})
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Special Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Special Notes</CardTitle>
            <CardDescription>Add any special availability notes</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Available for emergency cleanings on weekends..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
      </div>
    </div>
  );
};

export default Availability;
