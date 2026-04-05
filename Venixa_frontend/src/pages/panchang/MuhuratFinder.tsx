import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, Clock, Star } from "lucide-react";

const muhurats = [
  { event: "Griha Pravesh", date: "Apr 5, 2026", time: "10:15 AM - 11:45 AM", quality: "Excellent" },
  { event: "Vehicle Purchase", date: "Apr 8, 2026", time: "9:00 AM - 10:30 AM", quality: "Good" },
  { event: "Business Opening", date: "Apr 12, 2026", time: "7:30 AM - 9:00 AM", quality: "Excellent" },
  { event: "Marriage", date: "Apr 22, 2026", time: "11:00 AM - 1:00 PM", quality: "Excellent" },
  { event: "Name Ceremony", date: "Apr 15, 2026", time: "8:00 AM - 9:30 AM", quality: "Good" },
];

const qualityColor: Record<string, string> = { Excellent: "bg-sacred-green/10 text-sacred-green", Good: "bg-gold/10 text-gold" };

export default function MuhuratFinder() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <PageHeader title="Muhurat Finder" description="Find the most auspicious date & time for your events" />
      <Card className="glass-card p-6 mb-8">
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Event Type</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select event" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="marriage">Marriage</SelectItem>
                <SelectItem value="griha">Griha Pravesh</SelectItem>
                <SelectItem value="business">Business Opening</SelectItem>
                <SelectItem value="vehicle">Vehicle Purchase</SelectItem>
                <SelectItem value="naming">Name Ceremony</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>From Date</Label><Input type="date" /></div>
          <div className="space-y-2"><Label>To Date</Label><Input type="date" /></div>
        </form>
        <Button className="mt-4 gradient-saffron text-primary-foreground font-body"><Search className="w-4 h-4 mr-2" /> Find Muhurat</Button>
      </Card>

      <h2 className="font-display text-xl font-semibold mb-4">Upcoming Auspicious Muhurats</h2>
      <div className="space-y-3">
        {muhurats.map((m, i) => (
          <Card key={i} className="glass-card p-4 animate-fade-in flex items-center justify-between" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{m.event}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{m.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{m.time}</span>
                </p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${qualityColor[m.quality]}`}>{m.quality}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
