import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Video, Users, Clock, Calendar, Search, Play } from "lucide-react";

const poojas = [
  { title: "Ganesh Chaturthi Special Pooja", pandit: "Pandit Ramesh Sharma", date: "Apr 5, 2026", time: "9:00 AM", duration: "2 hours", participants: 45, price: "₹501", category: "Festival", live: true },
  { title: "Maha Lakshmi Pooja", pandit: "Acharya Subramaniam", date: "Apr 8, 2026", time: "6:00 AM", duration: "1.5 hours", participants: 120, price: "₹351", category: "Prosperity", live: false },
  { title: "Rudrabhishekam", pandit: "Shastri Govind Patel", date: "Apr 12, 2026", time: "5:30 AM", duration: "3 hours", participants: 30, price: "₹1,100", category: "Shiva", live: false },
  { title: "Sunderkand Path", pandit: "Pandit Vishnu Dev", date: "Apr 14, 2026", time: "7:00 PM", duration: "2.5 hours", participants: 200, price: "Free", category: "Hanuman", live: false },
  { title: "Navagraha Shanti Pooja", pandit: "Pandit Arjun Iyer", date: "Apr 18, 2026", time: "8:00 AM", duration: "2 hours", participants: 15, price: "₹751", category: "Planetary", live: false },
  { title: "Satyanarayana Katha", pandit: "Acharya Devi Prasad", date: "Apr 20, 2026", time: "10:00 AM", duration: "3 hours", participants: 80, price: "₹251", category: "Vishnu", live: false },
];

export default function BrowseLivePooja() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Live Online Pooja" description="Join live poojas from the comfort of your home">
        <Button className="gradient-saffron text-primary-foreground font-body">
          <Video className="w-4 h-4 mr-2" /> Schedule Custom Pooja
        </Button>
      </PageHeader>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search poojas by name, category, or pandit..." className="pl-9" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {poojas.map((p, i) => (
          <Card key={i} className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="h-32 gradient-sacred relative flex items-center justify-center">
              <Play className="w-12 h-12 text-primary-foreground/60" />
              {p.live && (
                <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground border-none text-[10px] gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" /> LIVE
                </Badge>
              )}
              <Badge className="absolute top-3 right-3 bg-background/20 backdrop-blur text-primary-foreground border-none text-[10px]">
                {p.category}
              </Badge>
            </div>
            <div className="p-5">
              <h3 className="font-display font-semibold text-lg mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">By {p.pandit}</p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{p.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.time} • {p.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{p.participants} joined</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-display font-bold text-primary">{p.price}</span>
                <Button size="sm" className="gradient-saffron text-primary-foreground font-body">
                  {p.live ? "Join Now" : "Register"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
