
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Calendar, Download, CreditCard } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const Earnings = () => {
  const [earnings] = useState({
    totalEarned: 45000,
    thisMonth: 8200,
    pending: 1200,
    available: 6800
  });

  const monthlyData = [
    { month: 'Jan', earnings: 3200, commission: 480 },
    { month: 'Feb', earnings: 4100, commission: 615 },
    { month: 'Mar', earnings: 3800, commission: 570 },
    { month: 'Apr', earnings: 5200, commission: 780 },
    { month: 'May', earnings: 4800, commission: 720 },
    { month: 'Jun', earnings: 8200, commission: 1230 }
  ];

  const recentPayouts = [
    {
      id: 1,
      amount: 3400,
      commission: 600,
      date: "2024-05-28",
      status: "completed",
      jobs: 4,
      method: "M-Pesa"
    },
    {
      id: 2,
      amount: 2800,
      commission: 520,
      date: "2024-05-21",
      status: "completed", 
      jobs: 3,
      method: "Bank Transfer"
    },
    {
      id: 3,
      amount: 1200,
      commission: 180,
      date: "2024-06-02",
      status: "pending",
      jobs: 1,
      method: "M-Pesa"
    }
  ];

  const pendingJobs = [
    {
      id: 1,
      service: "Room Cleaning",
      student: "Sarah Mwangi",
      amount: 800,
      commission: 120,
      date: "2024-06-02",
      status: "completed_pending_payment"
    },
    {
      id: 2,
      service: "Kitchen Clean",
      student: "John Doe",
      amount: 400,
      commission: 60,
      date: "2024-06-01",
      status: "completed_pending_payment"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Earnings Dashboard</h1>
        <p className="text-gray-600">Track your income and payment history</p>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Earned</p>
                <p className="text-2xl font-bold">KES {earnings.totalEarned.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-2xl font-bold">KES {earnings.thisMonth.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-bold">KES {earnings.pending.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Available</p>
                <p className="text-2xl font-bold">KES {earnings.available.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="pending">Pending Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Monthly Earnings Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Earnings</CardTitle>
              <CardDescription>Your earnings trend over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`KES ${value}`, 'Earnings']} />
                  <Bar dataKey="earnings" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Request Payout
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Statement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Payment History</h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {recentPayouts.map((payout) => (
            <Card key={payout.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">KES {payout.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Commission: KES {payout.commission}</p>
                    <p className="text-sm text-gray-500">{payout.jobs} jobs completed</p>
                    <p className="text-sm text-gray-500">{payout.method}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={payout.status === 'completed' ? 'default' : 'secondary'}>
                      {payout.status}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">{payout.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Jobs Awaiting Payment Release</h3>
            <p className="text-sm text-gray-500">These jobs are completed but payment is in escrow</p>
          </div>

          {pendingJobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{job.service}</p>
                    <p className="text-sm text-gray-500">Student: {job.student}</p>
                    <p className="text-sm text-gray-500">Completed: {job.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">KES {job.amount}</p>
                    <p className="text-sm text-gray-500">Your share: KES {job.amount - job.commission}</p>
                    <Badge variant="secondary">Escrow</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Earnings;
