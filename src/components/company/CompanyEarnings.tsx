
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CompanyEarnings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Earnings</h1>
        <p className="text-gray-600">Track your company's financial performance</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Dashboard</CardTitle>
          <CardDescription>Revenue tracking and payout management</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Company earnings dashboard coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyEarnings;
