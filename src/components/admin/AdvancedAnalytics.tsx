
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, Star } from "lucide-react";

const AdvancedAnalytics = () => {
  const revenueData = [
    { month: 'Jan', revenue: 45000, bookings: 180, commission: 6750 },
    { month: 'Feb', revenue: 52000, bookings: 208, commission: 7800 },
    { month: 'Mar', revenue: 48000, bookings: 192, commission: 7200 },
    { month: 'Apr', revenue: 61000, bookings: 244, commission: 9150 },
    { month: 'May', revenue: 58000, bookings: 232, commission: 8700 },
    { month: 'Jun', revenue: 67000, bookings: 268, commission: 10050 }
  ];

  const serviceDistribution = [
    { name: 'Room Cleaning', value: 45, color: '#3B82F6' },
    { name: 'Bathroom Clean', value: 25, color: '#10B981' },
    { name: 'Kitchen Clean', value: 20, color: '#F59E0B' },
    { name: 'Full Service', value: 10, color: '#EF4444' }
  ];

  const cleanerPerformance = [
    { name: 'Jane Wanjiku', rating: 4.9, bookings: 45, revenue: 12500 },
    { name: 'Peter Kimani', rating: 4.8, bookings: 38, revenue: 10800 },
    { name: 'Mary Achieng', rating: 4.9, bookings: 42, revenue: 11900 },
    { name: 'David Mutua', rating: 4.7, bookings: 35, revenue: 9200 },
    { name: 'Sarah Njeri', rating: 4.8, bookings: 40, revenue: 11000 }
  ];

  const kpis = [
    {
      title: "Total Revenue",
      value: "KES 331,000",
      change: "+12.3%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Active Users",
      value: "1,247",
      change: "+8.7%",
      trend: "up",
      icon: Users
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      change: "+0.2",
      trend: "up",
      icon: Star
    },
    {
      title: "Bookings",
      value: "1,324",
      change: "+15.4%",
      trend: "up",
      icon: Calendar
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Advanced Analytics</h1>
          <p className="text-gray-600">Comprehensive business insights and performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="6months">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Report</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <div className="flex items-center mt-1">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <kpi.icon className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue and Bookings Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`KES ${value.toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Bookings & Commission</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#10B981" name="Bookings" />
              <Bar dataKey="commission" fill="#F59E0B" name="Commission (KES)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Cleaners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cleanerPerformance.map((cleaner, index) => (
              <div key={cleaner.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{cleaner.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{cleaner.bookings} bookings</span>
                      <span>KES {cleaner.revenue.toLocaleString()} revenue</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span>{cleaner.rating}</span>
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;
