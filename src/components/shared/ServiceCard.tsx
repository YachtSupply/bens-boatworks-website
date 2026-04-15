import { FiTool, FiZap, FiUsers, FiCheck, FiAnchor, FiNavigation, FiDroplet, FiArrowRight } from 'react-icons/fi';

const iconMap: Record<string, React.ReactNode> = {
  wheel: <FiNavigation size={24} />,
  anchor: <FiAnchor size={24} />,
  waves: <FiDroplet size={24} />,
  wrench: <FiTool size={24} />,
  electric: <FiZap size={24} />,
  engine: <FiTool size={24} />,
  captain: <FiUsers size={24} />,
};

interface ServiceCardProps {
  name: string;
  description: string;
  icon: string;
  keywords?: string[];
  benefits?: string[];
  priceRange?: string | null;
  typicalDuration?: string | null;
  /** Horizontal layout for homepage alternating blocks */
  variant?: 'default' | 'horizontal' | 'compact';
  /** Flip the icon to the right side */
  flipped?: boolean;
}

export function ServiceCard({ name, description, icon, keywords, benefits, priceRange, typicalDuration, variant = 'default', flipped = false }: ServiceCardProps) {
  if (variant === 'horizontal') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center py-12 ${flipped ? '' : ''}`}>
        {/* Icon side */}
        <div className={`md:col-span-4 flex justify-center ${flipped ? 'md:order-2' : 'md:order-1'}`}>
          <div className="w-28 h-28 rounded-3xl bg-gold/10 flex items-center justify-center text-gold">
            {(() => { const ic = iconMap[icon] ?? iconMap.anchor; return <span className="scale-[2]">{ic}</span>; })()}
          </div>
        </div>
        {/* Content side */}
        <div className={`md:col-span-8 ${flipped ? 'md:order-1 md:text-right' : 'md:order-2'}`}>
          <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-navy mb-3 tracking-tight">{name}</h3>
          <p className="text-text-light text-base leading-relaxed font-sans mb-5 max-w-lg">{description}</p>
          {(priceRange || typicalDuration) && (
            <div className={`flex flex-wrap gap-2 mb-4 ${flipped ? 'md:justify-end' : ''}`}>
              {priceRange && <span className="accent-badge">{priceRange}</span>}
              {typicalDuration && <span className="accent-badge">{typicalDuration}</span>}
            </div>
          )}
          {benefits && benefits.length > 0 && (
            <ul className={`space-y-2 mb-5 ${flipped ? 'md:ml-auto md:max-w-lg' : ''}`}>
              {benefits.slice(0, 4).map((b) => (
                <li key={b} className={`flex items-start gap-2.5 text-sm font-sans text-text ${flipped ? 'md:flex-row-reverse md:text-right' : ''}`}>
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold/10 text-gold mt-0.5 flex-shrink-0">
                    <FiCheck size={11} strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-cream-dark hover:border-gold/30 hover:shadow-lg transition-all group">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 text-gold flex-shrink-0 group-hover:bg-gold group-hover:text-white transition-all">
          {iconMap[icon] ?? iconMap.anchor}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-base font-bold text-navy mb-1">{name}</h3>
          <p className="text-text-light text-sm leading-relaxed font-sans line-clamp-2">{description}</p>
        </div>
      </div>
    );
  }

  // Default — vertical card with left accent border
  return (
    <div className="bg-white border-l-4 border-l-gold border border-cream-dark rounded-r-2xl p-7 group hover:shadow-lg transition-all flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-all">
          {iconMap[icon] ?? iconMap.anchor}
        </div>
        <h3 className="font-heading text-lg font-bold text-navy">{name}</h3>
      </div>
      <p className="text-text-light text-sm leading-relaxed font-sans line-clamp-4 flex-1 mb-4">{description}</p>
      {(priceRange || typicalDuration) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {priceRange && <span className="accent-badge">{priceRange}</span>}
          {typicalDuration && <span className="accent-badge">{typicalDuration}</span>}
        </div>
      )}
      {benefits && benefits.length > 0 && (
        <ul className="space-y-2 mb-4">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-xs font-sans text-text">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-gold/10 text-gold mt-0.5 flex-shrink-0">
                <FiCheck size={10} strokeWidth={3} />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {keywords && keywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {keywords.map((kw) => (
            <span key={kw} className="text-xs font-sans text-text-light bg-cream px-2 py-0.5 rounded-md">{kw}</span>
          ))}
        </div>
      )}
    </div>
  );
}
