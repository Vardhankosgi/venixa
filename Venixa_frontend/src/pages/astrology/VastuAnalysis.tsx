import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Home, Upload, Compass } from "lucide-react";

export default function VastuAnalysis() {
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <PageHeader title="Vastu Analysis" description="Get expert Vastu guidance for your home or office" />
      <Card className="glass-card p-6 md:p-8">
        <div className="gradient-sacred rounded-xl p-6 mb-6 text-primary-foreground text-center">
          <Compass className="w-10 h-10 mx-auto mb-2" />
          <h2 className="font-display text-xl font-bold">Vastu Shastra Consultation</h2>
          <p className="text-primary-foreground/80 text-sm mt-1">Upload your floor plan for a detailed Vastu analysis</p>
        </div>
        <form className="space-y-5">
          <div className="space-y-2"><Label>Property Type</Label><Input placeholder="e.g. Flat, Independent House, Office" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Total Area (sq ft)</Label><Input type="number" placeholder="e.g. 1200" /></div>
            <div className="space-y-2"><Label>Facing Direction</Label><Input placeholder="e.g. North, East" /></div>
          </div>
          <div className="space-y-2">
            <Label>Upload Floor Plan</Label>
            <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-muted/30 transition-colors">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
              <p className="text-xs text-muted-foreground/60 mt-1">PNG, JPG or PDF up to 10MB</p>
            </div>
          </div>
          <div className="space-y-2"><Label>Specific Concerns</Label><Textarea placeholder="Any specific issues or areas you want analyzed..." rows={3} /></div>
          <Button className="w-full gradient-saffron text-primary-foreground font-body" size="lg">
            <Home className="w-4 h-4 mr-2" /> Get Vastu Analysis
          </Button>
        </form>
      </Card>
    </div>
  );
}
