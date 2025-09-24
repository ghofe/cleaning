
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard, Smartphone, Building2, Wallet } from "lucide-react";

interface PaymentMethodsProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  onPaymentComplete: () => void;
}

const PaymentMethods = ({ selectedMethod, onMethodChange, onPaymentComplete }: PaymentMethodsProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, etc."
    },
    {
      id: "mpesa",
      name: "M-Pesa",
      icon: Smartphone,
      description: "Mobile money payment"
    },
    {
      id: "google_pay",
      name: "Google Pay",
      icon: Wallet,
      description: "Quick and secure"
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Building2,
      description: "Direct bank payment"
    }
  ];

  const handlePayment = () => {
    // Simulate payment processing
    console.log("Processing payment with method:", selectedMethod);
    setTimeout(() => {
      onPaymentComplete();
      alert("Payment successful!");
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Choose your preferred payment method</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selectedMethod} onValueChange={onMethodChange}>
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center space-x-2">
              <RadioGroupItem value={method.id} id={method.id} />
              <Label htmlFor={method.id} className="flex items-center space-x-3 cursor-pointer flex-1">
                <method.icon className="h-5 w-5" />
                <div>
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>

        {selectedMethod === "card" && (
          <div className="space-y-4 p-4 border rounded-lg">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {selectedMethod === "mpesa" && (
          <div className="space-y-4 p-4 border rounded-lg">
            <div>
              <Label htmlFor="mpesaNumber">M-Pesa Number</Label>
              <Input
                id="mpesaNumber"
                placeholder="+254 7XX XXX XXX"
                value={mpesaNumber}
                onChange={(e) => setMpesaNumber(e.target.value)}
              />
            </div>
            <p className="text-sm text-gray-600">
              You will receive an STK push notification to complete the payment
            </p>
          </div>
        )}

        {selectedMethod === "google_pay" && (
          <div className="p-4 border rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-4">
              You will be redirected to Google Pay to complete the payment
            </p>
            <Button className="w-full">Continue with Google Pay</Button>
          </div>
        )}

        {selectedMethod === "bank" && (
          <div className="space-y-4 p-4 border rounded-lg">
            <div>
              <Label htmlFor="bankAccount">Bank Account Number</Label>
              <Input
                id="bankAccount"
                placeholder="Account number"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
              />
            </div>
            <p className="text-sm text-gray-600">
              Bank transfer details will be provided after confirmation
            </p>
          </div>
        )}

        {selectedMethod && (
          <Button onClick={handlePayment} className="w-full" size="lg">
            Complete Payment
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
