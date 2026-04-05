import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Users,
  Video,
  Star,
  Package,
  Church,
  GraduationCap,
  Calendar,
  Bot,
  ShoppingBag,
  TrendingUp,
  Clock,
  Heart,
  Flame,
  ArrowRight,
} from "lucide-react";

const upcomingEvents = [
  {
    title: "Ganesh Chaturthi Pooja",
    date: "Apr 5, 2026",
    time: "9:00 AM",
    type: "Live Pooja",
  },
  {
    title: "Consultation with Pandit Sharma",
    date: "Apr 7, 2026",
    time: "11:00 AM",
    type: "Astrology",
  },
  {
    title: "Samagri Kit Delivery",
    date: "Apr 8, 2026",
    time: "By 2:00 PM",
    type: "Delivery",
  },
];

export default function Dashboard() {
  console.log("[Dashboard] Component rendered");
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="gradient-saffron rounded-2xl p-8 md:p-10 mb-8 text-primary-foreground animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-primary-foreground/80 text-sm font-body mb-1">
              🙏 Namaste, Welcome back
            </p>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              SarvaPooja AI
            </h1>
            <p className="text-primary-foreground/80 mt-2 max-w-md font-body">
              Your complete spiritual companion. Plan rituals, book pandits, and
              manage ceremonies with AI assistance.
            </p>
          </div>
          <Button variant="secondary" size="lg" className="font-body gap-2">
            <Bot className="w-4 h-4" /> Ask AI Assistant
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Upcoming Poojas"
          value="3"
          change="+1 this week"
          icon={Flame}
          trend="up"
        />
        <StatCard
          title="Bookings Made"
          value="12"
          change="+4 this month"
          icon={Clock}
          trend="up"
        />
        <StatCard title="Saved Pandits" value="8" icon={Heart} />
        <StatCard
          title="Reward Points"
          value="2,450"
          change="+350 earned"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      {/* Services Grid */}
      <PageHeader
        title="Our Services"
        description="Explore the full range of spiritual services"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        <ServiceCard
          title="Pandit Booking"
          description="Find verified pandits for all rituals"
          icon={Users}
          href="/pandits/find"
        />
        <ServiceCard
          title="Live Online Pooja"
          description="Participate in poojas remotely"
          icon={Video}
          href="/live-pooja/browse"
          gradient="gradient-sacred"
        />
        <ServiceCard
          title="Astrology & Vastu"
          description="Horoscopes, Kundali & consultations"
          icon={Star}
          href="/astrology/horoscope"
        />
        <ServiceCard
          title="Pooja Samagri"
          description="Authentic kits & materials delivered"
          icon={Package}
          href="/samagri/browse"
          gradient="gradient-sacred"
        />
        <ServiceCard
          title="Temple Services"
          description="Book poojas & darshan at temples"
          icon={Church}
          href="/temples/find"
        />
        <ServiceCard
          title="Vedapatashala"
          description="Learn Vedas & spiritual courses"
          icon={GraduationCap}
          href="/vedapatashala/courses"
          gradient="gradient-sacred"
        />
        <ServiceCard
          title="Panchang & Muhurat"
          description="Daily panchang & auspicious times"
          icon={Calendar}
          href="/panchang/daily"
        />
        <ServiceCard
          title="Spiritual Store"
          description="Books, idols & spiritual merchandise"
          icon={ShoppingBag}
          href="/shop/browse"
          gradient="gradient-sacred"
        />
      </div>

      {/* Upcoming Events */}
      <PageHeader
        title="Upcoming Events"
        description="Your scheduled rituals and deliveries"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {upcomingEvents.map((event, i) => (
          <Card
            key={i}
            className="p-5 glass-card animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-body px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {event.type}
              </span>
            </div>
            <h3 className="font-display font-semibold mb-2">{event.title}</h3>
            <p className="text-sm text-muted-foreground font-body">
              {event.date} • {event.time}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 text-primary gap-1 p-0 h-auto font-body"
            >
              View Details <ArrowRight className="w-3 h-3" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
