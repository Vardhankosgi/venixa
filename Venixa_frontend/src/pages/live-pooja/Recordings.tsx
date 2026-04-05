import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock, Calendar, Download } from "lucide-react";

const recordings = [
  { title: "Sunderkand Path", pandit: "Pandit Vishnu Dev", date: "Mar 28, 2026", duration: "2h 30m" },
  { title: "Maha Lakshmi Pooja", pandit: "Acharya Subramaniam", date: "Mar 15, 2026", duration: "1h 45m" },
  { title: "Rudrabhishekam", pandit: "Shastri Govind Patel", date: "Feb 20, 2026", duration: "3h 10m" },
];

export default function Recordings() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Recordings" description="Watch recordings of your past live pooja sessions" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {recordings.map((r, i) => (
          <Card key={i} className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="h-36 gradient-sacred flex items-center justify-center cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-background/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-display font-semibold mb-1">{r.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">By {r.pandit}</p>
              <div className="flex gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{r.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{r.duration}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 gradient-saffron text-primary-foreground font-body">Watch</Button>
                <Button size="sm" variant="outline"><Download className="w-4 h-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
