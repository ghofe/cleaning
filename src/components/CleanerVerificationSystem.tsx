
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserCheck, Upload, CheckCircle, XCircle, Clock, Phone, IdCard } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PendingCleaner {
  id: string;
  name: string;
  phoneNumber: string;
  idNumber: string;
  photoUrl?: string;
  idPhotoUrl?: string;
  submittedAt: string;
  submittedBy: string; // cafe name or location
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

const CleanerVerificationSystem = () => {
  const [pendingCleaners, setPendingCleaners] = useState<PendingCleaner[]>([]);

  const [newCleaner, setNewCleaner] = useState({
    name: '',
    phoneNumber: '',
    idNumber: '',
    submittedBy: '',
    notes: ''
  });

  const { toast } = useToast();

  const handleApprove = (id: string) => {
    setPendingCleaners(prev => 
      prev.map(cleaner => 
        cleaner.id === id 
          ? { ...cleaner, status: 'approved' as const }
          : cleaner
      )
    );
    
    toast({
      title: "Cleaner Approved",
      description: "Cleaner has been approved and SMS notification sent with their ID"
    });
  };

  const handleReject = (id: string) => {
    setPendingCleaners(prev => 
      prev.map(cleaner => 
        cleaner.id === id 
          ? { ...cleaner, status: 'rejected' as const }
          : cleaner
      )
    );
    
    toast({
      title: "Cleaner Rejected",
      description: "Application has been rejected",
      variant: "destructive"
    });
  };

  const addManualCleaner = () => {
    if (!newCleaner.name || !newCleaner.phoneNumber || !newCleaner.idNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const cleaner: PendingCleaner = {
      id: Date.now().toString(),
      name: newCleaner.name,
      phoneNumber: newCleaner.phoneNumber,
      idNumber: newCleaner.idNumber,
      submittedAt: new Date().toLocaleString(),
      submittedBy: newCleaner.submittedBy || 'Manual Entry',
      status: 'pending',
      notes: newCleaner.notes
    };

    setPendingCleaners(prev => [cleaner, ...prev]);
    setNewCleaner({ name: '', phoneNumber: '', idNumber: '', submittedBy: '', notes: '' });
    
    toast({
      title: "Cleaner Added",
      description: "New cleaner application added for review"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Manual Registration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserCheck className="h-5 w-5 mr-2" />
            Manual Cleaner Registration
          </CardTitle>
          <CardDescription>
            Register cleaners who visited computer cafés for onboarding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={newCleaner.name}
                onChange={(e) => setNewCleaner(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter cleaner's full name"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                value={newCleaner.phoneNumber}
                onChange={(e) => setNewCleaner(prev => ({ ...prev, phoneNumber: e.target.value }))}
                placeholder="+254712345678"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="idNumber">ID Number *</Label>
              <Input
                id="idNumber"
                value={newCleaner.idNumber}
                onChange={(e) => setNewCleaner(prev => ({ ...prev, idNumber: e.target.value }))}
                placeholder="National ID number"
              />
            </div>
            <div>
              <Label htmlFor="submittedBy">Submitted By (Café/Location)</Label>
              <Input
                id="submittedBy"
                value={newCleaner.submittedBy}
                onChange={(e) => setNewCleaner(prev => ({ ...prev, submittedBy: e.target.value }))}
                placeholder="e.g., Computer Café - USIU Gate"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={newCleaner.notes}
              onChange={(e) => setNewCleaner(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional information..."
              rows={2}
            />
          </div>
          <Button onClick={addManualCleaner} className="w-full">
            <UserCheck className="h-4 w-4 mr-2" />
            Add Cleaner Application
          </Button>
        </CardContent>
      </Card>

      {/* Pending Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Cleaner Applications</CardTitle>
          <CardDescription>
            Review and approve or reject cleaner applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingCleaners.map((cleaner) => (
              <div key={cleaner.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{cleaner.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {cleaner.phoneNumber}
                      </p>
                      <p className="flex items-center">
                        <IdCard className="h-3 w-3 mr-1" />
                        ID: {cleaner.idNumber}
                      </p>
                      <p>Submitted: {cleaner.submittedAt}</p>
                      <p>Location: {cleaner.submittedBy}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {getStatusBadge(cleaner.status)}
                    {cleaner.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleReject(cleaner.id)}
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleApprove(cleaner.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Photo Upload Placeholders */}
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Cleaner Photo</p>
                    <p className="text-xs text-gray-400">Upload from café</p>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">ID Photo</p>
                    <p className="text-xs text-gray-400">Upload from café</p>
                  </div>
                </div>
                
                {cleaner.notes && (
                  <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                    <strong>Notes:</strong> {cleaner.notes}
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

export default CleanerVerificationSystem;
