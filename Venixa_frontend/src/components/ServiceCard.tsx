import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient?: string;
}

export function ServiceCard({ title, description, icon: Icon, href, gradient = "gradient-saffron" }: ServiceCardProps) {
  return (
    <Link to={href} className="group block">
      <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="font-display font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
