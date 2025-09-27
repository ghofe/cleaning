import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Smartphone, Key, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TwoFactorAuth = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showSetup, setShowSetup] = useState(false);
  const { toast } = useToast();

  const generateQRCode = () => {
    setQrCode('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmMWYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjJGQSBRUiBDb2RlPC90ZXh0Pjwvc3ZnPg==');
    setBackupCodes([
      '1234-5678-9012',
      '3456-7890-1234',
      '5678-9012-3456',
      '7890-1234-5678',
      '9012-3456-7890'
    ]);
    setShowSetup(true);
  };

  const enable2FA = () => {
    if (verificationCode === '123456') {
      setIsEnabled(true);
      setShowSetup(false);
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been successfully enabled for your account."
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter the correct verification code from your authenticator app.",
        variant: "destructive"
      });
    }
  };

  const disable2FA = () => {
    setIsEnabled(false);
    setShowSetup(false);
    setQrCode('');
    setBackupCodes([]);
    toast({
      title: "2FA Disabled",
      description: "Two-factor authentication has been disabled for your account."
    });
  };

  

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Two-Factor Authentication</span>
          {isEnabled ? (
            <Badge className="bg-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              Enabled
            </Badge>
          ) : (
            <Badge variant="destructive">
              <AlertCircle className="h-3 w-3 mr-1" />
              Disabled
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isEnabled && !showSetup && (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Protect your account with two-factor authentication. You'll need to enter a code from your phone in addition to your password.
            </p>
            <Button onClick={generateQRCode} className="w-full">
              <Smartphone className="h-4 w-4 mr-2" />
              Enable Two-Factor Authentication
            </Button>
          </div>
        )}

        {showSetup && !isEnabled && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Step 1: Scan QR Code</h3>
              <p className="text-sm text-gray-600 mb-4">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </p>
              <div className="flex justify-center mb-4">
                <img src={qrCode} alt="2FA QR Code" className="border rounded" />
              </div>
              <p className="text-xs text-gray-500">
                Manual setup key: JBSWY3DPEHPK3PXP
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Step 2: Enter Verification Code</h3>
              <Label htmlFor="verification">Enter the 6-digit code from your app</Label>
              <Input
                id="verification"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
                <Key className="h-4 w-4 mr-2" />
                Backup Recovery Codes
              </h4>
              <p className="text-sm text-yellow-700 mb-3">
                Save these codes in a safe place. You can use them to access your account if you lose your phone.
              </p>
              <div className="grid grid-cols-1 gap-1 font-mono text-sm">
                {backupCodes.map((code, index) => (
                  <code key={index} className="bg-white p-2 rounded border">
                    {code}
                  </code>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={enable2FA} className="flex-1">
                Complete Setup
              </Button>
              <Button variant="outline" onClick={() => setShowSetup(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        )}

        {isEnabled && (
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">2FA is Active</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Your account is protected with two-factor authentication.
              </p>
            </div>
            
            <Button variant="destructive" onClick={disable2FA} className="w-full">
              Disable Two-Factor Authentication
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Disabling 2FA will make your account less secure
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TwoFactorAuth;
