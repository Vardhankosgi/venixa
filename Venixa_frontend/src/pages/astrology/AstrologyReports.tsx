import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Eye } from "lucide-react";

const reports = [
  { title: "Annual Horoscope 2026", type: "Horoscope", date: "Jan 1, 2026", pages: 24 },
  { title: "Kundali Matching Report", type: "Kundali", date: "Feb 14, 2026", pages: 12 },
  { title: "Vastu Analysis - Home", type: "Vastu", date: "Mar 5, 2026", pages: 18 },
  { title: "Career Prediction Report", type: "Career", date: "Mar 20, 2026", pages: 8 },
];

export default function AstrologyReports() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="My Reports" description="Access your generated astrology and Vastu reports" />
      <div className="space-y-4">
        {reports.map((r, i) => (
          <Card key={i} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">{r.title}</h3>
                  <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                    <Badge variant="secondary" className="text-[10px]">{r.type}</Badge>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{r.date}</span>
                    <span>{r.pages} pages</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1"><Eye className="w-3 h-3" /> View</Button>
                <Button size="sm" className="gradient-saffron text-primary-foreground gap-1"><Download className="w-3 h-3" /> Download</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
