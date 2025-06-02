
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Wifi, WifiOff, Circle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RealTimeEvent {
  id: string;
  type: 'booking_update' | 'message' | 'payment' | 'location_update';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'high' | 'medium' | 'low';
}

const RealTimeUpdates = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState<RealTimeEvent[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate WebSocket connection
    const connectWebSocket = () => {
      setIsConnected(true);
      toast({
        title: "Connected",
        description: "Real-time updates are now active"
      });

      // Simulate receiving real-time events
      const interval = setInterval(() => {
        const mockEvents: RealTimeEvent[] = [
          {
            id: Date.now().toString(),
            type: 'booking_update',
            title: 'Booking Status Update',
            message: 'Your cleaner is on the way',
            timestamp: new Date(),
            priority: 'high'
          },
          {
            id: (Date.now() + 1).toString(),
            type: 'message',
            title: 'New Message',
            message: 'You have a new message from Jane',
            timestamp: new Date(),
            priority: 'medium'
          }
        ];

        setEvents(prev => [...mockEvents, ...prev].slice(0, 10));
      }, 30000); // Every 30 seconds

      return () => clearInterval(interval);
    };

    const cleanup = connectWebSocket();
    return cleanup;
  }, [toast]);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'booking_update': return 'bg-blue-500';
      case 'message': return 'bg-green-500';
      case 'payment': return 'bg-purple-500';
      case 'location_update': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Real-Time Updates</span>
          </div>
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <>
                <Wifi className="h-4 w-4 text-green-600" />
                <Badge variant="outline" className="text-green-600">Connected</Badge>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-red-600" />
                <Badge variant="outline" className="text-red-600">Disconnected</Badge>
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                <div className={`w-3 h-3 rounded-full ${getEventColor(event.type)} mt-2`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{event.title}</h4>
                    <span className={`text-xs font-medium ${getPriorityColor(event.priority)}`}>
                      {event.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{event.message}</p>
                  <p className="text-xs text-gray-400">
                    {event.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Circle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No recent updates</p>
              <p className="text-sm">You'll see real-time notifications here</p>
            </div>
          )}
        </div>
        
        {!isConnected && (
          <Button 
            onClick={() => window.location.reload()} 
            className="w-full mt-4"
            variant="outline"
          >
            Reconnect
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeUpdates;
