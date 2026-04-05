import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Package, Video, Star, Check } from "lucide-react";

const notifications = [
  { title: "Booking Confirmed", message: "Your Satyanarayan Katha with Pandit Ramesh Sharma on Apr 10 has been confirmed.", time: "2 hours ago", type: "booking", read: false, icon: Calendar },
  { title: "Samagri Kit Shipped", message: "Your Ganesh Chaturthi Kit (ORD002) is on its way. Expected delivery: Apr 3.", time: "5 hours ago", type: "order", read: false, icon: Package },
  { title: "Live Pooja Starting Soon", message: "Ganesh Chaturthi Special Pooja starts in 1 hour. Click to join.", time: "1 day ago", type: "live", read: true, icon: Video },
  { title: "New Review Received", message: "Pandit Ramesh Sharma received a 5-star review from your last booking.", time: "2 days ago", type: "review", read: true, icon: Star },
  { title: "Festival Reminder", message: "Ram Navami is on April 6. Book your pooja services now!", time: "3 days ago", type: "reminder", read: true, icon: Bell },
];

const typeColor: Record<string, string> = { booking: "bg-sacred-green/10 text-sacred-green", order: "bg-sky-blue/10 text-sky-blue", live: "bg-vermillion/10 text-vermillion", review: "bg-gold/10 text-gold", reminder: "bg-primary/10 text-primary" };

export default function Notifications() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <PageHeader title="Notifications" description="Stay updated with your bookings and services">
        <Button variant="outline" size="sm"><Check className="w-3 h-3 mr-1" /> Mark All Read</Button>
      </PageHeader>
      <div className="space-y-3">
        {notifications.map((n, i) => {
          const Icon = n.icon;
          return (
            <Card key={i} className={`glass-card p-4 animate-fade-in cursor-pointer hover:shadow-md transition-shadow ${!n.read ? "border-l-2 border-l-primary" : ""}`} style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${typeColor[n.type]} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-sm ${!n.read ? "font-semibold" : ""}`}>{n.title}</h3>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{n.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                </div>
                {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
