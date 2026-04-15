interface ReviewSynopsisProps {
  businessName: string;
  aggregateRating: number;
  totalReviewCount: number;
  summary: string;
  keywords: string[];
}

export function ReviewSynopsis({ businessName, aggregateRating, totalReviewCount, summary, keywords }: ReviewSynopsisProps) {
  return (
    <div>
      <h3>What People are Saying about {businessName}</h3>
      <div>
        <span>{'★'.repeat(Math.round(aggregateRating))}{'☆'.repeat(5 - Math.round(aggregateRating))}</span>
        <span> {aggregateRating.toFixed(1)}</span>
        <span> ({totalReviewCount} {totalReviewCount === 1 ? 'review' : 'reviews'})</span>
      </div>
      <p>{summary}</p>
      {keywords.length > 0 && (
        <div>
          {keywords.slice(0, 8).map((kw) => <span key={kw}>{kw}</span>)}
        </div>
      )}
    </div>
  );
}
