import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Gift, Crown, Trophy, Zap } from "lucide-react";

const LoyaltyRewards = () => {
  const userPoints = 850;
  const currentTier = "Silver";
  const nextTier = "Gold";
  const pointsToNextTier = 150;

  const tiers = [
    { name: "Bronze", min: 0, max: 499, icon: Star, color: "text-amber-600" },
    { name: "Silver", min: 500, max: 999, icon: Trophy, color: "text-gray-500" },
    { name: "Gold", min: 1000, max: 1999, icon: Crown, color: "text-yellow-500" },
    { name: "Platinum", min: 2000, max: 999999, icon: Zap, color: "text-purple-600" }
  ];

  const rewards = [
    {
      id: 1,
      title: "10% Off Next Booking",
      points: 200,
      description: "Save on your next cleaning service",
      type: "discount",
      available: true
    },
    {
      id: 2,
      title: "Free Add-on Service",
      points: 500,
      description: "Window or kitchen deep clean",
      type: "service",
      available: true
    },
    {
      id: 3,
      title: "Priority Booking",
      points: 300,
      description: "Skip the queue for 7 days",
      type: "priority",
      available: true
    },
    {
      id: 4,
      title: "VIP Support",
      points: 1000,
      description: "Dedicated customer support",
      type: "support",
      available: false
    }
  ];

  const recentActivity = [
    { date: "2024-06-01", action: "Booking completed", points: "+50", type: "earn" },
    { date: "2024-05-28", action: "Review submitted", points: "+10", type: "earn" },
    { date: "2024-05-25", action: "Redeemed 10% discount", points: "-200", type: "redeem" },
    { date: "2024-05-20", action: "Booking completed", points: "+50", type: "earn" }
  ];

  const currentTierInfo = tiers.find(tier => tier.name === currentTier);
  const progress = ((userPoints - (currentTierInfo?.min || 0)) / pointsToNextTier) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Loyalty & Rewards</h1>
        <p className="text-gray-600">Earn points and unlock exclusive benefits</p>
      </div>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {currentTierInfo && <currentTierInfo.icon className={`h-6 w-6 ${currentTierInfo.color}`} />}
            <span>{currentTier} Member</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{userPoints} Points</span>
              <Badge variant="outline">{pointsToNextTier} points to {nextTier}</Badge>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-600">
              Complete {Math.ceil(pointsToNextTier / 50)} more bookings to reach {nextTier} tier
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Membership Tiers */}
      <Card>
        <CardHeader>
          <CardTitle>Membership Tiers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tiers.map((tier) => (
              <div key={tier.name} className={`p-4 border rounded-lg text-center ${
                tier.name === currentTier ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}>
                <tier.icon className={`h-8 w-8 mx-auto mb-2 ${tier.color}`} />
                <h3 className="font-semibold">{tier.name}</h3>
                <p className="text-xs text-gray-500">{tier.min}+ points</p>
                {tier.name === currentTier && (
                  <Badge className="mt-2">Current</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="h-5 w-5" />
            <span>Available Rewards</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {rewards.map((reward) => (
              <div key={reward.id} className={`p-4 border rounded-lg ${
                !reward.available ? 'opacity-50' : ''
              }`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold">{reward.title}</h3>
                    <p className="text-sm text-gray-600">{reward.description}</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm ml-1">{reward.points} points</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    disabled={!reward.available || userPoints < reward.points}
                    variant={reward.available && userPoints >= reward.points ? "default" : "outline"}
                  >
                    {userPoints >= reward.points ? "Redeem" : "Not Enough Points"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Points History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
                <span className={`font-semibold ${
                  activity.type === 'earn' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {activity.points}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyRewards;
