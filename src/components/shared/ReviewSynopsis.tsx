import { FiStar } from 'react-icons/fi';

interface ReviewSynopsisProps {
  businessName: string;
  aggregateRating: number;
  totalReviewCount: number;
  summary: string;
  keywords: string[];
}

export function ReviewSynopsis({
  businessName,
  aggregateRating,
  totalReviewCount,
  summary,
  keywords,
}: ReviewSynopsisProps) {
  const fullStars = Math.round(aggregateRating);

  return (
    <div className="bg-cream rounded-2xl p-8 mb-8">
      <h3 className="font-heading text-lg font-bold text-navy mb-3">
        What People are Saying about {businessName}
      </h3>
      <div className="flex items-baseline gap-3 mb-4">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <FiStar
              key={i}
              size={16}
              className={i < fullStars ? 'text-gold fill-gold' : 'text-cream-dark'}
              strokeWidth={i < fullStars ? 0 : 1.5}
            />
          ))}
        </div>
        <span className="font-heading text-sm text-navy font-bold">
          {aggregateRating.toFixed(1)}
        </span>
        <span className="font-sans text-xs text-text-light">
          ({totalReviewCount} {totalReviewCount === 1 ? 'review' : 'reviews'})
        </span>
      </div>
      <p className="text-text font-sans text-sm leading-relaxed mb-6">
        {summary}
      </p>
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.slice(0, 8).map((keyword) => (
            <span
              key={keyword}
              className="bg-white text-navy text-xs font-sans font-medium px-3 py-1.5 rounded-lg"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
