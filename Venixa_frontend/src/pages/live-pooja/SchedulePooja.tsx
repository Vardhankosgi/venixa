import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Video } from "lucide-react";

export default function SchedulePooja() {
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <PageHeader title="Schedule a Pooja" description="Book a personalized online pooja session" />
      <Card className="glass-card p-6 md:p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Pooja Type</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select pooja type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="satyanarayan">Satyanarayan Katha</SelectItem>
                  <SelectItem value="ganesh">Ganesh Pooja</SelectItem>
                  <SelectItem value="lakshmi">Lakshmi Pooja</SelectItem>
                  <SelectItem value="rudra">Rudrabhishekam</SelectItem>
                  <SelectItem value="navagraha">Navagraha Shanti</SelectItem>
                  <SelectItem value="custom">Custom / Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Preferred Language</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="sanskrit">Sanskrit</SelectItem>
                  <SelectItem value="tamil">Tamil</SelectItem>
                  <SelectItem value="telugu">Telugu</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Preferred Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="date" className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Preferred Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="time" className="pl-9" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Number of Participants</Label>
            <Input type="number" placeholder="e.g. 5" min="1" max="100" />
          </div>
          <div className="space-y-2">
            <Label>Special Requirements</Label>
            <Textarea placeholder="Any specific mantras, rituals, or requirements..." rows={4} />
          </div>
          <Button className="w-full gradient-saffron text-primary-foreground font-body" size="lg">
            <Video className="w-4 h-4 mr-2" /> Schedule Pooja
          </Button>
        </form>
      </Card>
    </div>
  );
}
