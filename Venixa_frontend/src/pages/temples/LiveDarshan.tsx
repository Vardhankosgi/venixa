import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Users, Play } from "lucide-react";

const streams = [
  { temple: "Kashi Vishwanath", location: "Varanasi", live: true, viewers: 1250, event: "Morning Aarti" },
  { temple: "Siddhivinayak", location: "Mumbai", live: true, viewers: 890, event: "Darshan" },
  { temple: "Tirupati Balaji", location: "Tirumala", live: false, viewers: 0, event: "Next: Evening Aarti at 6 PM" },
  { temple: "Meenakshi Amman", location: "Madurai", live: true, viewers: 560, event: "Abhishekam" },
];

export default function LiveDarshan() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Live Darshan" description="Watch live temple darshan from sacred temples across India" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {streams.map((s, i) => (
          <Card key={i} className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="h-48 gradient-sacred relative flex items-center justify-center cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-background/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </div>
              {s.live && (
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground border-none gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" /> LIVE
                </Badge>
              )}
              {s.live && (
                <Badge className="absolute top-4 right-4 bg-background/20 backdrop-blur text-primary-foreground border-none gap-1">
                  <Users className="w-3 h-3" /> {s.viewers.toLocaleString()}
                </Badge>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-display font-semibold text-lg">{s.temple}</h3>
              <p className="text-sm text-muted-foreground">{s.location} • {s.event}</p>
              <Button className={`mt-4 w-full font-body ${s.live ? "gradient-saffron text-primary-foreground" : ""}`} variant={s.live ? "default" : "outline"}>
                <Video className="w-4 h-4 mr-2" /> {s.live ? "Watch Live" : "Set Reminder"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
