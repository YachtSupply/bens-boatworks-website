import { FiTool, FiZap, FiUsers, FiCheck, FiAnchor, FiNavigation, FiDroplet } from 'react-icons/fi';

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
}

export function ServiceCard({ name, description, icon, keywords, benefits, priceRange, typicalDuration }: ServiceCardProps) {
  return (
    <div className="service-card bg-white p-7 group flex flex-col">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gold/10 text-gold mb-5 group-hover:bg-gold group-hover:text-white transition-all duration-300">
        {iconMap[icon] ?? iconMap.anchor}
      </div>
      <h3 className="font-heading text-lg font-bold text-navy mb-2">{name}</h3>
      <p className="text-text-light text-sm leading-relaxed font-sans line-clamp-4 flex-1">{description}</p>
      {(priceRange || typicalDuration) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {priceRange && (
            <span className="accent-badge">
              {priceRange}
            </span>
          )}
          {typicalDuration && (
            <span className="accent-badge">
              {typicalDuration}
            </span>
          )}
        </div>
      )}
      {benefits && benefits.length > 0 && (
        <ul className="mt-4 space-y-2">
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
        <div className="mt-4 flex flex-wrap gap-1.5">
          {keywords.map((kw) => (
            <span key={kw} className="text-xs font-sans text-text-light bg-cream px-2 py-0.5 rounded-md">
              {kw}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
