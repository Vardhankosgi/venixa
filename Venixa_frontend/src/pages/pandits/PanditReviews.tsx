import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Star, ThumbsUp } from "lucide-react";

const reviews = [
  { user: "Priya M.", pandit: "Pandit Ramesh Sharma", rating: 5, comment: "Excellent service! Panditji was very knowledgeable and performed the Satyanarayan Katha with great devotion. Highly recommended.", date: "Mar 28, 2026", helpful: 12 },
  { user: "Rajesh K.", pandit: "Acharya Subramaniam", rating: 5, comment: "The Ganapathi Homam was performed beautifully. Very professional and patient with all our questions.", date: "Mar 15, 2026", helpful: 8 },
  { user: "Anita S.", pandit: "Shastri Govind Patel", rating: 4, comment: "Good experience overall. The panditji was on time and the pooja was done well. Would book again.", date: "Mar 10, 2026", helpful: 5 },
  { user: "Vikram P.", pandit: "Pandit Arjun Iyer", rating: 5, comment: "Very detailed explanation of the rituals. Made the entire family feel involved in the Navagraha Pooja.", date: "Feb 22, 2026", helpful: 15 },
];

export default function PanditReviews() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Reviews & Ratings" description="Read authentic reviews from verified users" />
      <div className="space-y-4">
        {reviews.map((r, i) => (
          <Card key={i} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold font-body">{r.user}</p>
                <p className="text-sm text-muted-foreground">for {r.pandit}</p>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-3.5 h-3.5 ${j < r.rating ? "text-gold fill-gold" : "text-muted"}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-foreground/80 mb-3">{r.comment}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{r.date}</span>
              <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {r.helpful} found helpful</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
