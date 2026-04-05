import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, User, ArrowRight } from "lucide-react";

const bookings = [
  { id: "BK001", pandit: "Pandit Ramesh Sharma", pooja: "Satyanarayan Katha", date: "Apr 10, 2026", time: "9:00 AM", location: "Home Visit - Mumbai", status: "confirmed", amount: "₹3,500" },
  { id: "BK002", pandit: "Acharya Subramaniam", pooja: "Ganapathi Homam", date: "Apr 15, 2026", time: "7:00 AM", location: "Online", status: "pending", amount: "₹2,000" },
  { id: "BK003", pandit: "Pandit Vishnu Dev", pooja: "Graha Shanti Pooja", date: "Mar 20, 2026", time: "10:00 AM", location: "Temple - Varanasi", status: "completed", amount: "₹4,500" },
  { id: "BK004", pandit: "Shastri Govind Patel", pooja: "Navagraha Pooja", date: "Mar 5, 2026", time: "6:00 AM", location: "Home Visit - Ahmedabad", status: "completed", amount: "₹2,800" },
];

const statusColor: Record<string, string> = {
  confirmed: "bg-sacred-green/10 text-sacred-green",
  pending: "bg-gold/10 text-gold",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

export default function MyBookings() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="My Bookings" description="Track and manage all your pandit bookings" />

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {bookings.map((b, i) => (
            <Card key={b.id} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-saffron flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold">{b.pooja}</h3>
                      <Badge className={`${statusColor[b.status]} border-none text-[10px] capitalize`}>{b.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{b.pandit}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{b.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{b.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-display font-bold">{b.amount}</span>
                  <Button variant="ghost" size="sm" className="text-primary gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="upcoming"><p className="text-muted-foreground">Upcoming bookings will appear here.</p></TabsContent>
        <TabsContent value="completed"><p className="text-muted-foreground">Completed bookings will appear here.</p></TabsContent>
        <TabsContent value="cancelled"><p className="text-muted-foreground">Cancelled bookings will appear here.</p></TabsContent>
      </Tabs>
    </div>
  );
}
