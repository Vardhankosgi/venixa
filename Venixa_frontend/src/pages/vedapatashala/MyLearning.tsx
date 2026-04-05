import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, Clock } from "lucide-react";

const enrollments = [
  { title: "Introduction to Vedas", progress: 65, completed: 31, total: 48, nextLesson: "The Four Vedas - Part 3", timeLeft: "4 weeks" },
  { title: "Sanskrit for Beginners", progress: 40, completed: 13, total: 32, nextLesson: "Basic Grammar Rules", timeLeft: "5 weeks" },
  { title: "Bhagavad Gita Study", progress: 20, completed: 13, total: 64, nextLesson: "Chapter 4: Jnana Yoga", timeLeft: "13 weeks" },
];

export default function MyLearning() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="My Learning" description="Track your progress across enrolled courses" />
      <div className="space-y-5">
        {enrollments.map((e, i) => (
          <Card key={i} className="glass-card p-6 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-saffron flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">{e.completed}/{e.total} lessons • {e.timeLeft} remaining</p>
                </div>
              </div>
              <Button size="sm" className="gradient-saffron text-primary-foreground font-body gap-1">
                <Play className="w-3 h-3" /> Continue
              </Button>
            </div>
            <Progress value={e.progress} className="h-2 mb-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{e.progress}% complete</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Next: {e.nextLesson}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
