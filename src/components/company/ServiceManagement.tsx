
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Clock, DollarSign } from "lucide-react";

const ServiceManagement = () => {
  const [services] = useState([
    {
      id: 1,
      name: "Deep Cleaning Service",
      description: "Comprehensive deep cleaning for residential and commercial spaces",
      price: 2500,
      duration: 180,
      category: "Deep Cleaning",
      status: "active",
      bookings: 45
    },
    {
      id: 2,
      name: "Office Cleaning",
      description: "Daily office cleaning and maintenance",
      price: 1800,
      duration: 120,
      category: "Commercial",
      status: "active",
      bookings: 67
    },
    {
      id: 3,
      name: "Carpet Cleaning",
      description: "Professional carpet and upholstery cleaning",
      price: 1500,
      duration: 90,
      category: "Specialized",
      status: "active",
      bookings: 23
    },
    {
      id: 4,
      name: "Window Cleaning",
      description: "Interior and exterior window cleaning service",
      price: 800,
      duration: 60,
      category: "Specialized",
      status: "inactive",
      bookings: 12
    }
  ]);

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: ""
  });

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
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Create a new cleaning service for your company
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
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
                    <SelectItem value="Deep Cleaning">Deep Cleaning</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Specialized">Specialized</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Create Service</Button>
            </div>
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
                    <Badge variant={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
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
                      <span className="text-sm">Total Bookings</span>
                      <span className="font-semibold">{service.bookings}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceManagement;
