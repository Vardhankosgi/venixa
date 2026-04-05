import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Truck } from "lucide-react";

export default function PrasadDelivery() {
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <PageHeader title="Prasad Delivery" description="Get blessed prasad delivered from sacred temples to your doorstep" />
      <Card className="glass-card p-6 md:p-8">
        <div className="gradient-saffron rounded-xl p-6 mb-6 text-primary-foreground text-center">
          <Package className="w-10 h-10 mx-auto mb-2" />
          <h2 className="font-display text-xl font-bold">Temple Prasad at Your Door</h2>
          <p className="text-primary-foreground/80 text-sm mt-1">Fresh prasad delivered within 2-5 days</p>
        </div>
        <form className="space-y-5">
          <div className="space-y-2">
            <Label>Select Temple</Label>
            <Select><SelectTrigger><SelectValue placeholder="Choose temple" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="tirupati">Tirupati Balaji - Laddu Prasadam (₹300)</SelectItem>
                <SelectItem value="puri">Jagannath Puri - Mahaprasad (₹250)</SelectItem>
                <SelectItem value="siddhivinayak">Siddhivinayak - Modak (₹200)</SelectItem>
                <SelectItem value="kashi">Kashi Vishwanath - Special Prasad (₹350)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label>Full Name</Label><Input placeholder="Enter your name" /></div>
          <div className="space-y-2"><Label>Delivery Address</Label><Input placeholder="Complete address with pincode" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Phone Number</Label><Input placeholder="+91" /></div>
            <div className="space-y-2"><Label>Quantity</Label><Input type="number" placeholder="1" min="1" max="10" /></div>
          </div>
          <Button className="w-full gradient-saffron text-primary-foreground font-body" size="lg">
            <Truck className="w-4 h-4 mr-2" /> Order Prasad
          </Button>
        </form>
      </Card>
    </div>
  );
}
