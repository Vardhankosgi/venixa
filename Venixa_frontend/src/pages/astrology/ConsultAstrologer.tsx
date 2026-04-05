import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, Phone, Video, Clock, Languages } from "lucide-react";

const astrologers = [
  { name: "Jyotishi Raghunath", speciality: "Vedic Astrology", rating: 4.9, consultations: 1500, price: "₹500/30min", languages: ["Hindi", "English"], available: true, mode: ["Chat", "Call", "Video"] },
  { name: "Pandit Suresh Kumar", speciality: "KP Astrology", rating: 4.7, consultations: 800, price: "₹700/30min", languages: ["Hindi", "Sanskrit"], available: true, mode: ["Call", "Video"] },
  { name: "Dr. Lakshmi Narayan", speciality: "Nadi Astrology", rating: 4.8, consultations: 2200, price: "₹1,000/30min", languages: ["Tamil", "English"], available: false, mode: ["Video"] },
  { name: "Acharya Pradeep Joshi", speciality: "Lal Kitab", rating: 4.6, consultations: 600, price: "₹400/30min", languages: ["Hindi", "Gujarati"], available: true, mode: ["Chat", "Call"] },
];

const modeIcons: Record<string, any> = { Chat: MessageSquare, Call: Phone, Video: Video };

export default function ConsultAstrologer() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Consult Astrologer" description="Get personalized astrological guidance from experts" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {astrologers.map((a, i) => (
          <Card key={i} className="glass-card p-6 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl gradient-sacred flex items-center justify-center shrink-0">
                <Star className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-lg">{a.name}</h3>
                  {a.available ? <Badge className="bg-sacred-green/10 text-sacred-green border-none text-[10px]">Online</Badge> : <Badge variant="secondary" className="text-[10px]">Offline</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{a.speciality} • {a.consultations}+ consultations</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                  <span className="text-sm font-medium">{a.rating}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Languages className="w-3.5 h-3.5 text-muted-foreground" />
                  {a.languages.map(l => <Badge key={l} variant="secondary" className="text-[10px]">{l}</Badge>)}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {a.mode.map(m => { const Icon = modeIcons[m]; return <Badge key={m} variant="outline" className="text-[10px] gap-1"><Icon className="w-3 h-3" />{m}</Badge>; })}
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <span className="font-display font-bold text-primary">{a.price}</span>
                  <Button size="sm" className="gradient-saffron text-primary-foreground font-body" disabled={!a.available}>Consult Now</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
