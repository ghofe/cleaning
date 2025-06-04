
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Mail, Phone, MapPin, Globe, Users, Star, CheckCircle, XCircle, Upload, Edit, Save, Shield, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyInfo {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  logo: string;
  businessLicense: string;
  taxId: string;
  established: string;
  employees: number;
  rating: number;
  totalJobs: number;
  verificationStatus: "pending" | "verified" | "rejected";
  isActive: boolean;
}

interface BankingInfo {
  bankName: string;
  accountNumber: string;
  accountName: string;
  swiftCode: string;
  mpesaNumber: string;
}

interface OperatingHours {
  [key: string]: { open: string; close: string; isOpen: boolean };
}

const CompanyProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: "CleanPro Services Ltd",
    description: "Professional cleaning services for residential and commercial properties in Nairobi. We provide reliable, efficient, and eco-friendly cleaning solutions.",
    email: "info@cleanpro.co.ke",
    phone: "+254 700 123 456",
    address: "Westlands, Nairobi, Kenya",
    website: "www.cleanpro.co.ke",
    logo: "/placeholder.svg",
    businessLicense: "BL123456789",
    taxId: "TAX987654321",
    established: "2020-03-15",
    employees: 25,
    rating: 4.8,
    totalJobs: 1250,
    verificationStatus: "verified",
    isActive: true
  });

  const [bankingInfo, setBankingInfo] = useState<BankingInfo>({
    bankName: "KCB Bank",
    accountNumber: "1234567890",
    accountName: "CleanPro Services Ltd",
    swiftCode: "KCBLKENX",
    mpesaNumber: "+254 700 123 456"
  });

  const [operatingHours, setOperatingHours] = useState<OperatingHours>({
    monday: { open: "08:00", close: "18:00", isOpen: true },
    tuesday: { open: "08:00", close: "18:00", isOpen: true },
    wednesday: { open: "08:00", close: "18:00", isOpen: true },
    thursday: { open: "08:00", close: "18:00", isOpen: true },
    friday: { open: "08:00", close: "18:00", isOpen: true },
    saturday: { open: "09:00", close: "16:00", isOpen: true },
    sunday: { open: "10:00", close: "14:00", isOpen: false }
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your company profile has been successfully updated.",
    });
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case "verified": return "default";
      case "pending": return "secondary";
      case "rejected": return "destructive";
      default: return "outline";
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "rejected": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Company Profile</h1>
          <p className="text-gray-600">Manage your company information and settings</p>
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Company Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={companyInfo.logo} />
                <AvatarFallback>{companyInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{companyInfo.name}</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  {getVerificationIcon(companyInfo.verificationStatus)}
                  <Badge variant={getVerificationColor(companyInfo.verificationStatus)}>
                    {companyInfo.verificationStatus}
                  </Badge>
                  <Badge variant={companyInfo.isActive ? "default" : "secondary"}>
                    {companyInfo.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-semibold">{companyInfo.rating}</span>
              </div>
              <p className="text-sm text-gray-500">{companyInfo.totalJobs} completed jobs</p>
              <p className="text-sm text-gray-500">{companyInfo.employees} employees</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tab Navigation */}
      <div className="flex space-x-1 border-b">
        {[
          { id: "general", label: "General Info" },
          { id: "banking", label: "Banking" },
          { id: "hours", label: "Operating Hours" },
          { id: "verification", label: "Verification" }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => setActiveTab(tab.id)}
            className="rounded-b-none"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* General Information Tab */}
      {activeTab === "general" && (
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>Basic company details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={companyInfo.phone}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={companyInfo.website}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, website: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="established">Established Date</Label>
                <Input
                  id="established"
                  type="date"
                  value={companyInfo.established}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, established: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="employees">Number of Employees</Label>
                <Input
                  id="employees"
                  type="number"
                  value={companyInfo.employees}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, employees: parseInt(e.target.value) }))}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={companyInfo.address}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, address: e.target.value }))}
                disabled={!isEditing}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="description">Company Description</Label>
              <Textarea
                id="description"
                value={companyInfo.description}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, description: e.target.value }))}
                disabled={!isEditing}
                rows={4}
              />
            </div>

            {isEditing && (
              <div>
                <Label>Company Logo</Label>
                <div className="mt-2">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Logo
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Banking Information Tab */}
      {activeTab === "banking" && (
        <Card>
          <CardHeader>
            <CardTitle>Banking Information</CardTitle>
            <CardDescription>Payment and payout details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input
                  id="bank-name"
                  value={bankingInfo.bankName}
                  onChange={(e) => setBankingInfo(prev => ({ ...prev, bankName: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="account-number">Account Number</Label>
                <Input
                  id="account-number"
                  value={bankingInfo.accountNumber}
                  onChange={(e) => setBankingInfo(prev => ({ ...prev, accountNumber: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="account-name">Account Name</Label>
                <Input
                  id="account-name"
                  value={bankingInfo.accountName}
                  onChange={(e) => setBankingInfo(prev => ({ ...prev, accountName: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="swift-code">SWIFT Code</Label>
                <Input
                  id="swift-code"
                  value={bankingInfo.swiftCode}
                  onChange={(e) => setBankingInfo(prev => ({ ...prev, swiftCode: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="mpesa-number">M-Pesa Number</Label>
                <Input
                  id="mpesa-number"
                  value={bankingInfo.mpesaNumber}
                  onChange={(e) => setBankingInfo(prev => ({ ...prev, mpesaNumber: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-800">Security Note</h4>
              </div>
              <p className="text-sm text-blue-700">Your banking information is encrypted and securely stored. Only authorized personnel can access this data.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Operating Hours Tab */}
      {activeTab === "hours" && (
        <Card>
          <CardHeader>
            <CardTitle>Operating Hours</CardTitle>
            <CardDescription>Set your business operating hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(operatingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Switch
                      checked={hours.isOpen}
                      onCheckedChange={(checked) => 
                        setOperatingHours(prev => ({
                          ...prev,
                          [day]: { ...prev[day], isOpen: checked }
                        }))
                      }
                      disabled={!isEditing}
                    />
                    <span className="font-medium capitalize">{day}</span>
                  </div>
                  
                  {hours.isOpen ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="time"
                        value={hours.open}
                        onChange={(e) => 
                          setOperatingHours(prev => ({
                            ...prev,
                            [day]: { ...prev[day], open: e.target.value }
                          }))
                        }
                        disabled={!isEditing}
                        className="w-32"
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={hours.close}
                        onChange={(e) => 
                          setOperatingHours(prev => ({
                            ...prev,
                            [day]: { ...prev[day], close: e.target.value }
                          }))
                        }
                        disabled={!isEditing}
                        className="w-32"
                      />
                    </div>
                  ) : (
                    <Badge variant="secondary">Closed</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verification Tab */}
      {activeTab === "verification" && (
        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription>Your business verification and compliance status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="business-license">Business License Number</Label>
                <Input
                  id="business-license"
                  value={companyInfo.businessLicense}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, businessLicense: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="tax-id">Tax ID / KRA PIN</Label>
                <Input
                  id="tax-id"
                  value={companyInfo.taxId}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, taxId: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Required Documents</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Business Registration Certificate</p>
                    <p className="text-sm text-gray-500">Certificate of incorporation or business registration</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <Badge variant="default">Verified</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Tax Compliance Certificate</p>
                    <p className="text-sm text-gray-500">Valid KRA tax compliance certificate</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <Badge variant="default">Verified</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Insurance Certificate</p>
                    <p className="text-sm text-gray-500">Public liability insurance coverage</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <Badge variant="secondary">Pending Review</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Bank Statement</p>
                    <p className="text-sm text-gray-500">Recent bank statement for verification</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <Badge variant="default">Verified</Badge>
                  </div>
                </div>
              </div>

              {isEditing && (
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyProfile;
