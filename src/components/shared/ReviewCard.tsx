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
    <div>
      <div>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
      <p>&ldquo;{text}&rdquo;</p>
      <div>
        <span>{author}</span>
        {isVerified && <span> (Verified)</span>}
        <span> — {formatted}</span>
      </div>
      {hasResponse && (
        <div>
          <p><strong>Response:</strong> {response}</p>
          {responseDate && <span>{new Date(responseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>}
        </div>
      )}
    </div>
  );
}
