import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Moon, Clock, Star, Sunrise, Sunset } from "lucide-react";

const panchangData = {
  date: "April 1, 2026 - Tuesday",
  tithi: "Shukla Chaturthi",
  nakshatra: "Rohini",
  yoga: "Shobhana",
  karana: "Vanija",
  sunrise: "6:18 AM",
  sunset: "6:42 PM",
  moonrise: "9:15 AM",
  moonset: "10:45 PM",
  rahukalam: "3:00 PM - 4:30 PM",
  yamagandam: "9:00 AM - 10:30 AM",
  gulika: "12:00 PM - 1:30 PM",
  abhijit: "12:00 PM - 12:48 PM",
};

const auspicious = ["Brahma Muhurta: 4:30 AM - 5:18 AM", "Abhijit Muhurta: 12:00 PM - 12:48 PM", "Amrit Kalam: 2:15 PM - 3:45 PM"];
const inauspicious = ["Rahu Kalam: 3:00 PM - 4:30 PM", "Yamagandam: 9:00 AM - 10:30 AM", "Gulika Kalam: 12:00 PM - 1:30 PM"];

export default function DailyPanchang() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Daily Panchang" description="Complete daily panchang with auspicious timings" />

      <div className="gradient-saffron rounded-2xl p-6 md:p-8 mb-8 text-primary-foreground">
        <h2 className="font-display text-2xl font-bold mb-1">{panchangData.date}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div><p className="text-primary-foreground/60 text-xs">Tithi</p><p className="font-semibold">{panchangData.tithi}</p></div>
          <div><p className="text-primary-foreground/60 text-xs">Nakshatra</p><p className="font-semibold">{panchangData.nakshatra}</p></div>
          <div><p className="text-primary-foreground/60 text-xs">Yoga</p><p className="font-semibold">{panchangData.yoga}</p></div>
          <div><p className="text-primary-foreground/60 text-xs">Karana</p><p className="font-semibold">{panchangData.karana}</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="glass-card p-4 text-center"><Sunrise className="w-6 h-6 mx-auto text-gold mb-1" /><p className="text-xs text-muted-foreground">Sunrise</p><p className="font-display font-bold">{panchangData.sunrise}</p></Card>
        <Card className="glass-card p-4 text-center"><Sunset className="w-6 h-6 mx-auto text-vermillion mb-1" /><p className="text-xs text-muted-foreground">Sunset</p><p className="font-display font-bold">{panchangData.sunset}</p></Card>
        <Card className="glass-card p-4 text-center"><Moon className="w-6 h-6 mx-auto text-sky-blue mb-1" /><p className="text-xs text-muted-foreground">Moonrise</p><p className="font-display font-bold">{panchangData.moonrise}</p></Card>
        <Card className="glass-card p-4 text-center"><Moon className="w-6 h-6 mx-auto text-muted-foreground mb-1" /><p className="text-xs text-muted-foreground">Moonset</p><p className="font-display font-bold">{panchangData.moonset}</p></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card p-5">
          <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2 text-sacred-green"><Star className="w-5 h-5" /> Auspicious Times</h3>
          <ul className="space-y-3">
            {auspicious.map((a, i) => <li key={i} className="text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sacred-green shrink-0" />{a}</li>)}
          </ul>
        </Card>
        <Card className="glass-card p-5">
          <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2 text-destructive"><Clock className="w-5 h-5" /> Inauspicious Times</h3>
          <ul className="space-y-3">
            {inauspicious.map((a, i) => <li key={i} className="text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-destructive shrink-0" />{a}</li>)}
          </ul>
        </Card>
      </div>
    </div>
  );
}
