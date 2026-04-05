import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Church } from "lucide-react";

export default function BookTemplePooja() {
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <PageHeader title="Book Temple Pooja" description="Book a pooja at your preferred temple" />
      <Card className="glass-card p-6 md:p-8">
        <form className="space-y-5">
          <div className="space-y-2">
            <Label>Select Temple</Label>
            <Select><SelectTrigger><SelectValue placeholder="Choose a temple" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="siddhivinayak">Siddhivinayak Temple, Mumbai</SelectItem>
                <SelectItem value="meenakshi">Meenakshi Temple, Madurai</SelectItem>
                <SelectItem value="kashi">Kashi Vishwanath, Varanasi</SelectItem>
                <SelectItem value="tirupati">Tirupati Balaji, Tirumala</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Pooja Type</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select pooja" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="abhishekam">Abhishekam</SelectItem>
                <SelectItem value="archana">Archana</SelectItem>
                <SelectItem value="homam">Homam</SelectItem>
                <SelectItem value="special">Special Darshan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Date</Label><Input type="date" /></div>
            <div className="space-y-2">
              <Label>Time Slot</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select slot" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (6-9 AM)</SelectItem>
                  <SelectItem value="midmorning">Mid-Morning (9-12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (3-6 PM)</SelectItem>
                  <SelectItem value="evening">Evening (6-9 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2"><Label>Devotee Name(s)</Label><Input placeholder="Enter names (comma separated)" /></div>
          <div className="space-y-2"><Label>Gotra</Label><Input placeholder="Enter gotra (optional)" /></div>
          <Button className="w-full gradient-saffron text-primary-foreground font-body" size="lg">
            <Church className="w-4 h-4 mr-2" /> Book Pooja
          </Button>
        </form>
      </Card>
    </div>
  );
}
