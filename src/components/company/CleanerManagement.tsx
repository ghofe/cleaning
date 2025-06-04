
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, UserCheck, UserX, Mail, Phone, MapPin, Star, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Cleaner {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "suspended";
  joinDate: string;
  rating: number;
  completedJobs: number;
  location: string;
  avatar: string;
  specialties: string[];
  hourlyRate: number;
  experience: string;
  languages: string[];
}

const CleanerManagement = () => {
  const { toast } = useToast();
  const [cleaners, setCleaners] = useState<Cleaner[]>([
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
      specialties: ["Deep Cleaning", "Office Cleaning"],
      hourlyRate: 500,
      experience: "3 years",
      languages: ["English", "Swahili"]
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
      specialties: ["Carpet Cleaning", "Window Cleaning"],
      hourlyRate: 600,
      experience: "5 years",
      languages: ["English", "Swahili", "Kalenjin"]
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
      specialties: ["Residential Cleaning"],
      hourlyRate: 450,
      experience: "1 year",
      languages: ["English", "Swahili"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCleaner, setEditingCleaner] = useState<Cleaner | null>(null);
  const [newCleaner, setNewCleaner] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    specialties: [] as string[],
    hourlyRate: "",
    experience: "",
    languages: [] as string[]
  });

  const filteredCleaners = cleaners.filter(cleaner => {
    const matchesSearch = cleaner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cleaner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || cleaner.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (cleanerId: number, newStatus: "active" | "suspended") => {
    setCleaners(prev => prev.map(cleaner => 
      cleaner.id === cleanerId ? { ...cleaner, status: newStatus } : cleaner
    ));
    toast({
      title: "Status Updated",
      description: `Cleaner status changed to ${newStatus}`,
    });
  };

  const handleApproveCleaner = (cleanerId: number) => {
    setCleaners(prev => prev.map(cleaner => 
      cleaner.id === cleanerId ? { ...cleaner, status: "active" } : cleaner
    ));
    toast({
      title: "Cleaner Approved",
      description: "Cleaner has been approved and is now active",
    });
  };

  const handleAddCleaner = () => {
    const cleaner: Cleaner = {
      id: Date.now(),
      name: newCleaner.name,
      email: newCleaner.email,
      phone: newCleaner.phone,
      location: newCleaner.location,
      status: "pending",
      joinDate: new Date().toISOString().split('T')[0],
      rating: 0,
      completedJobs: 0,
      avatar: "/placeholder.svg",
      specialties: newCleaner.specialties,
      hourlyRate: parseInt(newCleaner.hourlyRate),
      experience: newCleaner.experience,
      languages: newCleaner.languages
    };
    
    setCleaners(prev => [...prev, cleaner]);
    setNewCleaner({
      name: "",
      email: "",
      phone: "",
      location: "",
      specialties: [],
      hourlyRate: "",
      experience: "",
      languages: []
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Cleaner Added",
      description: "New cleaner invitation sent successfully",
    });
  };

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
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Cleaner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Cleaner</DialogTitle>
              <DialogDescription>
                Register a new cleaner to your company team
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <Label htmlFor="hourlyRate">Hourly Rate (KES)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={newCleaner.hourlyRate}
                  onChange={(e) => setNewCleaner(prev => ({ ...prev, hourlyRate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={newCleaner.experience}
                  onChange={(e) => setNewCleaner(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="e.g., 3 years"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="specialties">Specialties (comma-separated)</Label>
                <Input
                  id="specialties"
                  value={newCleaner.specialties.join(', ')}
                  onChange={(e) => setNewCleaner(prev => ({ 
                    ...prev, 
                    specialties: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                  }))}
                  placeholder="Deep Cleaning, Office Cleaning"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="languages">Languages (comma-separated)</Label>
                <Input
                  id="languages"
                  value={newCleaner.languages.join(', ')}
                  onChange={(e) => setNewCleaner(prev => ({ 
                    ...prev, 
                    languages: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                  }))}
                  placeholder="English, Swahili"
                />
              </div>
            </div>
            <Button onClick={handleAddCleaner} className="w-full">Send Invitation</Button>
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
                {cleaners.filter(c => c.rating > 0).length > 0 ? 
                  (cleaners.reduce((sum, c) => sum + c.rating, 0) / cleaners.filter(c => c.rating > 0).length).toFixed(1) : 
                  "0"
                }
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

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search cleaners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
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
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3" />
                        <span>KES {cleaner.hourlyRate}/hr</span>
                      </div>
                      <span>• {cleaner.experience} experience</span>
                      <span>• {cleaner.languages.join(', ')}</span>
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange(cleaner.id, "suspended")}
                      >
                        <UserX className="h-4 w-4 mr-1" />
                        Suspend
                      </Button>
                    ) : cleaner.status === "pending" ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleApproveCleaner(cleaner.id)}
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange(cleaner.id, "active")}
                      >
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
