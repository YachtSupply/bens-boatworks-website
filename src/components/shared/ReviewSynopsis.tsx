import { Star } from 'lucide-react';

interface ReviewSynopsisProps {
  businessName: string;
  aggregateRating: number;
  totalReviewCount: number;
  summary: string;
  keywords: string[];
}

export function ReviewSynopsis({ businessName, aggregateRating, totalReviewCount, summary, keywords }: ReviewSynopsisProps) {
  const fullStars = Math.round(aggregateRating);

  return (
    <div className="bg-navy-800 rounded-lg p-8 md:p-10 mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg border border-white/10 flex flex-col items-center justify-center">
            <span className="text-2xl font-serif text-gold">{aggregateRating.toFixed(1)}</span>
          </div>
          <div>
            <div className="flex gap-0.5 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} strokeWidth={0} fill={i < fullStars ? '#c9a96e' : 'rgba(255,255,255,0.15)'} />
              ))}
            </div>
            <p className="text-white/50 text-sm">
              {totalReviewCount} {totalReviewCount === 1 ? 'review' : 'reviews'}
            </p>
          </div>
        </div>

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {keywords.slice(0, 6).map((kw) => (
              <span key={kw} className="text-xs text-white/60 border border-white/10 px-3 py-1 rounded-full">
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

      <p className="text-white/70 text-sm leading-relaxed">{summary}</p>
    </div>
  );
}
