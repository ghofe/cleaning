
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Plus, Phone, Mail, Star, Calendar } from "lucide-react";

const TeamManagement = () => {
  const [teamMembers] = useState([
    {
      id: 1,
      name: "Mary Achieng",
      email: "mary.achieng@gmail.com",
      phone: "+254 701 234 567",
      role: "Assistant Cleaner",
      status: "active",
      rating: 4.7,
      joinDate: "2024-01-15",
      completedJobs: 45,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Peter Kimani",
      email: "peter.kimani@gmail.com", 
      phone: "+254 702 345 678",
      role: "Assistant Cleaner",
      status: "active",
      rating: 4.5,
      joinDate: "2024-03-20",
      completedJobs: 28,
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Grace Njeri",
      email: "grace.njeri@gmail.com",
      phone: "+254 703 456 789", 
      role: "Trainee",
      status: "training",
      rating: 4.2,
      joinDate: "2024-05-10",
      completedJobs: 8,
      avatar: "/placeholder.svg"
    }
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "training": return "secondary";
      case "inactive": return "outline";
      default: return "secondary";
    }
  };

  const handleInvite = () => {
    console.log("Inviting:", { name: inviteName, email: inviteEmail });
    setInviteEmail("");
    setInviteName("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-gray-600">Manage your cleaning team members</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your cleaning team
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              <Button onClick={handleInvite} className="w-full">
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Members</p>
                <p className="text-2xl font-bold">{teamMembers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Rating</p>
                <p className="text-2xl font-bold">
                  {(teamMembers.reduce((acc, member) => acc + member.rating, 0) / teamMembers.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Members</p>
                <p className="text-2xl font-bold">
                  {teamMembers.filter(m => m.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Jobs</p>
                <p className="text-2xl font-bold">
                  {teamMembers.reduce((acc, member) => acc + member.completedJobs, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Team Members</h2>
        
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-3 w-3 mr-1" />
                        {member.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-3 w-3 mr-1" />
                        {member.phone}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{member.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500">{member.completedJobs} jobs</p>
                    <p className="text-xs text-gray-400">Joined {member.joinDate}</p>
                  </div>
                  
                  <Badge variant={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                  
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance This Month</CardTitle>
          <CardDescription>Overall statistics for your cleaning team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">156</p>
              <p className="text-sm text-gray-500">Jobs Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">KES 124,800</p>
              <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">98%</p>
              <p className="text-sm text-gray-500">Customer Satisfaction</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamManagement;
