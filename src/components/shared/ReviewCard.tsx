import { FiStar, FiCheckCircle } from 'react-icons/fi';

interface ReviewCardProps {
  author: string;
  rating: number;
  text: string;
  date: string;
  isVerified?: boolean;
  response?: string | null;
  responseDate?: string | null;
  /** Large featured variant for the homepage highlight */
  variant?: 'default' | 'featured';
}

export function ReviewCard({ author, rating, text, date, isVerified, response, responseDate, variant = 'default' }: ReviewCardProps) {
  const formatted = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  const hasResponse = response && response.trim().length > 0;

  if (variant === 'featured') {
    return (
      <div className="relative bg-navy text-white rounded-3xl p-10 md:p-14">
        {/* Large quote mark */}
        <span className="absolute top-6 left-8 text-8xl font-heading font-extrabold text-white/10 leading-none select-none">&ldquo;</span>
        <div className="relative z-10">
          <div className="flex gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar key={i} size={20} className={i < rating ? 'text-gold fill-gold' : 'text-white/20'} strokeWidth={i < rating ? 0 : 1.5} />
            ))}
          </div>
          <p className="text-xl md:text-2xl font-sans leading-relaxed mb-8 text-white/90">
            {text}
          </p>
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gold text-white text-sm font-bold font-heading">
              {author.charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="font-heading font-bold text-white text-sm flex items-center gap-1.5">
                {author}
                {isVerified && <FiCheckCircle className="text-gold" size={14} />}
              </p>
              <p className="text-white/40 text-xs font-sans">{formatted}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default — compact horizontal card
  return (
    <div className={`bg-white rounded-2xl border border-cream-dark p-6 flex flex-col ${hasResponse ? 'h-auto' : 'min-h-[220px]'} hover:shadow-lg hover:-translate-y-1 transition-all`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-navy text-white text-xs font-bold font-heading">
            {author.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="font-heading font-bold text-navy text-sm flex items-center gap-1.5">
              {author}
              {isVerified && <FiCheckCircle className="text-gold" size={13} />}
            </p>
            <p className="text-text-light text-xs font-sans">{formatted}</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <FiStar key={i} size={14} className={i < rating ? 'text-gold fill-gold' : 'text-cream-dark'} strokeWidth={i < rating ? 0 : 1.5} />
          ))}
        </div>
      </div>
      <p className="text-text font-sans text-sm leading-relaxed flex-1 line-clamp-4">
        &ldquo;{text}&rdquo;
      </p>
      {hasResponse && (
        <div className="mt-4 pt-4 border-t border-cream-dark">
          <p className="text-xs font-heading font-bold text-navy mb-1">Owner Response</p>
          <p className="text-text-light font-sans text-sm leading-relaxed line-clamp-2">{response}</p>
        </div>
      )}
    </div>
  );
}
