import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Award, Eye } from "lucide-react";

const profiles = [
  { name: "Pandit Ramesh Sharma", location: "Mumbai", rating: 4.9, specialities: ["Vedic Rituals", "Satyanarayan Katha", "Graha Shanti"], verified: true, experience: "15 years" },
  { name: "Acharya Subramaniam", location: "Chennai", rating: 4.8, specialities: ["Homam", "Havans", "Ganapathi Pooja"], verified: true, experience: "20 years" },
  { name: "Shastri Govind Patel", location: "Ahmedabad", rating: 4.9, specialities: ["Satyanarayan Katha", "Rudrabhishek"], verified: true, experience: "12 years" },
  { name: "Pandit Arjun Iyer", location: "Bangalore", rating: 4.6, specialities: ["Navagraha Pooja", "Lakshmi Pooja"], verified: false, experience: "10 years" },
];

export default function PanditProfiles() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Pandit Profiles" description="Explore verified pandit profiles and their expertise" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {profiles.map((p, i) => (
          <Card key={i} className="glass-card p-6 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl gradient-saffron flex items-center justify-center shrink-0">
                <span className="text-2xl text-primary-foreground font-display font-bold">{p.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-lg">{p.name}</h3>
                  {p.verified && <Award className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{p.location} • {p.experience}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                  <span className="text-sm font-medium">{p.rating}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.specialities.map((s) => (
                    <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="text-primary gap-1 mt-3 p-0 h-auto">
                  <Eye className="w-3 h-3" /> View Full Profile
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
