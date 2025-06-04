
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, Eye, CreditCard } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface EarningsData {
  date: string;
  revenue: number;
  bookings: number;
  commission: number;
  net: number;
}

interface PayoutRecord {
  id: number;
  date: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "failed";
  method: string;
  reference: string;
}

const CompanyEarnings = () => {
  const [timeframe, setTimeframe] = useState("month");
  
  const earningsData: EarningsData[] = [
    { date: "2024-12-01", revenue: 15000, bookings: 12, commission: 2250, net: 12750 },
    { date: "2024-12-02", revenue: 22000, bookings: 18, commission: 3300, net: 18700 },
    { date: "2024-12-03", revenue: 18000, bookings: 15, commission: 2700, net: 15300 },
    { date: "2024-12-04", revenue: 25000, bookings: 20, commission: 3750, net: 21250 },
    { date: "2024-12-05", revenue: 20000, bookings: 16, commission: 3000, net: 17000 },
    { date: "2024-12-06", revenue: 28000, bookings: 22, commission: 4200, net: 23800 },
    { date: "2024-12-07", revenue: 32000, bookings: 25, commission: 4800, net: 27200 },
  ];

  const payoutHistory: PayoutRecord[] = [
    {
      id: 1,
      date: "2024-12-01",
      amount: 45000,
      status: "completed",
      method: "Bank Transfer",
      reference: "TXN123456"
    },
    {
      id: 2,
      date: "2024-11-25",
      amount: 38000,
      status: "completed",
      method: "Bank Transfer",
      reference: "TXN123455"
    },
    {
      id: 3,
      date: "2024-11-18",
      amount: 42000,
      status: "completed",
      method: "M-Pesa",
      reference: "TXN123454"
    },
    {
      id: 4,
      date: "2024-12-08",
      amount: 27200,
      status: "pending",
      method: "Bank Transfer",
      reference: "TXN123457"
    }
  ];

  const serviceBreakdown = [
    { name: "Deep Cleaning", value: 35, color: "#8884d8" },
    { name: "Office Cleaning", value: 30, color: "#82ca9d" },
    { name: "Carpet Cleaning", value: 20, color: "#ffc658" },
    { name: "Window Cleaning", value: 15, color: "#ff7c7c" }
  ];

  const totalRevenue = earningsData.reduce((sum, day) => sum + day.revenue, 0);
  const totalCommission = earningsData.reduce((sum, day) => sum + day.commission, 0);
  const totalNet = earningsData.reduce((sum, day) => sum + day.net, 0);
  const totalBookings = earningsData.reduce((sum, day) => sum + day.bookings, 0);
  const avgBookingValue = totalRevenue / totalBookings;

  const pendingPayout = payoutHistory.find(p => p.status === "pending");
  const lastPayout = payoutHistory.filter(p => p.status === "completed").sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "pending": return "secondary";
      case "processing": return "outline";
      case "failed": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Company Earnings</h1>
          <p className="text-gray-600">Track your company's financial performance</p>
        </div>
        
        <div className="flex space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold">KES {totalRevenue.toLocaleString()}</p>
                <div className="flex items-center space-x-1 text-sm text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>+12.5%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Net Earnings</p>
                <p className="text-2xl font-bold">KES {totalNet.toLocaleString()}</p>
                <div className="flex items-center space-x-1 text-sm text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>+8.3%</span>
                </div>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Platform Commission</p>
                <p className="text-2xl font-bold">KES {totalCommission.toLocaleString()}</p>
                <p className="text-xs text-gray-400">15% of revenue</p>
              </div>
              <TrendingDown className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Booking Value</p>
                <p className="text-2xl font-bold">KES {avgBookingValue.toFixed(0)}</p>
                <div className="flex items-center space-x-1 text-sm text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>+5.2%</span>
                </div>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Daily revenue and net earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).getDate().toString()} />
                <YAxis />
                <Tooltip formatter={(value) => [`KES ${value.toLocaleString()}`, ""]} />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="net" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Service</CardTitle>
            <CardDescription>Breakdown of earnings by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {serviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Payout Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payout Status</CardTitle>
            <CardDescription>Current payout information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingPayout && (
              <div className="p-4 border rounded-lg bg-yellow-50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Pending Payout</p>
                    <p className="text-2xl font-bold text-yellow-600">KES {pendingPayout.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Expected: {pendingPayout.date}</p>
                  </div>
                  <Badge variant="secondary">Processing</Badge>
                </div>
              </div>
            )}

            {lastPayout && (
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Last Payout</p>
                    <p className="text-lg font-semibold">KES {lastPayout.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{lastPayout.date} • {lastPayout.method}</p>
                  </div>
                  <Badge variant="default">Completed</Badge>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-medium">Payout Schedule</h4>
              <p className="text-sm text-gray-600">• Weekly payouts every Friday</p>
              <p className="text-sm text-gray-600">• Minimum payout: KES 1,000</p>
              <p className="text-sm text-gray-600">• Processing time: 1-3 business days</p>
            </div>

            <Button className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Payout Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payout History</CardTitle>
            <CardDescription>Recent payout transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payoutHistory.slice(0, 5).map((payout) => (
                <div key={payout.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">KES {payout.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{payout.date}</p>
                    <p className="text-xs text-gray-400">{payout.reference}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusColor(payout.status)} className="mb-1">
                      {payout.status}
                    </Badge>
                    <p className="text-xs text-gray-500">{payout.method}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Key insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-green-50">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-800">Peak Performance</h4>
              </div>
              <p className="text-sm text-green-700">Your highest earning day was Dec 7th with KES 32,000 in revenue</p>
            </div>

            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-800">Best Service</h4>
              </div>
              <p className="text-sm text-blue-700">Deep Cleaning generates 35% of your total revenue</p>
            </div>

            <div className="p-4 border rounded-lg bg-purple-50">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-5 w-5 text-purple-600" />
                <h4 className="font-medium text-purple-800">Growth Opportunity</h4>
              </div>
              <p className="text-sm text-purple-700">Consider expanding your team to handle 20% more bookings</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyEarnings;
