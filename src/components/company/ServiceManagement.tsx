
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Clock, DollarSign, Users, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  status: "active" | "inactive";
  bookings: number;
  rating: number;
  imageUrl?: string;
  requirements: string[];
  included: string[];
}

const ServiceManagement = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Deep Cleaning Service",
      description: "Comprehensive deep cleaning for residential and commercial spaces",
      price: 2500,
      duration: 180,
      category: "Deep Cleaning",
      status: "active",
      bookings: 45,
      rating: 4.8,
      requirements: ["Access to property", "Water and electricity"],
      included: ["All cleaning supplies", "Equipment", "2 cleaners"]
    },
    {
      id: 2,
      name: "Office Cleaning",
      description: "Daily office cleaning and maintenance",
      price: 1800,
      duration: 120,
      category: "Commercial",
      status: "active",
      bookings: 67,
      rating: 4.9,
      requirements: ["Office access card", "Security clearance"],
      included: ["Desk cleaning", "Vacuum", "Trash removal", "Sanitization"]
    },
    {
      id: 3,
      name: "Carpet Cleaning",
      description: "Professional carpet and upholstery cleaning",
      price: 1500,
      duration: 90,
      category: "Specialized",
      status: "active",
      bookings: 23,
      rating: 4.7,
      requirements: ["Clear access to carpets", "Power outlet"],
      included: ["Steam cleaning", "Stain removal", "Deodorizing"]
    },
    {
      id: 4,
      name: "Window Cleaning",
      description: "Interior and exterior window cleaning service",
      price: 800,
      duration: 60,
      category: "Specialized",
      status: "inactive",
      bookings: 12,
      rating: 4.5,
      requirements: ["Safe access to windows", "Weather permitting"],
      included: ["Interior cleaning", "Exterior cleaning", "Screen cleaning"]
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    requirements: [] as string[],
    included: [] as string[]
  });

  const categories = ["Deep Cleaning", "Commercial", "Residential", "Specialized", "Emergency"];

  const handleAddService = () => {
    const service: Service = {
      id: Date.now(),
      name: newService.name,
      description: newService.description,
      price: parseInt(newService.price),
      duration: parseInt(newService.duration),
      category: newService.category,
      status: "active",
      bookings: 0,
      rating: 0,
      requirements: newService.requirements,
      included: newService.included
    };
    
    setServices(prev => [...prev, service]);
    setNewService({
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "",
      requirements: [],
      included: []
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Service Created",
      description: "New service has been added successfully",
    });
  };

  const handleEditService = () => {
    if (!editingService) return;
    
    setServices(prev => prev.map(service => 
      service.id === editingService.id ? editingService : service
    ));
    setEditingService(null);
    toast({
      title: "Service Updated",
      description: "Service has been updated successfully",
    });
  };

  const handleDeleteService = (serviceId: number) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
    toast({
      title: "Service Deleted",
      description: "Service has been removed",
    });
  };

  const handleToggleStatus = (serviceId: number) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, status: service.status === "active" ? "inactive" : "active" }
        : service
    ));
    toast({
      title: "Status Updated",
      description: "Service status has been changed",
    });
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "default" : "secondary";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Service Management</h1>
          <p className="text-gray-600">Manage your cleaning services and pricing</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new cleaning service for your company
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <Label htmlFor="service-name">Service Name</Label>
                <Input
                  id="service-name"
                  value={newService.name}
                  onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Deep Cleaning"
                />
              </div>
              <div>
                <Label htmlFor="service-description">Description</Label>
                <Textarea
                  id="service-description"
                  value={newService.description}
                  onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your service..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="service-price">Price (KES)</Label>
                  <Input
                    id="service-price"
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="2000"
                  />
                </div>
                <div>
                  <Label htmlFor="service-duration">Duration (minutes)</Label>
                  <Input
                    id="service-duration"
                    type="number"
                    value={newService.duration}
                    onChange={(e) => setNewService(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="120"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="service-category">Category</Label>
                <Select value={newService.category} onValueChange={(value) => 
                  setNewService(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                <Textarea
                  id="requirements"
                  value={newService.requirements.join(', ')}
                  onChange={(e) => setNewService(prev => ({ 
                    ...prev, 
                    requirements: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                  }))}
                  placeholder="Access to property, Water and electricity"
                />
              </div>
              <div>
                <Label htmlFor="included">What's Included (comma-separated)</Label>
                <Textarea
                  id="included"
                  value={newService.included.join(', ')}
                  onChange={(e) => setNewService(prev => ({ 
                    ...prev, 
                    included: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                  }))}
                  placeholder="All cleaning supplies, Equipment, 2 cleaners"
                />
              </div>
            </div>
            <Button onClick={handleAddService} className="w-full">Create Service</Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{services.length}</p>
              <p className="text-sm text-gray-500">Total Services</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{services.filter(s => s.status === 'active').length}</p>
              <p className="text-sm text-gray-500">Active Services</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {services.reduce((sum, s) => sum + s.bookings, 0)}
              </p>
              <p className="text-sm text-gray-500">Total Bookings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                KES {(services.reduce((sum, s) => sum + (s.price * s.bookings), 0) / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-gray-500">Revenue Generated</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Services</CardTitle>
          <CardDescription>Manage and update your cleaning services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="border">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {service.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={service.status === "active"}
                        onCheckedChange={() => handleToggleStatus(service.id)}
                      />
                      <Badge variant={getStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Price</span>
                      </div>
                      <span className="font-semibold">KES {service.price.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Duration</span>
                      </div>
                      <span className="font-semibold">{service.duration} mins</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">Bookings</span>
                      </div>
                      <span className="font-semibold">{service.bookings}</span>
                    </div>

                    {service.rating > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Rating</span>
                        </div>
                        <span className="font-semibold">{service.rating} ⭐</span>
                      </div>
                    )}
                  </div>

                  {service.requirements.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                      <ul className="text-xs text-gray-600 list-disc list-inside">
                        {service.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.included.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">What's Included:</h4>
                      <ul className="text-xs text-gray-600 list-disc list-inside">
                        {service.included.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setEditingService(service)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update your service details
            </DialogDescription>
          </DialogHeader>
          {editingService && (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <Label>Service Name</Label>
                <Input
                  value={editingService.name}
                  onChange={(e) => setEditingService(prev => prev ? { ...prev, name: e.target.value } : null)}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService(prev => prev ? { ...prev, description: e.target.value } : null)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price (KES)</Label>
                  <Input
                    type="number"
                    value={editingService.price}
                    onChange={(e) => setEditingService(prev => prev ? { ...prev, price: parseInt(e.target.value) } : null)}
                  />
                </div>
                <div>
                  <Label>Duration (minutes)</Label>
                  <Input
                    type="number"
                    value={editingService.duration}
                    onChange={(e) => setEditingService(prev => prev ? { ...prev, duration: parseInt(e.target.value) } : null)}
                  />
                </div>
              </div>
              <div>
                <Label>Category</Label>
                <Select 
                  value={editingService.category} 
                  onValueChange={(value) => setEditingService(prev => prev ? { ...prev, category: value } : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleEditService} className="w-full">Update Service</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceManagement;
