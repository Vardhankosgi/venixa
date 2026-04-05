import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Truck, Check, Clock, MapPin, ArrowRight } from "lucide-react";

const orders = [
  { id: "ORD001", items: "Satyanarayan Pooja Kit", date: "Mar 30, 2026", status: "delivered", amount: "₹999", tracking: "Delivered on Apr 1" },
  { id: "ORD002", items: "Ganesh Chaturthi Kit + Custom Items", date: "Apr 1, 2026", status: "shipped", amount: "₹1,450", tracking: "Out for delivery" },
  { id: "ORD003", items: "Daily Pooja Essentials (Subscription)", date: "Apr 1, 2026", status: "processing", amount: "₹299", tracking: "Preparing your order" },
];

const statusColor: Record<string, string> = {
  delivered: "bg-sacred-green/10 text-sacred-green",
  shipped: "bg-sky-blue/10 text-sky-blue",
  processing: "bg-gold/10 text-gold",
};
const statusIcon: Record<string, any> = { delivered: Check, shipped: Truck, processing: Clock };

export default function SamagriOrders() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="My Orders" description="Track your samagri orders and deliveries" />
      <div className="space-y-4">
        {orders.map((o, i) => {
          const StatusIcon = statusIcon[o.status];
          return (
            <Card key={o.id} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold">{o.items}</h3>
                      <Badge className={`${statusColor[o.status]} border-none text-[10px] capitalize gap-1`}>
                        <StatusIcon className="w-3 h-3" />{o.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Order #{o.id} • {o.date}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="w-3 h-3" />{o.tracking}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-display font-bold">{o.amount}</span>
                  <Button variant="ghost" size="sm" className="text-primary gap-1">Track <ArrowRight className="w-3 h-3" /></Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
