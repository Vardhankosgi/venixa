import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Download, Calendar } from "lucide-react";

const certs = [
  { title: "Introduction to Vedas - Foundation", course: "Introduction to Vedas", date: "Expected May 2026", status: "in-progress", progress: 65 },
  { title: "Sanskrit Level 1 Certificate", course: "Sanskrit for Beginners", date: "Expected Jun 2026", status: "in-progress", progress: 40 },
];

export default function Certifications() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Certifications" description="Earn certificates upon course completion" />
      <div className="gradient-saffron rounded-2xl p-6 mb-8 text-primary-foreground">
        <div className="flex items-center gap-3 mb-2"><Award className="w-6 h-6" /><h2 className="font-display text-xl font-bold">Your Achievements</h2></div>
        <p className="text-primary-foreground/80 text-sm">Complete courses to earn verified certificates that showcase your spiritual learning journey.</p>
      </div>
      <div className="space-y-4">
        {certs.map((c, i) => (
          <Card key={i} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.course}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-[10px] capitalize">{c.status.replace("-", " ")}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{c.date}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline" disabled><Download className="w-3 h-3 mr-1" /> Download</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
