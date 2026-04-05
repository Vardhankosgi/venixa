import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Star, ArrowRight } from "lucide-react";

const signs = [
  { name: "Aries (Mesh)", prediction: "A great day for new beginnings. Financial gains likely.", lucky: "Red", number: 9 },
  { name: "Taurus (Vrishabh)", prediction: "Focus on relationships today. Good time for investments.", lucky: "Green", number: 6 },
  { name: "Gemini (Mithun)", prediction: "Communication skills at peak. Career opportunities ahead.", lucky: "Yellow", number: 5 },
  { name: "Cancer (Kark)", prediction: "Family matters need attention. Health looks good.", lucky: "White", number: 2 },
  { name: "Leo (Simha)", prediction: "Leadership qualities shine today. Recognition at work.", lucky: "Gold", number: 1 },
  { name: "Virgo (Kanya)", prediction: "Analytical skills help solve problems. Good for studies.", lucky: "Green", number: 5 },
  { name: "Libra (Tula)", prediction: "Balance in all matters. Partnership prospects improve.", lucky: "Blue", number: 6 },
  { name: "Scorpio (Vrishchik)", prediction: "Intense day with emotional depth. Transform challenges.", lucky: "Maroon", number: 8 },
  { name: "Sagittarius (Dhanu)", prediction: "Travel plans may materialize. Spiritual growth indicated.", lucky: "Purple", number: 3 },
  { name: "Capricorn (Makar)", prediction: "Hard work pays off today. Long-term goals advance.", lucky: "Black", number: 8 },
  { name: "Aquarius (Kumbh)", prediction: "Innovation leads to success. Social connections expand.", lucky: "Blue", number: 4 },
  { name: "Pisces (Meen)", prediction: "Creative energy flows freely. Intuition is strong today.", lucky: "Sea Green", number: 7 },
];

export default function Horoscope() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <PageHeader title="Daily Horoscope" description="Your personalized astrological predictions for today" />

      <div className="gradient-saffron rounded-2xl p-6 md:p-8 mb-8 text-primary-foreground">
        <div className="flex items-center gap-3 mb-2">
          <Sun className="w-6 h-6" />
          <h2 className="font-display text-xl font-bold">Today's Cosmic Energy</h2>
        </div>
        <p className="text-primary-foreground/80 text-sm max-w-2xl">
          April 1, 2026 — The Sun in Aries brings initiative and courage. Moon enters Taurus bringing stability and grounding energy. Favorable day for spiritual practices and new beginnings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {signs.map((s, i) => (
          <Card key={i} className="glass-card p-5 animate-fade-in cursor-pointer hover:shadow-lg transition-shadow" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-gold" />
              <h3 className="font-display font-semibold">{s.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{s.prediction}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Lucky: {s.lucky}</span>
              <span>Number: {s.number}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
