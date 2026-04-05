import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const plans = [
  { name: "Basic", price: "₹299", period: "/month", features: ["Monthly pooja essentials", "Free delivery", "Basic items only"], popular: false },
  { name: "Premium", price: "₹599", period: "/month", features: ["Weekly pooja essentials", "Free express delivery", "Premium quality items", "Festival special additions", "10% discount on kits"], popular: true },
  { name: "Family", price: "₹999", period: "/month", features: ["All Premium features", "For up to 3 addresses", "Custom item preferences", "Priority support", "15% discount on all orders", "Free consultation"], popular: false },
];

export default function SamagriSubscriptions() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <PageHeader title="Samagri Subscriptions" description="Never run out of pooja essentials with our subscription plans" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <Card key={i} className={`glass-card p-6 animate-fade-in relative ${p.popular ? "ring-2 ring-primary" : ""}`} style={{ animationDelay: `${i * 100}ms` }}>
            {p.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-saffron text-primary-foreground border-none">Most Popular</Badge>}
            <h3 className="font-display text-xl font-bold text-center mb-2">{p.name}</h3>
            <div className="text-center mb-6">
              <span className="text-3xl font-display font-bold text-primary">{p.price}</span>
              <span className="text-muted-foreground text-sm">{p.period}</span>
            </div>
            <ul className="space-y-3 mb-6">
              {p.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-sacred-green shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button className={`w-full font-body ${p.popular ? "gradient-saffron text-primary-foreground" : ""}`} variant={p.popular ? "default" : "outline"}>
              Subscribe Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
