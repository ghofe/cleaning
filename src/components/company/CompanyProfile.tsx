
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CompanyProfile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Profile</h1>
        <p className="text-gray-600">Manage your company information and settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Update your business details and verification documents</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Company profile management coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyProfile;
