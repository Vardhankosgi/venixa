import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

const festivals = [
  { name: "Ram Navami", date: "Apr 6, 2026", month: "April", description: "Birth of Lord Rama", type: "Major" },
  { name: "Hanuman Jayanti", date: "Apr 14, 2026", month: "April", description: "Birth of Lord Hanuman", type: "Major" },
  { name: "Akshaya Tritiya", date: "Apr 26, 2026", month: "April", description: "Auspicious day for new beginnings", type: "Auspicious" },
  { name: "Buddha Purnima", date: "May 12, 2026", month: "May", description: "Birth of Lord Buddha", type: "Major" },
  { name: "Ganga Dussehra", date: "Jun 1, 2026", month: "June", description: "Descent of river Ganga", type: "Regional" },
  { name: "Guru Purnima", date: "Jul 11, 2026", month: "July", description: "Honoring spiritual teachers", type: "Major" },
  { name: "Nag Panchami", date: "Jul 26, 2026", month: "July", description: "Worship of serpent deities", type: "Traditional" },
  { name: "Raksha Bandhan", date: "Aug 12, 2026", month: "August", description: "Bond of protection between siblings", type: "Major" },
  { name: "Janmashtami", date: "Aug 22, 2026", month: "August", description: "Birth of Lord Krishna", type: "Major" },
  { name: "Ganesh Chaturthi", date: "Sep 7, 2026", month: "September", description: "Birth of Lord Ganesh", type: "Major" },
  { name: "Navratri", date: "Oct 1-9, 2026", month: "October", description: "Nine nights of Goddess Durga", type: "Major" },
  { name: "Diwali", date: "Oct 20, 2026", month: "October", description: "Festival of lights", type: "Major" },
];

const typeColor: Record<string, string> = { Major: "bg-primary/10 text-primary", Auspicious: "bg-gold/10 text-gold", Regional: "bg-sky-blue/10 text-sky-blue", Traditional: "bg-sacred-green/10 text-sacred-green" };

export default function FestivalCalendar() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Festival Calendar" description="Upcoming Hindu festivals and celebrations for 2026" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {festivals.map((f, i) => (
          <Card key={i} className="glass-card p-5 animate-fade-in hover:shadow-lg transition-shadow cursor-pointer" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-start justify-between mb-2">
              <Badge className={`${typeColor[f.type]} border-none text-[10px]`}>{f.type}</Badge>
              <span className="text-xs text-muted-foreground">{f.month}</span>
            </div>
            <h3 className="font-display font-semibold text-lg mb-1">{f.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{f.description}</p>
            <p className="text-xs text-primary font-medium flex items-center gap-1"><Calendar className="w-3 h-3" />{f.date}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
