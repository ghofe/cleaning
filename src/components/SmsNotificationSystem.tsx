
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MessageSquare, Send, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SmsMessage {
  id: string;
  cleanerId: string;
  cleanerName: string;
  message: string;
  type: 'job_request' | 'notification' | 'reminder';
  status: 'sent' | 'delivered' | 'responded' | 'failed';
  sentAt: string;
  response?: string;
}

const SmsNotificationSystem = () => {
  const [smsMessages, setSmsMessages] = useState<SmsMessage[]>([]);

  const [newMessage, setNewMessage] = useState({
    cleanerId: '',
    message: '',
    type: 'notification' as const
  });

  const { toast } = useToast();

  const sendSmsMessage = () => {
    if (!newMessage.cleanerId || !newMessage.message) {
      toast({
        title: "Error",
        description: "Please fill in both Cleaner ID and message",
        variant: "destructive"
      });
      return;
    }

    const message: SmsMessage = {
      id: Date.now().toString(),
      cleanerId: newMessage.cleanerId,
      cleanerName: 'Unknown Cleaner',
      message: newMessage.message,
      type: newMessage.type,
      status: 'sent',
      sentAt: new Date().toLocaleString()
    };

    setSmsMessages(prev => [message, ...prev]);
    setNewMessage({ cleanerId: '', message: '', type: 'notification' });
    
    toast({
      title: "SMS Sent",
      description: `Message sent to cleaner ${newMessage.cleanerId}`
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'responded': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <CheckCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Send New SMS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Send className="h-5 w-5 mr-2" />
            Send SMS to Cleaner
          </CardTitle>
          <CardDescription>
            Send job notifications, reminders, or updates via SMS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cleanerId">Cleaner ID</Label>
              <Input
                id="cleanerId"
                placeholder="e.g., CLN1234"
                value={newMessage.cleanerId}
                onChange={(e) => setNewMessage(prev => ({ ...prev, cleanerId: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="messageType">Message Type</Label>
              <select
                id="messageType"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newMessage.type}
                onChange={(e) => setNewMessage(prev => ({ ...prev, type: e.target.value as any }))}
              >
                <option value="notification">General Notification</option>
                <option value="job_request">Job Request</option>
                <option value="reminder">Reminder</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your SMS message..."
              value={newMessage.message}
              onChange={(e) => setNewMessage(prev => ({ ...prev, message: e.target.value }))}
              rows={3}
            />
          </div>
          <Button onClick={sendSmsMessage} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Send SMS
          </Button>
        </CardContent>
      </Card>

      {/* SMS History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            SMS History
          </CardTitle>
          <CardDescription>
            Recent SMS messages sent to cleaners
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {smsMessages.map((sms) => (
              <div key={sms.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{sms.cleanerName} ({sms.cleanerId})</p>
                    <p className="text-sm text-gray-500">{sms.sentAt}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={sms.type === 'job_request' ? 'default' : 'secondary'}>
                      {sms.type.replace('_', ' ')}
                    </Badge>
                    {getStatusIcon(sms.status)}
                  </div>
                </div>
                <p className="text-sm bg-gray-50 p-2 rounded">{sms.message}</p>
                {sms.response && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Response:</p>
                    <p className="text-sm bg-green-50 p-2 rounded text-green-800">{sms.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmsNotificationSystem;
