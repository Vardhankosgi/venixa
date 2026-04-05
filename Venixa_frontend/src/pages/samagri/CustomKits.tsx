import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Package, Plus, Minus } from "lucide-react";

const items = [
  { name: "Kumkum (Sindoor)", price: 50, selected: true },
  { name: "Turmeric (Haldi)", price: 40, selected: true },
  { name: "Incense Sticks (Agarbatti)", price: 80, selected: true },
  { name: "Camphor (Kapur)", price: 60, selected: false },
  { name: "Ghee Lamp Wicks", price: 30, selected: true },
  { name: "Betel Leaves & Nuts", price: 100, selected: false },
  { name: "Coconut", price: 50, selected: true },
  { name: "Flowers (Marigold)", price: 150, selected: false },
  { name: "Sacred Thread (Mauli)", price: 20, selected: true },
  { name: "Rice (Akshat)", price: 30, selected: true },
  { name: "Sandalwood Paste", price: 120, selected: false },
  { name: "Prasad Sweets", price: 200, selected: false },
];

export default function CustomKits() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <PageHeader title="Custom Samagri Kit" description="Build your own pooja kit with exactly what you need" />
      <Card className="glass-card p-6 md:p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Pooja Type</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select pooja" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="satyanarayan">Satyanarayan Katha</SelectItem>
                  <SelectItem value="ganesh">Ganesh Pooja</SelectItem>
                  <SelectItem value="lakshmi">Lakshmi Pooja</SelectItem>
                  <SelectItem value="custom">Custom Selection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Delivery Address</Label>
              <Input placeholder="Enter delivery pincode" />
            </div>
          </div>

          <div>
            <Label className="mb-3 block">Select Items</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <Checkbox defaultChecked={item.selected} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-primary">₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Estimated Total</p>
              <p className="text-2xl font-display font-bold text-primary">₹580</p>
            </div>
            <Button className="gradient-saffron text-primary-foreground font-body" size="lg">
              <Package className="w-4 h-4 mr-2" /> Order Custom Kit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
