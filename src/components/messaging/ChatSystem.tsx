
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Phone, Video, MoreVertical } from "lucide-react";

interface ChatSystemProps {
  bookingId: string;
  userType: "student" | "cleaner";
  recipientName: string;
  recipientAvatar?: string;
}

const ChatSystem = ({ bookingId, userType, recipientName, recipientAvatar }: ChatSystemProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: userType === "student" ? "cleaner" : "student",
      content: "Hi! I'm on my way to your location.",
      timestamp: "10:30 AM",
      isRead: true
    },
    {
      id: 2,
      sender: userType,
      content: "Great! I'll be waiting.",
      timestamp: "10:31 AM",
      isRead: true
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: userType,
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={recipientAvatar} />
            <AvatarFallback>{recipientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{recipientName}</h3>
            <Badge variant="outline" className="text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              Online
            </Badge>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Phone className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline">
            <Video className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-y-auto">
        <div className="p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === userType ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-3 py-2 rounded-lg ${
                msg.sender === userType 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatSystem;
