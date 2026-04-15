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
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      {(priceRange || typicalDuration) && (
        <div>
          {priceRange && <span>{priceRange}</span>}
          {typicalDuration && <span>{typicalDuration}</span>}
        </div>
      )}
      {benefits && benefits.length > 0 && (
        <ul>
          {benefits.map((b) => <li key={b}>{b}</li>)}
        </ul>
      )}
      {keywords && keywords.length > 0 && (
        <ul>
          {keywords.map((kw) => <li key={kw}>{kw}</li>)}
        </ul>
      )}
    </div>
  );
}
