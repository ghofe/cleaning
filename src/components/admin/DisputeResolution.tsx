
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Clock, CheckCircle, MessageSquare, FileText } from "lucide-react";

const DisputeResolution = () => {
  const [disputes] = useState([
    {
      id: "DSP-001",
      type: "Service Quality",
      status: "open",
      priority: "high",
      student: {
        name: "Sarah Mwangi",
        avatar: "/placeholder.svg"
      },
      cleaner: {
        name: "Jane Wanjiku",
        avatar: "/placeholder.svg"
      },
      booking: {
        id: "BK-12345",
        service: "Room Cleaning",
        date: "2024-06-01",
        amount: "KES 800"
      },
      description: "The cleaner did not clean the bathroom as requested and left early without completing the full service.",
      createdAt: "2024-06-02 10:30 AM",
      lastUpdate: "2024-06-02 2:15 PM",
      messages: [
        {
          id: 1,
          sender: "student",
          message: "The service was incomplete and the cleaner left early.",
          timestamp: "10:30 AM"
        },
        {
          id: 2,
          sender: "cleaner",
          message: "I completed all requested tasks within the agreed timeframe.",
          timestamp: "11:45 AM"
        }
      ]
    },
    {
      id: "DSP-002",
      type: "Payment Issue",
      status: "investigating",
      priority: "medium",
      student: {
        name: "John Ochieng",
        avatar: "/placeholder.svg"
      },
      cleaner: {
        name: "Peter Kimani",
        avatar: "/placeholder.svg"
      },
      booking: {
        id: "BK-12346",
        service: "Full Service",
        date: "2024-05-30",
        amount: "KES 1,500"
      },
      description: "Payment was deducted but service was not provided due to cleaner no-show.",
      createdAt: "2024-05-31 9:15 AM",
      lastUpdate: "2024-06-01 4:20 PM",
      messages: []
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "destructive";
      case "investigating": return "secondary";
      case "resolved": return "outline";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const openDisputes = disputes.filter(d => d.status === "open");
  const investigatingDisputes = disputes.filter(d => d.status === "investigating");
  const resolvedDisputes = disputes.filter(d => d.status === "resolved");

  const DisputeCard = ({ dispute }: { dispute: typeof disputes[0] }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold">{dispute.id}</h3>
              <Badge variant={getStatusColor(dispute.status)}>{dispute.status}</Badge>
              <span className={`text-sm font-medium ${getPriorityColor(dispute.priority)}`}>
                {dispute.priority} priority
              </span>
            </div>
            <p className="text-sm text-gray-600">{dispute.type}</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>Created: {dispute.createdAt}</p>
            <p>Updated: {dispute.lastUpdate}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm">{dispute.description}</p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={dispute.student.avatar} />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{dispute.student.name}</span>
            </div>
            <span className="text-gray-400">vs</span>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={dispute.cleaner.avatar} />
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{dispute.cleaner.name}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded mb-4">
          <p className="text-sm"><strong>Booking:</strong> {dispute.booking.id}</p>
          <p className="text-sm"><strong>Service:</strong> {dispute.booking.service}</p>
          <p className="text-sm"><strong>Date:</strong> {dispute.booking.date}</p>
          <p className="text-sm"><strong>Amount:</strong> {dispute.booking.amount}</p>
        </div>

        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            View Messages ({dispute.messages.length})
          </Button>
          <Button size="sm" variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button size="sm">Resolve</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dispute Resolution</h1>
        <p className="text-gray-600">Manage and resolve customer disputes</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{openDisputes.length}</p>
                <p className="text-sm text-gray-600">Open Disputes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{investigatingDisputes.length}</p>
                <p className="text-sm text-gray-600">Investigating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{resolvedDisputes.length}</p>
                <p className="text-sm text-gray-600">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">2.5 days</p>
                <p className="text-sm text-gray-600">Avg Resolution Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disputes by Status */}
      <Tabs defaultValue="open" className="space-y-6">
        <TabsList>
          <TabsTrigger value="open">Open Disputes ({openDisputes.length})</TabsTrigger>
          <TabsTrigger value="investigating">Investigating ({investigatingDisputes.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedDisputes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="space-y-4">
          {openDisputes.map(dispute => (
            <DisputeCard key={dispute.id} dispute={dispute} />
          ))}
        </TabsContent>

        <TabsContent value="investigating" className="space-y-4">
          {investigatingDisputes.map(dispute => (
            <DisputeCard key={dispute.id} dispute={dispute} />
          ))}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          {resolvedDisputes.length > 0 ? (
            resolvedDisputes.map(dispute => (
              <DisputeCard key={dispute.id} dispute={dispute} />
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No resolved disputes yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DisputeResolution;
