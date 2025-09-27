import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Users, Star, Building, Shield } from "lucide-react";

interface SignupFormProps {
  onBack: () => void;
  onSignup: (userType: string) => void;
}

const SignupForm = ({ onBack, onSignup }: SignupFormProps) => {
  const [step, setStep] = useState<"select" | "form">("select");
  const [selectedType, setSelectedType] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const { toast } = useToast();

  const userTypes = [
    {
      type: "homeowner",
      title: "Homeowner",
      description: "Book cleaning services for your home",
      icon: Users,
      color: "blue",
    },
    {
      type: "cleaner",
      title: "Cleaner",
      description: "Provide cleaning services and earn money",
      icon: Star,
      color: "green",
    },
    {
      type: "company",
      title: "Company",
      description: "Manage cleaning teams and operations",
      icon: Building,
      color: "orange",
    },
    {
      type: "admin",
      title: "Admin",
      description: "System administration and oversight",
      icon: Shield,
      color: "purple",
    },
  ];

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setStep("form");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Account Created",
      description: `Welcome to CampusClean! Redirecting to ${selectedType} dashboard...`,
    });

    setTimeout(() => {
      onSignup(selectedType);
    }, 1000);
  };

  if (step === "select") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl">
          <CardHeader className="text-center">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <CardTitle className="text-3xl">Join CampusClean</CardTitle>
                <CardDescription className="text-lg">
                  Choose how you'd like to use our platform
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {userTypes.map((userType) => {
                const Icon = userType.icon;
                return (
                  <Card
                    key={userType.type}
                    className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-500"
                    onClick={() => handleTypeSelect(userType.type)}
                  >
                    <CardHeader className="text-center">
                      <Icon className={`h-16 w-16 text-${userType.color}-600 mx-auto mb-4`} />
                      <CardTitle className="text-xl">{userType.title}</CardTitle>
                      <CardDescription>{userType.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        Sign up as {userType.title}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedUserType = userTypes.find(ut => ut.type === selectedType);
  const Icon = selectedUserType?.icon || Users;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setStep("select")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 flex-1">
              <Icon className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-2xl">Sign up as {selectedUserType?.title}</CardTitle>
                <CardDescription>
                  Create your {selectedUserType?.title.toLowerCase()} account
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;