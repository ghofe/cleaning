
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, UserCheck, UserX, Mail, Phone, MapPin } from "lucide-react";

const CleanerManagement = () => {
  const [cleaners] = useState([
    {
      id: 1,
      name: "Sarah Mwangi",
      email: "sarah.mwangi@email.com",
      phone: "+254 701 234 567",
      status: "active",
      joinDate: "2024-01-15",
      rating: 4.8,
      completedJobs: 156,
      location: "Nairobi, Kenya",
      avatar: "/placeholder.svg",
      specialties: ["Deep Cleaning", "Office Cleaning"]
    },
    {
      id: 2,
      name: "James Kipkorir",
      email: "james.kipkorir@email.com",
      phone: "+254 702 345 678",
      status: "active",
      joinDate: "2023-11-20",
      rating: 4.9,
      completedJobs: 203,
      location: "Eldoret, Kenya",
      avatar: "/placeholder.svg",
      specialties: ["Carpet Cleaning", "Window Cleaning"]
    },
    {
      id: 3,
      name: "Grace Wanjiku",
      email: "grace.wanjiku@email.com",
      phone: "+254 703 456 789",
      status: "pending",
      joinDate: "2024-03-01",
      rating: 0,
      completedJobs: 0,
      location: "Mombasa, Kenya",
      avatar: "/placeholder.svg",
      specialties: ["Residential Cleaning"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newCleaner, setNewCleaner] = useState({
    name: "",
    email: "",
    phone: "",
    location: ""
  });

  const filteredCleaners = cleaners.filter(cleaner =>
    cleaner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cleaner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "pending": return "secondary";
      case "suspended": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Cleaner Management</h1>
          <p className="text-gray-600">Manage your team of cleaners</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Cleaner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Cleaner</DialogTitle>
              <DialogDescription>
                Register a new cleaner to your company team
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newCleaner.name}
                  onChange={(e) => setNewCleaner(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCleaner.email}
                  onChange={(e) => setNewCleaner(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newCleaner.phone}
                  onChange={(e) => setNewCleaner(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newCleaner.location}
                  onChange={(e) => setNewCleaner(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <Button className="w-full">Send Invitation</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{cleaners.filter(c => c.status === 'active').length}</p>
              <p className="text-sm text-gray-500">Active Cleaners</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{cleaners.filter(c => c.status === 'pending').length}</p>
              <p className="text-sm text-gray-500">Pending Approval</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {(cleaners.reduce((sum, c) => sum + c.rating, 0) / cleaners.filter(c => c.rating > 0).length).toFixed(1)}
              </p>
              <p className="text-sm text-gray-500">Average Rating</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {cleaners.reduce((sum, c) => sum + c.completedJobs, 0)}
              </p>
              <p className="text-sm text-gray-500">Total Jobs</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search cleaners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Cleaners List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Cleaners ({filteredCleaners.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCleaners.map((cleaner) => (
              <div key={cleaner.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={cleaner.avatar} />
                    <AvatarFallback>{cleaner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="font-semibold">{cleaner.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{cleaner.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span>{cleaner.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{cleaner.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {cleaner.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {cleaner.completedJobs} jobs • {cleaner.rating > 0 ? `${cleaner.rating} ⭐` : 'New'}
                    </p>
                    <p className="text-xs text-gray-400">Joined {cleaner.joinDate}</p>
                  </div>
                  
                  <Badge variant={getStatusColor(cleaner.status)}>
                    {cleaner.status}
                  </Badge>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    {cleaner.status === "active" ? (
                      <Button variant="outline" size="sm">
                        <UserX className="h-4 w-4 mr-1" />
                        Suspend
                      </Button>
                    ) : cleaner.status === "pending" ? (
                      <Button variant="outline" size="sm">
                        <UserCheck className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <UserCheck className="h-4 w-4 mr-1" />
                        Reactivate
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CleanerManagement;
