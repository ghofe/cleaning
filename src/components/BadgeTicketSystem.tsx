
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, IdCard, CheckCircle, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface TicketVerification {
  id: string;
  ticketCode: string;
  cleanerId: string;
  cleanerName: string;
  studentName: string;
  location: string;
  scheduledTime: string;
  status: 'pending' | 'checked_in' | 'in_progress' | 'completed';
  checkedInAt?: string;
  gateStaff?: string;
}

const BadgeTicketSystem = () => {
  const [tickets, setTickets] = useState<TicketVerification[]>([
    {
      id: '1',
      ticketCode: 'TKT1234',
      cleanerId: 'CLN1234',
      cleanerName: 'Jane Wanjiku',
      studentName: 'Alice Wanjiru',
      location: 'Hostel A, Room 234',
      scheduledTime: '2024-05-16 10:00',
      status: 'pending'
    },
    {
      id: '2',
      ticketCode: 'TKT5678',
      cleanerId: 'CLN5678',
      cleanerName: 'Peter Kimani',
      studentName: 'Brian Otieno',
      location: 'Hostel B, Room 145',
      scheduledTime: '2024-05-16 14:00',
      status: 'checked_in',
      checkedInAt: '2024-05-16 13:55',
      gateStaff: 'Security Guard - James'
    }
  ]);

  const [verificationCode, setVerificationCode] = useState('');
  const { toast } = useToast();

  const handleTicketVerification = () => {
    if (!verificationCode) {
      toast({
        title: "Error",
        description: "Please enter a ticket code",
        variant: "destructive"
      });
      return;
    }

    const ticket = tickets.find(t => t.ticketCode === verificationCode);
    
    if (!ticket) {
      toast({
        title: "Invalid Ticket",
        description: "Ticket code not found",
        variant: "destructive"
      });
      return;
    }

    if (ticket.status !== 'pending') {
      toast({
        title: "Already Processed",
        description: `This ticket has already been ${ticket.status}`,
        variant: "destructive"
      });
      return;
    }

    setTickets(prev => 
      prev.map(t => 
        t.ticketCode === verificationCode 
          ? { 
              ...t, 
              status: 'checked_in' as const, 
              checkedInAt: new Date().toLocaleString(),
              gateStaff: 'Current User'
            }
          : t
      )
    );

    toast({
      title: "Check-in Successful",
      description: `${ticket.cleanerName} checked in for ${ticket.location}`
    });

    setVerificationCode('');
  };

  const updateTicketStatus = (id: string, status: TicketVerification['status']) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === id ? { ...ticket, status } : ticket
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Ticket status updated to ${status}`
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'checked_in':
        return <Badge variant="outline"><CheckCircle className="h-3 w-3 mr-1" />Checked In</Badge>;
      case 'in_progress':
        return <Badge variant="default"><Clock className="h-3 w-3 mr-1" />In Progress</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Ticket Verification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <QrCode className="h-5 w-5 mr-2" />
            Ticket Verification
          </CardTitle>
          <CardDescription>
            Verify cleaner badges and ticket codes at gate check-in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="ticketCode">Ticket Code or Cleaner Badge</Label>
              <Input
                id="ticketCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                placeholder="Enter TKT1234 or scan QR code"
                className="font-mono"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleTicketVerification}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Verify & Check In
              </Button>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Gate Staff Instructions:</h4>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Ask cleaner to show their Campus Clean badge (CLN ID)</li>
              <li>Check the ticket code on student's phone or booking confirmation</li>
              <li>Enter ticket code above and click "Verify & Check In"</li>
              <li>Confirm cleaner identity matches the badge photo</li>
              <li>Allow entry once verification is successful</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Active Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <IdCard className="h-5 w-5 mr-2" />
            Today's Active Tickets
          </CardTitle>
          <CardDescription>
            Current bookings requiring gate verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">
                      Ticket: {ticket.ticketCode}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-center">
                        <IdCard className="h-3 w-3 mr-1" />
                        Cleaner: {ticket.cleanerName} ({ticket.cleanerId})
                      </p>
                      <p>Student: {ticket.studentName}</p>
                      <p className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {ticket.location}
                      </p>
                      <p className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Scheduled: {ticket.scheduledTime}
                      </p>
                      {ticket.checkedInAt && (
                        <p className="text-green-600">
                          Checked in: {ticket.checkedInAt} by {ticket.gateStaff}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {getStatusBadge(ticket.status)}
                    
                    {ticket.status === 'checked_in' && (
                      <Button
                        size="sm"
                        onClick={() => updateTicketStatus(ticket.id, 'in_progress')}
                      >
                        Start Work
                      </Button>
                    )}
                    
                    {ticket.status === 'in_progress' && (
                      <Button
                        size="sm"
                        onClick={() => updateTicketStatus(ticket.id, 'completed')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* QR Code Placeholder */}
                <div className="mt-3 p-3 border-2 border-dashed border-gray-300 rounded text-center">
                  <QrCode className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    QR Code: {ticket.ticketCode}
                  </p>
                  <p className="text-xs text-gray-400">
                    Scannable badge for quick verification
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BadgeTicketSystem;
