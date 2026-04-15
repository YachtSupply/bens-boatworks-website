import { Star, CheckCircle } from 'lucide-react';

interface ReviewCardProps {
  author: string;
  rating: number;
  text: string;
  date: string;
  isVerified?: boolean;
  response?: string | null;
  responseDate?: string | null;
  variant?: 'default' | 'featured';
}

export function ReviewCard({ author, rating, text, date, isVerified, response, responseDate }: ReviewCardProps) {
  const formatted = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  const hasResponse = response && response.trim().length > 0;

  return (
    <div className="bg-white rounded-lg border border-black/[0.06] p-6 flex flex-col min-h-[240px] hover:shadow-lg hover:shadow-navy/[0.06] hover:-translate-y-1 transition-all duration-300">
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={15}
            strokeWidth={0}
            fill={i < rating ? '#c9a96e' : '#eae6e1'}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-txt text-sm leading-relaxed flex-1 mb-5">
        &ldquo;{text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-black/[0.06]">
        <span className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white text-xs font-semibold">
          {author.charAt(0).toUpperCase()}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-navy flex items-center gap-1.5">
            {author}
            {isVerified && <CheckCircle size={13} className="text-gold" strokeWidth={2} />}
          </p>
          <p className="text-xs text-txt-muted">{formatted}</p>
        </div>
      </div>

      {/* Owner response */}
      {hasResponse && (
        <div className="mt-4 pt-4 border-t border-black/[0.06] bg-surface -mx-6 -mb-6 px-6 pb-6 rounded-b-lg">
          <p className="text-xs font-semibold text-navy mb-1">Response</p>
          <p className="text-txt-muted text-sm leading-relaxed line-clamp-3">{response}</p>
          {responseDate && (
            <p className="text-xs text-txt-muted mt-1">{new Date(responseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</p>
          )}
        </div>
      )}
    </div>
  );
}
