
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, X, Check, Clock, AlertTriangle } from "lucide-react";

interface Notification {
  id: string;
  type: "booking" | "payment" | "review" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "high" | "medium" | "low";
}

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "booking",
      title: "New Booking Request",
      message: "You have a new cleaning request for tomorrow at 2:00 PM",
      timestamp: "5 minutes ago",
      read: false,
      priority: "high"
    },
    {
      id: "2",
      type: "payment",
      title: "Payment Received",
      message: "KES 800 has been added to your account",
      timestamp: "1 hour ago",
      read: false,
      priority: "medium"
    },
    {
      id: "3",
      type: "review",
      title: "New Review",
      message: "Sarah M. left you a 5-star review",
      timestamp: "2 hours ago",
      read: true,
      priority: "low"
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking": return Clock;
      case "payment": return Check;
      case "review": return Check;
      case "system": return AlertTriangle;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-500 bg-red-50";
      case "medium": return "border-yellow-500 bg-yellow-50";
      case "low": return "border-green-500 bg-green-50";
      default: return "border-gray-200";
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {showNotifications && (
        <Card className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto z-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <CardTitle className="text-lg">Notifications</CardTitle>
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <Button size="sm" variant="ghost" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={() => setShowNotifications(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {notifications.length > 0 ? (
              <div className="space-y-1">
                {notifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border-l-4 hover:bg-gray-50 cursor-pointer ${
                        getPriorityColor(notification.priority)
                      } ${!notification.read ? 'bg-blue-50' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex space-x-3 flex-1">
                          <IconComponent className="h-5 w-5 mt-0.5 text-gray-600" />
                          <div className="flex-1">
                            <p className={`font-medium ${!notification.read ? 'text-blue-900' : 'text-gray-900'}`}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationSystem;
