import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Truck, Check, Clock, ArrowRight } from "lucide-react";

const orders = [
  { id: "SHP001", items: "Brass Ganesh Idol, Sandalwood Mala", date: "Mar 28, 2026", status: "delivered", amount: "₹3,097" },
  { id: "SHP002", items: "Bhagavad Gita - Deluxe Edition", date: "Apr 1, 2026", status: "shipped", amount: "₹499" },
  { id: "SHP003", items: "Copper Pooja Thali Set", date: "Apr 1, 2026", status: "processing", amount: "₹1,599" },
];

const statusColor: Record<string, string> = { delivered: "bg-sacred-green/10 text-sacred-green", shipped: "bg-sky-blue/10 text-sky-blue", processing: "bg-gold/10 text-gold" };

export default function ShopOrders() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="My Orders" description="Track your shop orders" />
      <div className="space-y-4">
        {orders.map((o, i) => (
          <Card key={o.id} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Package className="w-5 h-5 text-primary" /></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{o.items}</h3>
                    <Badge className={`${statusColor[o.status]} border-none text-[10px] capitalize`}>{o.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Order #{o.id} • {o.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-display font-bold">{o.amount}</span>
                <Button variant="ghost" size="sm" className="text-primary gap-1">Track <ArrowRight className="w-3 h-3" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
