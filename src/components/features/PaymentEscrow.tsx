
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CreditCard, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Banknote
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EscrowTransaction {
  id: string;
  amount: number;
  currency: string;
  studentId: string;
  cleanerId: string;
  bookingId: string;
  status: 'pending' | 'escrowed' | 'disputed' | 'released' | 'refunded';
  createdAt: string;
  releasedAt?: string;
  description: string;
}

const PaymentEscrow = () => {
  const [transactions, setTransactions] = useState<EscrowTransaction[]>([
    {
      id: 'ESC001',
      amount: 800,
      currency: 'KES',
      studentId: 'STU123',
      cleanerId: 'CLN456',
      bookingId: 'BK789',
      status: 'escrowed',
      createdAt: '2024-06-01T10:00:00Z',
      description: 'Room cleaning service - Hostels Block A'
    },
    {
      id: 'ESC002',
      amount: 1200,
      currency: 'KES',
      studentId: 'STU124',
      cleanerId: 'CLN457',
      bookingId: 'BK790',
      status: 'pending',
      createdAt: '2024-06-01T14:00:00Z',
      description: 'Deep cleaning service - Room 204'
    }
  ]);

  const { toast } = useToast();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'escrowed': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'disputed': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'released': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'refunded': return <DollarSign className="h-4 w-4 text-purple-600" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'escrowed': return 'bg-blue-100 text-blue-800';
      case 'disputed': return 'bg-red-100 text-red-800';
      case 'released': return 'bg-green-100 text-green-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const releasePayment = (transactionId: string) => {
    setTransactions(prev => prev.map(t => 
      t.id === transactionId 
        ? { ...t, status: 'released' as const, releasedAt: new Date().toISOString() }
        : t
    ));
    
    toast({
      title: "Payment Released",
      description: "The escrowed payment has been released to the cleaner."
    });
  };

  const refundPayment = (transactionId: string) => {
    setTransactions(prev => prev.map(t => 
      t.id === transactionId 
        ? { ...t, status: 'refunded' as const }
        : t
    ));
    
    toast({
      title: "Payment Refunded",
      description: "The payment has been refunded to the student."
    });
  };

  const totalEscrowed = transactions
    .filter(t => t.status === 'escrowed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Escrow Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Escrowed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">KES {totalEscrowed.toLocaleString()}</div>
                <p className="text-xs text-gray-500">Protected funds</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{transactions.length}</div>
                <p className="text-xs text-gray-500">In progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Platform Fee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Banknote className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">5%</div>
                <p className="text-xs text-gray-500">Service charge</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Escrow Process Flow */}
      <Card>
        <CardHeader>
          <CardTitle>How Escrow Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium">1. Payment</h3>
              <p className="text-xs text-gray-500">Student pays for service</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-medium">2. Escrow</h3>
              <p className="text-xs text-gray-500">Funds held securely</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium">3. Service</h3>
              <p className="text-xs text-gray-500">Cleaning completed</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium">4. Release</h3>
              <p className="text-xs text-gray-500">Payment to cleaner</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Escrow Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">Transaction {transaction.id}</h3>
                    <p className="text-sm text-gray-600">{transaction.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {transaction.currency} {transaction.amount.toLocaleString()}
                    </div>
                    <Badge className={getStatusColor(transaction.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(transaction.status)}
                        <span>{transaction.status.replace('_', ' ').toUpperCase()}</span>
                      </div>
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                  <div>
                    <span className="font-medium">Booking ID:</span> {transaction.bookingId}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>{' '}
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {transaction.status === 'escrowed' && (
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => releasePayment(transaction.id)}
                      size="sm"
                      className="flex-1"
                    >
                      Release Payment
                    </Button>
                    <Button 
                      onClick={() => refundPayment(transaction.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Refund
                    </Button>
                  </div>
                )}

                {transaction.status === 'pending' && (
                  <div className="bg-yellow-50 p-3 rounded">
                    <p className="text-sm text-yellow-800">
                      Waiting for payment confirmation...
                    </p>
                    <Progress value={30} className="mt-2 h-2" />
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

export default PaymentEscrow;
