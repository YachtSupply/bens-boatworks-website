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
  const formatted = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  const hasResponse = response && response.trim().length > 0;

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col min-h-[220px]">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} strokeWidth={0} fill={i < rating ? '#d4654a' : '#e8dfd6'} />
        ))}
      </div>

      <p className="text-ink text-[14px] leading-relaxed flex-1 mb-4">&ldquo;{text}&rdquo;</p>

      <div className="flex items-center gap-2.5 pt-4 border-t border-sand-dark">
        <span className="w-7 h-7 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center">
          {author.charAt(0).toUpperCase()}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-brand flex items-center gap-1">
            {author}
            {isVerified && <CheckCircle size={12} className="text-accent" strokeWidth={2} />}
          </p>
          <p className="text-[11px] text-ink-muted">{formatted}</p>
        </div>
      </div>

      {hasResponse && (
        <div className="mt-3 pt-3 border-t border-sand-dark bg-sand -mx-6 -mb-6 px-6 pb-6 rounded-b-2xl">
          <p className="text-[11px] font-semibold text-brand mb-1">Response</p>
          <p className="text-ink-muted text-[13px] leading-relaxed line-clamp-2">{response}</p>
        </div>
      )}
    </div>
  );
}
