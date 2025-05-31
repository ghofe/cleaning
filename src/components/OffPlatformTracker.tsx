import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, Flag, Shield, Ban } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface OffPlatformIncident {
  id: string;
  cleanerId: string;
  cleanerName: string;
  studentName: string;
  incidentType: 'direct_contact_request' | 'bypassed_platform' | 'no_show' | 'other';
  description: string;
  reportedAt: string;
  status: 'open' | 'investigating' | 'resolved' | 'action_taken';
  severity: 'low' | 'medium' | 'high';
}

const OffPlatformTracker = () => {
  const [incidents, setIncidents] = useState<OffPlatformIncident[]>([
    {
      id: '1',
      cleanerId: 'CLN1234',
      cleanerName: 'Jane Wanjiku',
      studentName: 'Alice Wanjiru',
      incidentType: 'direct_contact_request',
      description: 'Cleaner asked student to contact her directly via WhatsApp for future bookings to avoid platform fees',
      reportedAt: '2024-05-16 14:30',
      status: 'investigating',
      severity: 'high'
    },
    {
      id: '2',
      cleanerId: 'CLN5678',
      cleanerName: 'Peter Kimani',
      studentName: 'Brian Otieno',
      incidentType: 'no_show',
      description: 'Cleaner did not show up for scheduled appointment and was unreachable via platform',
      reportedAt: '2024-05-16 10:15',
      status: 'resolved',
      severity: 'medium'
    }
  ]);

  const [newIncident, setNewIncident] = useState({
    cleanerId: '',
    cleanerName: '',
    studentName: '',
    incidentType: 'other' as OffPlatformIncident['incidentType'],
    description: ''
  });

  const { toast } = useToast();

  const addIncident = () => {
    if (!newIncident.cleanerId || !newIncident.description) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    // Determine severity based on incident type
    const severity: OffPlatformIncident['severity'] = 
      newIncident.incidentType === 'direct_contact_request' ? 'high' : 'medium';

    const incident: OffPlatformIncident = {
      id: Date.now().toString(),
      cleanerId: newIncident.cleanerId,
      cleanerName: newIncident.cleanerName || 'Unknown',
      studentName: newIncident.studentName || 'Anonymous',
      incidentType: newIncident.incidentType,
      description: newIncident.description,
      reportedAt: new Date().toLocaleString(),
      status: 'open',
      severity
    };

    setIncidents(prev => [incident, ...prev]);
    setNewIncident({
      cleanerId: '',
      cleanerName: '',
      studentName: '',
      incidentType: 'other',
      description: ''
    });

    toast({
      title: "Incident Reported",
      description: "Off-platform incident has been logged for investigation"
    });
  };

  const updateStatus = (id: string, status: OffPlatformIncident['status']) => {
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === id ? { ...incident, status } : incident
      )
    );
  };

  const suspendCleaner = (cleanerId: string) => {
    toast({
      title: "Cleaner Suspended",
      description: `Cleaner ${cleanerId} has been temporarily suspended pending investigation`,
      variant: "destructive"
    });
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      case 'medium':
        return <Badge variant="outline">Medium</Badge>;
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="destructive">Open</Badge>;
      case 'investigating':
        return <Badge variant="secondary">Investigating</Badge>;
      case 'resolved':
        return <Badge variant="default">Resolved</Badge>;
      case 'action_taken':
        return <Badge variant="outline">Action Taken</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Report New Incident */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Flag className="h-5 w-5 mr-2" />
            Report Off-Platform Incident
          </CardTitle>
          <CardDescription>
            Log incidents where cleaners attempt to bypass the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cleanerId">Cleaner ID *</Label>
              <Input
                id="cleanerId"
                value={newIncident.cleanerId}
                onChange={(e) => setNewIncident(prev => ({ ...prev, cleanerId: e.target.value }))}
                placeholder="e.g., CLN1234"
              />
            </div>
            <div>
              <Label htmlFor="cleanerName">Cleaner Name</Label>
              <Input
                id="cleanerName"
                value={newIncident.cleanerName}
                onChange={(e) => setNewIncident(prev => ({ ...prev, cleanerName: e.target.value }))}
                placeholder="Cleaner's name"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                value={newIncident.studentName}
                onChange={(e) => setNewIncident(prev => ({ ...prev, studentName: e.target.value }))}
                placeholder="Reporting student's name"
              />
            </div>
            <div>
              <Label htmlFor="incidentType">Incident Type</Label>
              <select
                id="incidentType"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newIncident.incidentType}
                onChange={(e) => setNewIncident(prev => ({ ...prev, incidentType: e.target.value as OffPlatformIncident['incidentType'] }))}
              >
                <option value="direct_contact_request">Direct Contact Request</option>
                <option value="bypassed_platform">Bypassed Platform</option>
                <option value="no_show">No Show</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={newIncident.description}
              onChange={(e) => setNewIncident(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what happened..."
              rows={3}
            />
          </div>
          <Button onClick={addIncident} className="w-full">
            <Flag className="h-4 w-4 mr-2" />
            Report Incident
          </Button>
        </CardContent>
      </Card>

      {/* Incidents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Off-Platform Incidents
          </CardTitle>
          <CardDescription>
            Track and manage platform violation incidents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div key={incident.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">
                      {incident.cleanerName} ({incident.cleanerId})
                    </h3>
                    <p className="text-sm text-gray-600">
                      Reported by: {incident.studentName} • {incident.reportedAt}
                    </p>
                    <p className="text-sm font-medium text-red-600 mt-1">
                      {incident.incidentType.replace(/_/g, ' ').toUpperCase()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex space-x-2">
                      {getSeverityBadge(incident.severity)}
                      {getStatusBadge(incident.status)}
                    </div>
                    {incident.status === 'open' && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(incident.id, 'investigating')}
                        >
                          Investigate
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => suspendCleaner(incident.cleanerId)}
                        >
                          <Ban className="h-3 w-3 mr-1" />
                          Suspend
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <strong>Description:</strong> {incident.description}
                </div>
                
                {incident.status === 'investigating' && (
                  <div className="mt-3 flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(incident.id, 'resolved')}
                    >
                      Mark Resolved
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateStatus(incident.id, 'action_taken')}
                    >
                      Action Taken
                    </Button>
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

export default OffPlatformTracker;
