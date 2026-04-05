import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Clock, ExternalLink } from "lucide-react";

const sessions = [
  { title: "Ganesh Chaturthi Special", date: "Apr 5, 2026", time: "9:00 AM", status: "upcoming", pandit: "Pandit Ramesh Sharma" },
  { title: "Lakshmi Pooja", date: "Apr 8, 2026", time: "6:00 AM", status: "upcoming", pandit: "Acharya Subramaniam" },
  { title: "Sunderkand Path", date: "Mar 28, 2026", time: "7:00 PM", status: "completed", pandit: "Pandit Vishnu Dev" },
];

const statusColor: Record<string, string> = { upcoming: "bg-sacred-green/10 text-sacred-green", completed: "bg-muted text-muted-foreground" };

export default function MySessions() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="My Sessions" description="Your scheduled and past live pooja sessions" />
      <div className="space-y-4">
        {sessions.map((s, i) => (
          <Card key={i} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-sacred flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold">{s.title}</h3>
                    <Badge className={`${statusColor[s.status]} border-none text-[10px] capitalize`}>{s.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{s.pandit}</p>
                  <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{s.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{s.time}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" className={s.status === "upcoming" ? "gradient-saffron text-primary-foreground" : ""} variant={s.status === "completed" ? "outline" : "default"}>
                {s.status === "upcoming" ? "Join Session" : "View Recording"} <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
