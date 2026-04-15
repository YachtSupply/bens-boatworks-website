import { Anchor, Compass, Droplets, Wrench, Zap, Users } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  wheel:    <Compass size={22} strokeWidth={1.5} />,
  anchor:   <Anchor size={22} strokeWidth={1.5} />,
  waves:    <Droplets size={22} strokeWidth={1.5} />,
  wrench:   <Wrench size={22} strokeWidth={1.5} />,
  electric: <Zap size={22} strokeWidth={1.5} />,
  engine:   <Wrench size={22} strokeWidth={1.5} />,
  captain:  <Users size={22} strokeWidth={1.5} />,
};

interface ServiceCardProps {
  name: string;
  description: string;
  icon: string;
  keywords?: string[];
  benefits?: string[];
  priceRange?: string | null;
  typicalDuration?: string | null;
  variant?: 'default' | 'horizontal' | 'compact';
  flipped?: boolean;
}

export function ServiceCard({ name, description, icon, keywords, benefits, priceRange, typicalDuration }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg border border-black/[0.06] p-7 flex flex-col h-full group hover:shadow-lg hover:shadow-navy/[0.06] hover:-translate-y-1 transition-all duration-300">
      <div className="w-11 h-11 rounded-lg bg-navy/[0.06] flex items-center justify-center text-gold mb-5">
        {iconMap[icon] ?? iconMap.anchor}
      </div>

      <h3 className="font-sans text-lg font-semibold text-navy mb-2">{name}</h3>
      <p className="text-txt-muted text-sm leading-relaxed flex-1 mb-5">{description}</p>

      {(priceRange || typicalDuration) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {priceRange && (
            <span className="text-xs font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">{priceRange}</span>
          )}
          {typicalDuration && (
            <span className="text-xs font-medium text-txt-muted bg-surface-alt px-3 py-1 rounded-full">{typicalDuration}</span>
          )}
        </div>
      )}

      {benefits && benefits.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-txt">
              <span className="text-gold mt-0.5 text-xs">&#10003;</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {keywords && keywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-black/[0.06]">
          {keywords.map((kw) => (
            <span key={kw} className="text-xs text-txt-muted">{kw}</span>
          ))}
        </div>
      )}
    </div>
  );
}
