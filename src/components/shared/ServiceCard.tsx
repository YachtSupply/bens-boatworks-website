import { ArrowUpRight } from 'lucide-react';

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

export function ServiceCard({ name, description, keywords, benefits, priceRange, typicalDuration }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl p-7 flex flex-col h-full group hover:shadow-xl hover:shadow-brand/[0.05] transition-all duration-300 border border-transparent hover:border-accent/20">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-heading text-[17px] font-bold text-brand leading-snug">{name}</h3>
        <ArrowUpRight size={16} strokeWidth={1.5} className="text-ink-light group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
      </div>

      <p className="text-ink-muted text-[14px] leading-relaxed flex-1 mb-5">{description}</p>

      {(priceRange || typicalDuration) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {priceRange && <span className="text-[11px] font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">{priceRange}</span>}
          {typicalDuration && <span className="text-[11px] font-medium text-ink-muted bg-sand px-3 py-1 rounded-full">{typicalDuration}</span>}
        </div>
      )}

      {benefits && benefits.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-[13px] text-ink">
              <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {keywords && keywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-sand-dark">
          {keywords.map((kw) => (
            <span key={kw} className="text-[11px] text-ink-light">{kw}</span>
          ))}
        </div>
      )}
    </div>
  );
}
