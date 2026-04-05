import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Church, MapPin, Star, Search, Clock, Eye } from "lucide-react";

const temples = [
  { name: "Siddhivinayak Temple", location: "Mumbai, Maharashtra", rating: 4.9, deity: "Lord Ganesh", timings: "5:30 AM - 10:00 PM", services: ["Darshan", "Pooja Booking", "Prasad Delivery"], featured: true },
  { name: "Meenakshi Amman Temple", location: "Madurai, Tamil Nadu", rating: 4.8, deity: "Goddess Meenakshi", timings: "5:00 AM - 12:30 PM, 4:00 PM - 10:00 PM", services: ["Live Darshan", "Abhishekam"], featured: true },
  { name: "Kashi Vishwanath Temple", location: "Varanasi, UP", rating: 4.9, deity: "Lord Shiva", timings: "3:00 AM - 11:00 PM", services: ["Darshan", "Rudrabhishek", "Prasad"], featured: true },
  { name: "Tirupati Balaji Temple", location: "Tirumala, Andhra Pradesh", rating: 4.9, deity: "Lord Venkateswara", timings: "3:00 AM - 12:00 AM", services: ["Special Darshan", "Laddu Prasadam"], featured: false },
  { name: "Jagannath Temple", location: "Puri, Odisha", rating: 4.7, deity: "Lord Jagannath", timings: "5:00 AM - 11:00 PM", services: ["Darshan", "Mahaprasad"], featured: false },
  { name: "Somnath Temple", location: "Gujarat", rating: 4.8, deity: "Lord Shiva", timings: "6:00 AM - 9:00 PM", services: ["Darshan", "Light & Sound Show"], featured: false },
];

export default function FindTemples() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Find Temples" description="Discover temples and book spiritual services" />
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search temples by name, deity, or location..." className="pl-9" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {temples.map((t, i) => (
          <Card key={i} className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="h-32 gradient-sacred relative flex items-center justify-center">
              <Church className="w-12 h-12 text-primary-foreground/60" />
              {t.featured && <Badge className="absolute top-3 left-3 bg-gold text-foreground border-none text-[10px]">Featured</Badge>}
            </div>
            <div className="p-5">
              <h3 className="font-display font-semibold text-lg mb-1">{t.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1"><MapPin className="w-3 h-3" />{t.location}</p>
              <p className="text-xs text-muted-foreground mb-2">{t.deity} • <Clock className="w-3 h-3 inline" /> {t.timings}</p>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-3.5 h-3.5 text-gold fill-gold" /><span className="text-sm font-medium">{t.rating}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {t.services.map(s => <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>)}
              </div>
              <Button size="sm" className="w-full gradient-saffron text-primary-foreground font-body"><Eye className="w-3 h-3 mr-1" /> View & Book</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
