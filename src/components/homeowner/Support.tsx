
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Phone, Mail, Clock, CheckCircle } from "lucide-react";

const Support = () => {
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");

  const [tickets] = useState([
    {
      id: "TKT-001",
      subject: "Payment issue with last booking",
      category: "Billing",
      status: "open",
      date: "2024-06-01",
      priority: "high"
    },
    {
      id: "TKT-002",
      subject: "Cleaner didn't show up",
      category: "Booking",
      status: "resolved",
      date: "2024-05-28",
      priority: "medium"
    }
  ]);

  const faqs = [
    {
      question: "How do I book a cleaning service?",
      answer: "You can book a cleaning service by going to the 'Book Cleaner' section, selecting your preferred service type, date, and time slot, then confirming your booking."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept M-Pesa, bank transfers, and cash payments. Payment is due after the cleaning service is completed to your satisfaction."
    },
    {
      question: "Can I cancel or reschedule my booking?",
      answer: "Yes, you can cancel or reschedule your booking up to 4 hours before the scheduled time without any charges. For last-minute changes, please contact support."
    },
    {
      question: "What if I'm not satisfied with the cleaning?",
      answer: "We offer a satisfaction guarantee. If you're not happy with the service, please contact us within 24 hours and we'll arrange for the cleaner to return and address any issues."
    },
    {
      question: "Are the cleaners verified and insured?",
      answer: "Yes, all our cleaners go through a thorough verification process including background checks and training. They are also covered by our insurance policy."
    },
    {
      question: "What cleaning supplies do I need to provide?",
      answer: "Our cleaners come with basic supplies, but you'll need to provide cleaning products and any specific tools. This information is provided when you book."
    }
  ];

  const submitTicket = () => {
    if (!ticketSubject || !ticketCategory || !ticketMessage) {
      alert("Please fill in all fields");
      return;
    }

    const newTicket = {
      id: `TKT-${String(Date.now()).slice(-3)}`,
      subject: ticketSubject,
      category: ticketCategory,
      status: "open",
      date: new Date().toISOString().split('T')[0],
      priority: "medium"
    };

    console.log("Support ticket submitted:", newTicket);
    alert("Support ticket submitted successfully! We'll get back to you soon.");
    
    setTicketSubject("");
    setTicketCategory("");
    setTicketMessage("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "default";
      case "in_progress": return "secondary";
      case "resolved": return "outline";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Support & Help</h1>
        <p className="text-gray-600">Get help with your bookings and account</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Contact</CardTitle>
            <CardDescription>Reach out to us directly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Phone className="mr-2 h-4 w-4" />
              Call Support
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="mr-2 h-4 w-4" />
              Email Us
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              Live Chat
            </Button>
            <div className="text-sm text-gray-500 mt-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Mon-Fri: 8AM-6PM</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Clock className="h-4 w-4" />
                <span>Sat-Sun: 9AM-5PM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Ticket */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
              <CardDescription>Describe your issue and we'll help you resolve it</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={ticketCategory} onValueChange={setTicketCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking">Booking Issues</SelectItem>
                    <SelectItem value="billing">Billing & Payments</SelectItem>
                    <SelectItem value="cleaner">Cleaner Issues</SelectItem>
                    <SelectItem value="account">Account & Profile</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your issue in detail..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <Button onClick={submitTicket} className="w-full">
                Submit Ticket
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* My Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>My Support Tickets</CardTitle>
          <CardDescription>Track your support requests</CardDescription>
        </CardHeader>
        <CardContent>
          {tickets.length > 0 ? (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm text-gray-500">{ticket.id}</span>
                      <h3 className="font-medium">{ticket.subject}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge variant={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Category: {ticket.category}</span>
                    <span>{ticket.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No support tickets</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Find quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;
