
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const PendingApplications = () => {
  const pendingApplications = [
    {
      id: 1,
      name: "David Mutua",
      experience: "2 years",
      rating: "4.6",
      location: "Nairobi",
      appliedDate: "2 days ago"
    },
    {
      id: 2,
      name: "Grace Njeri",
      experience: "3 years",
      rating: "4.8",
      location: "Kiambu",
      appliedDate: "1 day ago"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Cleaner Applications</CardTitle>
        <CardDescription>New cleaners waiting for approval</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingApplications.map((application) => (
            <div key={application.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold">{application.name}</p>
                  <p className="text-sm text-gray-500">{application.experience} experience</p>
                  <p className="text-sm text-gray-500">{application.location}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm">{application.rating}</span>
                  </div>
                  <p className="text-xs text-gray-400">{application.appliedDate}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">Reject</Button>
                <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">Approve</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingApplications;
