import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Clock, Users, Calendar } from "lucide-react";

const classes = [
  { title: "Vedic Chanting Practice", teacher: "Acharya Raghav", date: "Apr 2, 2026", time: "6:00 AM", duration: "1 hour", students: 25, live: true },
  { title: "Bhagavad Gita - Chapter 12", teacher: "Swami Vivekanand Das", date: "Apr 2, 2026", time: "7:00 PM", duration: "1.5 hours", students: 80, live: false },
  { title: "Sanskrit Grammar", teacher: "Dr. Meera Sharma", date: "Apr 3, 2026", time: "10:00 AM", duration: "1 hour", students: 35, live: false },
];

export default function LiveClasses() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Live Classes" description="Attend real-time spiritual learning sessions" />
      <div className="space-y-4">
        {classes.map((c, i) => (
          <Card key={i} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-sacred flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold">{c.title}</h3>
                    {c.live && <Badge className="bg-destructive text-destructive-foreground border-none text-[10px] gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />LIVE NOW</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{c.teacher}</p>
                  <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{c.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.time} • {c.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.students} students</span>
                  </div>
                </div>
              </div>
              <Button className={c.live ? "gradient-saffron text-primary-foreground" : ""} variant={c.live ? "default" : "outline"} size="sm">
                {c.live ? "Join Now" : "Set Reminder"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
