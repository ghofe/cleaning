
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Star, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const Reviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      cleaner: "Jane Wanjiku",
      service: "Room Cleaning",
      date: "2024-05-28",
      rating: 5,
      comment: "Excellent service! Jane was very thorough and professional. My room was spotless.",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      cleaner: "Peter Kimani",
      service: "Bathroom Deep Clean",
      date: "2024-05-20",
      rating: 4,
      comment: "Good work overall. Bathroom was cleaned well, though it took a bit longer than expected.",
      avatar: "/placeholder.svg"
    }
  ]);

  const [pendingReviews] = useState([
    {
      id: 3,
      cleaner: "Mary Achieng",
      service: "Kitchen Cleaning",
      date: "2024-05-15",
      avatar: "/placeholder.svg"
    }
  ]);

  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  const StarRating = ({ rating, onRatingChange, interactive = false }: { 
    rating: number; 
    onRatingChange?: (rating: number) => void;
    interactive?: boolean;
  }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-5 w-5",
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300",
              interactive && "cursor-pointer hover:text-yellow-400"
            )}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    );
  };

  const submitReview = (pendingReview: typeof pendingReviews[0]) => {
    if (reviewRating === 0) {
      alert("Please select a rating");
      return;
    }

    const newReview = {
      id: Date.now(),
      cleaner: pendingReview.cleaner,
      service: pendingReview.service,
      date: pendingReview.date,
      rating: reviewRating,
      comment: reviewComment,
      avatar: pendingReview.avatar
    };

    console.log("Review submitted:", newReview);
    alert("Review submitted successfully!");
    setReviewRating(0);
    setReviewComment("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
        <p className="text-gray-600">Rate your cleaning experiences and help others</p>
      </div>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Pending Reviews</h2>
          {pendingReviews.map((pending) => (
            <Card key={pending.id} className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={pending.avatar} />
                      <AvatarFallback>{pending.cleaner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{pending.cleaner}</CardTitle>
                      <CardDescription>{pending.service} • {pending.date}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">Awaiting Review</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Rating</label>
                  <StarRating 
                    rating={reviewRating} 
                    onRatingChange={setReviewRating}
                    interactive={true}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Your Review (Optional)</label>
                  <Textarea
                    placeholder="Share your experience with this cleaner..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button onClick={() => submitReview(pending)} className="w-full">
                  Submit Review
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Previous Reviews */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.cleaner.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{review.cleaner}</h3>
                        <p className="text-sm text-gray-500">{review.service}</p>
                      </div>
                      <div className="text-right">
                        <StarRating rating={review.rating} />
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {review.date}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No reviews yet</p>
              <p className="text-sm text-gray-400">Complete a booking to leave your first review</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reviews;
