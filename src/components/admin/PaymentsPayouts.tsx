
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle, CreditCard } from "lucide-react";

const PaymentsPayouts = () => {
  const [escrowTransactions] = useState([
    {
      id: 1,
      bookingId: "BK001",
      student: "Prince Ahmed",
      cleaner: "Jane Wanjiku",
      service: "Room Cleaning",
      amount: 800,
      commission: 120,
      cleanerAmount: 680,
      status: "completed_held",
      paymentMethod: "M-Pesa",
      date: "2024-06-02",
      completedDate: "2024-06-02",
      studentAvatar: "/placeholder.svg",
      cleanerAvatar: "/placeholder.svg"
    },
    {
      id: 2,
      bookingId: "BK002",
      student: "Sarah Mwangi",
      cleaner: "Peter Kimani",
      service: "Bathroom Deep Clean",
      amount: 1200,
      commission: 180,
      cleanerAmount: 1020,
      status: "in_progress_held",
      paymentMethod: "Card",
      date: "2024-06-03",
      completedDate: null,
      studentAvatar: "/placeholder.svg",
      cleanerAvatar: "/placeholder.svg"
    },
    {
      id: 3,
      bookingId: "BK003",
      student: "John Ochieng",
      cleaner: "Mary Achieng",
      service: "Kitchen Cleaning",
      amount: 1000,
      commission: 150,
      cleanerAmount: 850,
      status: "released",
      paymentMethod: "Bank Transfer",
      date: "2024-05-28",
      completedDate: "2024-05-28",
      releasedDate: "2024-05-29",
      studentAvatar: "/placeholder.svg",
      cleanerAvatar: "/placeholder.svg"
    }
  ]);

  const [payoutRequests] = useState([
    {
      id: 1,
      cleaner: "Jane Wanjiku",
      amount: 5200,
      method: "M-Pesa",
      accountDetails: "+254 701 234 567",
      requestDate: "2024-06-01",
      status: "pending",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      cleaner: "Peter Kimani",
      amount: 3400,
      method: "Bank Transfer",
      accountDetails: "KCB Bank - 1234567890",
      requestDate: "2024-05-30",
      status: "processing",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      cleaner: "Mary Achieng",
      amount: 2800,
      method: "M-Pesa",
      accountDetails: "+254 703 456 789",
      requestDate: "2024-05-28",
      status: "completed",
      completedDate: "2024-05-29",
      avatar: "/placeholder.svg"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed_held": return "secondary";
      case "in_progress_held": return "outline";
      case "released": return "default";
      case "pending": return "secondary";
      case "processing": return "outline";
      case "completed": return "default";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed_held": return <Clock className="h-4 w-4" />;
      case "in_progress_held": return <AlertCircle className="h-4 w-4" />;
      case "released": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "processing": return <AlertCircle className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const totalEscrowHeld = escrowTransactions
    .filter(t => t.status.includes("held"))
    .reduce((acc, t) => acc + t.amount, 0);

  const totalCommission = escrowTransactions
    .reduce((acc, t) => acc + t.commission, 0);

  const totalReleased = escrowTransactions
    .filter(t => t.status === "released")
    .reduce((acc, t) => acc + t.cleanerAmount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payments & Payouts</h1>
        <p className="text-gray-600">Manage escrow payments and cleaner payouts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold">KES {escrowTransactions.reduce((acc, t) => acc + t.amount, 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Escrow Held</p>
                <p className="text-2xl font-bold">KES {totalEscrowHeld.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Commission Earned</p>
                <p className="text-2xl font-bold">KES {totalCommission.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Paid to Cleaners</p>
                <p className="text-2xl font-bold">KES {totalReleased.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="escrow" className="space-y-6">
        <TabsList>
          <TabsTrigger value="escrow">Escrow Payments</TabsTrigger>
          <TabsTrigger value="payouts">Payout Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="escrow" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed_held">Completed (Held)</SelectItem>
                    <SelectItem value="in_progress_held">In Progress (Held)</SelectItem>
                    <SelectItem value="released">Released</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Escrow Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Escrow Transactions</CardTitle>
              <CardDescription>Monitor payments held in escrow for service completion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {escrowTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold">#{transaction.bookingId} - {transaction.service}</p>
                        <p className="text-lg font-bold text-green-600">KES {transaction.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">
                          Commission: KES {transaction.commission} • Cleaner: KES {transaction.cleanerAmount}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(transaction.status)} className="flex items-center">
                        {getStatusIcon(transaction.status)}
                        <span className="ml-1">{transaction.status.replace('_', ' ')}</span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={transaction.studentAvatar} />
                          <AvatarFallback>{transaction.student.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{transaction.student}</p>
                          <p className="text-sm text-gray-500">Student • {transaction.paymentMethod}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={transaction.cleanerAvatar} />
                          <AvatarFallback>{transaction.cleaner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{transaction.cleaner}</p>
                          <p className="text-sm text-gray-500">Cleaner</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-sm text-gray-500">
                        Paid: {transaction.date}
                        {transaction.completedDate && ` • Completed: ${transaction.completedDate}`}
                        {transaction.releasedDate && ` • Released: ${transaction.releasedDate}`}
                      </div>
                      <div className="flex space-x-2">
                        {transaction.status === "completed_held" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Release Payment
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payout Requests</CardTitle>
              <CardDescription>Process cleaner withdrawal requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payoutRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={request.avatar} />
                          <AvatarFallback>{request.cleaner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{request.cleaner}</p>
                          <p className="text-lg font-bold text-green-600">KES {request.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">
                            {request.method} • {request.accountDetails}
                          </p>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(request.status)} className="flex items-center">
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{request.status}</span>
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-sm text-gray-500">
                        Requested: {request.requestDate}
                        {request.completedDate && ` • Completed: ${request.completedDate}`}
                      </div>
                      <div className="flex space-x-2">
                        {request.status === "pending" && (
                          <>
                            <Button variant="outline" size="sm">
                              Reject
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CreditCard className="h-4 w-4 mr-1" />
                              Process Payout
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentsPayouts;
