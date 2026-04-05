import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { GraduationCap, Clock, Users, Star, Search, Play } from "lucide-react";

const courses = [
  { title: "Introduction to Vedas", instructor: "Acharya Raghav", duration: "12 weeks", students: 450, rating: 4.9, level: "Beginner", price: "₹2,999", lessons: 48, category: "Vedas" },
  { title: "Sanskrit for Beginners", instructor: "Dr. Meera Sharma", duration: "8 weeks", students: 680, rating: 4.8, level: "Beginner", price: "₹1,999", lessons: 32, category: "Language" },
  { title: "Bhagavad Gita Study", instructor: "Swami Vivekanand Das", duration: "16 weeks", students: 1200, rating: 4.9, level: "All Levels", price: "₹3,499", lessons: 64, category: "Scripture" },
  { title: "Mantra Chanting Mastery", instructor: "Pandit Suresh Kumar", duration: "10 weeks", students: 320, rating: 4.7, level: "Intermediate", price: "₹2,499", lessons: 40, category: "Chanting" },
  { title: "Vedic Mathematics", instructor: "Prof. Anirudh Joshi", duration: "6 weeks", students: 550, rating: 4.6, level: "Beginner", price: "₹1,499", lessons: 24, category: "Mathematics" },
  { title: "Advanced Rituals & Procedures", instructor: "Acharya Devi Prasad", duration: "20 weeks", students: 180, rating: 4.8, level: "Advanced", price: "₹4,999", lessons: 80, category: "Rituals" },
];

const levelColor: Record<string, string> = { Beginner: "bg-sacred-green/10 text-sacred-green", Intermediate: "bg-gold/10 text-gold", Advanced: "bg-vermillion/10 text-vermillion", "All Levels": "bg-sky-blue/10 text-sky-blue" };

export default function BrowseCourses() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Vedapatashala" description="Browse spiritual courses and learning programs" />
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search courses..." className="pl-9" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {courses.map((c, i) => (
          <Card key={i} className="glass-card overflow-hidden animate-fade-in group" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="h-36 gradient-sacred relative flex items-center justify-center">
              <GraduationCap className="w-12 h-12 text-primary-foreground/60 group-hover:scale-110 transition-transform" />
              <Badge className={`absolute top-3 left-3 ${levelColor[c.level]} border-none text-[10px]`}>{c.level}</Badge>
              <Badge className="absolute top-3 right-3 bg-background/20 backdrop-blur text-primary-foreground border-none text-[10px]">{c.category}</Badge>
            </div>
            <div className="p-5">
              <h3 className="font-display font-semibold text-lg mb-1">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">By {c.instructor}</p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.duration}</span>
                <span className="flex items-center gap-1"><Play className="w-3 h-3" />{c.lessons} lessons</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.students}</span>
              </div>
              <div className="flex items-center gap-1 mb-4">
                <Star className="w-3.5 h-3.5 text-gold fill-gold" /><span className="text-sm font-medium">{c.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-display font-bold text-primary">{c.price}</span>
                <Button size="sm" className="gradient-saffron text-primary-foreground font-body">Enroll Now</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
