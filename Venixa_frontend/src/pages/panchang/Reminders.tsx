import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, Calendar, Clock, Plus, Trash2 } from "lucide-react";

const reminders = [
  { title: "Ekadashi Fast", schedule: "Every 11th day of lunar cycle", active: true, next: "Apr 7, 2026" },
  { title: "Satyanarayan Katha", schedule: "Monthly - Full Moon Day", active: true, next: "Apr 12, 2026" },
  { title: "Pradosh Vrat", schedule: "Every 13th day of lunar cycle", active: false, next: "Apr 9, 2026" },
  { title: "Sankashti Chaturthi", schedule: "Monthly - 4th day after Full Moon", active: true, next: "Apr 16, 2026" },
];

export default function Reminders() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <PageHeader title="Reminders" description="Set reminders for recurring rituals and festivals">
        <Button className="gradient-saffron text-primary-foreground font-body"><Plus className="w-4 h-4 mr-2" /> Add Reminder</Button>
      </PageHeader>
      <div className="space-y-4">
        {reminders.map((r, i) => (
          <Card key={i} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.schedule}</p>
                  <p className="text-xs text-primary mt-1 flex items-center gap-1"><Calendar className="w-3 h-3" /> Next: {r.next}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch defaultChecked={r.active} />
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
