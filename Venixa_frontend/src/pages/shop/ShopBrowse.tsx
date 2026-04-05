import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Star, Heart, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const products = [
  { name: "Brass Ganesh Idol - Medium", category: "Idols", price: "₹1,299", originalPrice: "₹1,799", rating: 4.8, reviews: 156, discount: "28% off" },
  { name: "Sandalwood Mala (108 beads)", category: "Accessories", price: "₹899", originalPrice: "₹1,200", rating: 4.9, reviews: 234, discount: "25% off" },
  { name: "Bhagavad Gita - Deluxe Edition", category: "Books", price: "₹499", originalPrice: null, rating: 4.7, reviews: 89, discount: null },
  { name: "Copper Pooja Thali Set", category: "Utensils", price: "₹1,599", originalPrice: "₹2,000", rating: 4.6, reviews: 67, discount: "20% off" },
  { name: "Incense Gift Box (12 fragrances)", category: "Samagri", price: "₹399", originalPrice: null, rating: 4.5, reviews: 312, discount: null },
  { name: "Marble Krishna Idol - Large", category: "Idols", price: "₹3,999", originalPrice: "₹5,499", rating: 4.9, reviews: 45, discount: "27% off" },
  { name: "Pooja Bell (Ghanta) - Brass", category: "Utensils", price: "₹349", originalPrice: null, rating: 4.4, reviews: 198, discount: null },
  { name: "Yoga & Meditation Guide Book", category: "Books", price: "₹299", originalPrice: "₹450", rating: 4.3, reviews: 78, discount: "33% off" },
];

export default function ShopBrowse() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Spiritual Store" description="Books, idols, samagri, and spiritual merchandise">
        <Button variant="outline" className="gap-1"><Filter className="w-4 h-4" /> Filters</Button>
      </PageHeader>

      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-9" />
        </div>
        <Select><SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="idols">Idols</SelectItem>
            <SelectItem value="books">Books</SelectItem>
            <SelectItem value="utensils">Utensils</SelectItem>
            <SelectItem value="samagri">Samagri</SelectItem>
          </SelectContent>
        </Select>
        <Select><SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Sort by" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((p, i) => (
          <Card key={i} className="glass-card overflow-hidden animate-fade-in group" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="h-40 gradient-saffron relative flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 text-primary-foreground/40 group-hover:scale-110 transition-transform" />
              {p.discount && <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground border-none text-[10px]">{p.discount}</Badge>}
              <Button variant="ghost" size="icon" className="absolute top-3 right-3 text-primary-foreground/60 hover:text-primary-foreground"><Heart className="w-4 h-4" /></Button>
            </div>
            <div className="p-4">
              <Badge variant="secondary" className="text-[10px] mb-2">{p.category}</Badge>
              <h3 className="font-body font-semibold text-sm mb-1 line-clamp-2">{p.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-3 h-3 text-gold fill-gold" /><span className="text-xs">{p.rating} ({p.reviews})</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-display font-bold text-primary">{p.price}</span>
                {p.originalPrice && <span className="text-sm text-muted-foreground line-through">{p.originalPrice}</span>}
              </div>
              <Button size="sm" className="w-full gradient-saffron text-primary-foreground font-body gap-1">
                <ShoppingCart className="w-3 h-3" /> Add to Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
