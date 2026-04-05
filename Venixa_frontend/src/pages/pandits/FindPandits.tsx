import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Clock, Filter, Languages } from "lucide-react";

const pandits = [
  { name: "Pandit Ramesh Sharma", location: "Mumbai, Maharashtra", rating: 4.9, reviews: 234, speciality: "Vedic Rituals", languages: ["Hindi", "Sanskrit"], experience: "15 years", price: "₹2,500", available: true },
  { name: "Acharya Subramaniam", location: "Chennai, Tamil Nadu", rating: 4.8, reviews: 189, speciality: "Homam & Havans", languages: ["Tamil", "Sanskrit", "English"], experience: "20 years", price: "₹3,000", available: true },
  { name: "Pandit Vishnu Dev", location: "Varanasi, UP", rating: 4.7, reviews: 312, speciality: "Graha Shanti", languages: ["Hindi", "Sanskrit"], experience: "25 years", price: "₹2,000", available: false },
  { name: "Shastri Govind Patel", location: "Ahmedabad, Gujarat", rating: 4.9, reviews: 156, speciality: "Satyanarayan Katha", languages: ["Gujarati", "Hindi", "Sanskrit"], experience: "12 years", price: "₹1,800", available: true },
  { name: "Pandit Arjun Iyer", location: "Bangalore, Karnataka", rating: 4.6, reviews: 98, speciality: "Navagraha Pooja", languages: ["Kannada", "Tamil", "English"], experience: "10 years", price: "₹2,200", available: true },
  { name: "Acharya Devi Prasad", location: "Delhi NCR", rating: 4.8, reviews: 267, speciality: "Wedding Ceremonies", languages: ["Hindi", "Sanskrit", "English"], experience: "18 years", price: "₹5,000", available: true },
];

export default function FindPandits() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Find Pandits" description="Browse verified pandits for all types of rituals and ceremonies">
        <Button className="gradient-saffron text-primary-foreground font-body">
          <Filter className="w-4 h-4 mr-2" /> Filters
        </Button>
      </PageHeader>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name, speciality, or location..." className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="delhi">Delhi NCR</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="chennai">Chennai</SelectItem>
            <SelectItem value="varanasi">Varanasi</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Speciality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vedic">Vedic Rituals</SelectItem>
            <SelectItem value="homam">Homam & Havans</SelectItem>
            <SelectItem value="graha">Graha Shanti</SelectItem>
            <SelectItem value="wedding">Wedding Ceremonies</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pandit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {pandits.map((pandit, i) => (
          <Card key={i} className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl gradient-saffron flex items-center justify-center shrink-0">
                  <span className="text-xl text-primary-foreground font-display font-bold">
                    {pandit.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-lg truncate">{pandit.name}</h3>
                    {pandit.available ? (
                      <Badge className="bg-sacred-green/10 text-sacred-green border-none text-[10px]">Available</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">Busy</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {pandit.location}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Star className="w-3.5 h-3.5 text-gold fill-gold" /> {pandit.rating} ({pandit.reviews} reviews)
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" /> {pandit.experience}
                  </span>
                </div>
                <p className="text-sm"><span className="text-muted-foreground">Speciality:</span> {pandit.speciality}</p>
                <div className="flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-muted-foreground" />
                  {pandit.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-[10px] px-1.5">{lang}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-lg font-display font-bold text-primary">{pandit.price}</span>
                <Button size="sm" className="gradient-saffron text-primary-foreground font-body" disabled={!pandit.available}>
                  Book Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
