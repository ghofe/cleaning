
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Clock, Star, MapPin, Phone, Mail, FileText } from "lucide-react";

const CleanerApplications = () => {
  const [applications] = useState([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "secondary";
      case "approved": return "default";
      case "rejected": return "destructive";
      default: return "outline";
    }
  };

  const pendingApplications = applications.filter(a => a.status === "pending");
  const approvedApplications = applications.filter(a => a.status === "approved");
  const rejectedApplications = applications.filter(a => a.status === "rejected");

  const ApplicationCard = ({ application }: { application: typeof applications[0] }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={application.avatar} />
              <AvatarFallback>{application.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{application.name}</h3>
              <p className="text-sm text-gray-500">{application.experience} experience</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm">{application.previousRating}</span>
              </div>
            </div>
          </div>
          <Badge variant={getStatusColor(application.status)}>
            {application.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-2" />
              {application.email}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-2" />
              {application.phone}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              {application.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              Applied {application.appliedDate}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">Services Offered:</p>
            <div className="flex flex-wrap gap-1">
              {application.services.map((service) => (
                <Badge key={service} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>
            
            <p className="text-sm font-medium mt-3 mb-2">Documents:</p>
            <div className="flex flex-wrap gap-1">
              {application.documents.map((doc) => (
                <Badge key={doc} variant="secondary" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" />
                  {doc}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium mb-1">Bio:</p>
          <p className="text-sm text-gray-600">{application.bio}</p>
        </div>

        {application.status === "pending" && (
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  View Full Application
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Cleaner Application - {application.name}</DialogTitle>
                  <DialogDescription>
                    Review the complete application details
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Personal Information</p>
                      <p>Name: {application.name}</p>
                      <p>Email: {application.email}</p>
                      <p>Phone: {application.phone}</p>
                      <p>Location: {application.location}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Professional Details</p>
                      <p>Experience: {application.experience}</p>
                      <p>Previous Rating: {application.previousRating}</p>
                      <p>Applied: {application.appliedDate}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">Services</p>
                    <p>{application.services.join(", ")}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Documents Submitted</p>
                    <p>{application.documents.join(", ")}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Bio</p>
                    <p>{application.bio}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="flex-1">
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </div>
        )}

        {application.status === "approved" && (
          <div className="flex justify-center">
            <Badge variant="default" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Approved - Active Cleaner
            </Badge>
          </div>
        )}

        {application.status === "rejected" && (
          <div className="flex justify-center">
            <Badge variant="destructive">
              <XCircle className="h-3 w-3 mr-1" />
              Application Rejected
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cleaner Applications</h1>
        <p className="text-gray-600">Review and manage cleaner applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{applications.length}</p>
              <p className="text-sm text-gray-500">Total Applications</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{pendingApplications.length}</p>
              <p className="text-sm text-gray-500">Pending Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{approvedApplications.length}</p>
              <p className="text-sm text-gray-500">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{rejectedApplications.length}</p>
              <p className="text-sm text-gray-500">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingApplications.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedApplications.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingApplications.length > 0 ? (
            pendingApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No pending applications</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedApplications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedApplications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CleanerApplications;
