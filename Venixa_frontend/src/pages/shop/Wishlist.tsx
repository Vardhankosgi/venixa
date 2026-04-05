import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

const wishlistItems = [
  { name: "Silver Lakshmi Idol", price: "₹4,999", category: "Idols" },
  { name: "Rudraksha Mala - 5 Mukhi", price: "₹1,499", category: "Accessories" },
  { name: "Vedic Mathematics Book Set", price: "₹799", category: "Books" },
  { name: "Crystal Shivling", price: "₹2,999", category: "Idols" },
];

export default function Wishlist() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Wishlist" description="Items you've saved for later" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {wishlistItems.map((item, i) => (
          <Card key={i} className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="h-36 gradient-saffron relative flex items-center justify-center">
              <Heart className="w-10 h-10 text-primary-foreground/40 fill-primary-foreground/40" />
            </div>
            <div className="p-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{item.category}</p>
              <h3 className="font-semibold text-sm mb-2">{item.name}</h3>
              <p className="text-lg font-display font-bold text-primary mb-3">{item.price}</p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 gradient-saffron text-primary-foreground font-body gap-1"><ShoppingCart className="w-3 h-3" /> Add to Cart</Button>
                <Button size="sm" variant="outline"><Trash2 className="w-3 h-3" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
