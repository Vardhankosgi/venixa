import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";

const cartItems = [
  { name: "Brass Ganesh Idol - Medium", price: 1299, quantity: 1 },
  { name: "Sandalwood Mala (108 beads)", price: 899, quantity: 2 },
  { name: "Bhagavad Gita - Deluxe Edition", price: 499, quantity: 1 },
];

export default function Cart() {
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = 99;
  const total = subtotal + delivery;

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <PageHeader title="Shopping Cart" description={`${cartItems.length} items in your cart`} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, i) => (
            <Card key={i} className="glass-card p-4 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg gradient-saffron flex items-center justify-center shrink-0">
                    <ShoppingCart className="w-6 h-6 text-primary-foreground/60" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-primary font-display font-bold">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 border rounded-lg px-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Minus className="w-3 h-3" /></Button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Plus className="w-3 h-3" /></Button>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Card className="glass-card p-5 h-fit">
          <h3 className="font-display font-semibold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>₹{delivery}</span></div>
            <Separator />
            <div className="flex justify-between font-display font-bold text-lg"><span>Total</span><span className="text-primary">₹{total.toLocaleString()}</span></div>
          </div>
          <div className="flex gap-2 mt-4">
            <Input placeholder="Coupon code" className="flex-1" />
            <Button variant="outline">Apply</Button>
          </div>
          <Button className="w-full mt-4 gradient-saffron text-primary-foreground font-body" size="lg">
            Checkout <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
