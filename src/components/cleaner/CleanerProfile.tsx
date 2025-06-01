
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { User, Camera, Star, Shield, Award } from "lucide-react";

const CleanerProfile = () => {
  const [profile, setProfile] = useState({
    name: "Jane Wanjiku",
    email: "jane.wanjiku@gmail.com",
    phone: "+254 701 234 567",
    location: "Nairobi, Kenya",
    bio: "Professional cleaner with 5+ years of experience. Specialized in deep cleaning and eco-friendly methods.",
    services: ["Room Cleaning", "Bathroom Deep Clean", "Kitchen Cleaning", "Laundry Service"],
    hourlyRate: 400,
    emergencyRate: 600,
    avatar: "/placeholder.svg"
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    autoAcceptBookings: false,
    showContactInfo: true
  });

  const stats = {
    totalJobs: 127,
    rating: 4.8,
    reviews: 89,
    responseRate: 98,
    onTimeRate: 95,
    badges: ["Verified", "Top Rated", "Quick Responder"]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-gray-600">Manage your profile and account settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="services">Services & Pricing</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Services & Pricing</CardTitle>
              <CardDescription>Manage your cleaning services and rates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Services Offered</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.services.map((service) => (
                    <Badge key={service} variant="outline">
                      {service}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm">Add Service</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hourlyRate">Standard Rate (per hour)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">KES</span>
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={profile.hourlyRate}
                      onChange={(e) => setProfile({...profile, hourlyRate: parseInt(e.target.value)})}
                      className="pl-12"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="emergencyRate">Emergency Rate (per hour)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">KES</span>
                    <Input
                      id="emergencyRate"
                      type="number"
                      value={profile.emergencyRate}
                      onChange={(e) => setProfile({...profile, emergencyRate: parseInt(e.target.value)})}
                      className="pl-12"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <User className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Jobs</p>
                    <p className="text-2xl font-bold">{stats.totalJobs}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Rating</p>
                    <p className="text-2xl font-bold">{stats.rating}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Reviews</p>
                    <p className="text-2xl font-bold">{stats.reviews}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Response Rate</p>
                  <p className="text-xl font-bold">{stats.responseRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">On-time Rate</p>
                  <p className="text-xl font-bold">{stats.onTimeRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {stats.badges.map((badge) => (
                  <Badge key={badge} className="bg-green-100 text-green-800">
                    <Shield className="h-3 w-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive booking updates via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Receive urgent updates via SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive app notifications</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Settings</CardTitle>
              <CardDescription>Configure your booking preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-accept Bookings</p>
                  <p className="text-sm text-gray-500">Automatically accept matching requests</p>
                </div>
                <Switch
                  checked={settings.autoAcceptBookings}
                  onCheckedChange={(checked) => setSettings({...settings, autoAcceptBookings: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Contact Info</p>
                  <p className="text-sm text-gray-500">Display phone number to students</p>
                </div>
                <Switch
                  checked={settings.showContactInfo}
                  onCheckedChange={(checked) => setSettings({...settings, showContactInfo: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-green-600 hover:bg-green-700">Save Changes</Button>
      </div>
    </div>
  );
};

export default CleanerProfile;
