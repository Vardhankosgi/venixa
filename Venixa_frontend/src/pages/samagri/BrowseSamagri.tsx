import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Package, Search, ShoppingCart, Star } from "lucide-react";

const kits = [
  { name: "Satyanarayan Pooja Kit", items: 21, price: "₹999", rating: 4.8, reviews: 156, category: "Vishnu", bestseller: true },
  { name: "Ganesh Chaturthi Kit", items: 18, price: "₹799", rating: 4.9, reviews: 234, category: "Ganesh", bestseller: true },
  { name: "Navratri Special Kit", items: 25, price: "₹1,299", rating: 4.7, reviews: 89, category: "Devi", bestseller: false },
  { name: "Rudrabhishek Kit", items: 15, price: "₹1,499", rating: 4.8, reviews: 112, category: "Shiva", bestseller: false },
  { name: "Graha Shanti Kit", items: 30, price: "₹1,999", rating: 4.6, reviews: 67, category: "Planetary", bestseller: false },
  { name: "Daily Pooja Essentials", items: 12, price: "₹499", rating: 4.9, reviews: 345, category: "Daily", bestseller: true },
  { name: "Housewarming (Griha Pravesh) Kit", items: 28, price: "₹2,499", rating: 4.7, reviews: 78, category: "Special", bestseller: false },
  { name: "Akhand Ramayan Path Kit", items: 10, price: "₹649", rating: 4.5, reviews: 45, category: "Ram", bestseller: false },
];

export default function BrowseSamagri() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Pooja Samagri Kits" description="Authentic, pre-curated kits for all types of rituals" />
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search kits by pooja name or category..." className="pl-9" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {kits.map((k, i) => (
          <Card key={i} className="glass-card overflow-hidden animate-fade-in group" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="h-36 gradient-saffron relative flex items-center justify-center">
              <Package className="w-12 h-12 text-primary-foreground/60 group-hover:scale-110 transition-transform" />
              {k.bestseller && <Badge className="absolute top-3 left-3 bg-gold text-foreground border-none text-[10px]">Bestseller</Badge>}
              <Badge className="absolute top-3 right-3 bg-background/20 backdrop-blur text-primary-foreground border-none text-[10px]">{k.category}</Badge>
            </div>
            <div className="p-4">
              <h3 className="font-display font-semibold mb-1">{k.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{k.items} items included</p>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                <span className="text-sm font-medium">{k.rating}</span>
                <span className="text-xs text-muted-foreground">({k.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-display font-bold text-primary">{k.price}</span>
                <Button size="sm" className="gradient-saffron text-primary-foreground font-body gap-1">
                  <ShoppingCart className="w-3 h-3" /> Add
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
