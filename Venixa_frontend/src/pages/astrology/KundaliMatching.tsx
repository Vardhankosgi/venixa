import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Search } from "lucide-react";

export default function KundaliMatching() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <PageHeader title="Kundali Matching" description="Check compatibility between two horoscopes for marriage" />
      <Card className="glass-card p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Partner 1 */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-primary flex items-center gap-2">
              <Heart className="w-4 h-4" /> Partner 1 (Boy)
            </h3>
            <div className="space-y-2"><Label>Full Name</Label><Input placeholder="Enter name" /></div>
            <div className="space-y-2"><Label>Date of Birth</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>Time of Birth</Label><Input type="time" /></div>
            <div className="space-y-2"><Label>Place of Birth</Label><Input placeholder="Enter city" /></div>
          </div>
          {/* Partner 2 */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-vermillion flex items-center gap-2">
              <Heart className="w-4 h-4" /> Partner 2 (Girl)
            </h3>
            <div className="space-y-2"><Label>Full Name</Label><Input placeholder="Enter name" /></div>
            <div className="space-y-2"><Label>Date of Birth</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>Time of Birth</Label><Input type="time" /></div>
            <div className="space-y-2"><Label>Place of Birth</Label><Input placeholder="Enter city" /></div>
          </div>
        </div>
        <Button className="w-full mt-8 gradient-saffron text-primary-foreground font-body" size="lg">
          <Search className="w-4 h-4 mr-2" /> Match Kundali
        </Button>
      </Card>
    </div>
  );
}
