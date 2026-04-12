import { FiStar, FiCheckCircle } from 'react-icons/fi';

interface ReviewCardProps {
  author: string;
  rating: number;
  text: string;
  date: string;
  isVerified?: boolean;
  response?: string | null;
  responseDate?: string | null;
}

export function ReviewCard({ author, rating, text, date, isVerified, response, responseDate }: ReviewCardProps) {
  const formatted = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  const hasResponse = response && response.trim().length > 0;
  return (
    <div className={`review-card bg-white border border-cream-dark p-7 flex flex-col ${hasResponse ? 'h-auto' : 'h-64'}`}>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            size={16}
            className={i < rating ? 'text-gold fill-gold' : 'text-cream-dark'}
            strokeWidth={i < rating ? 0 : 1.5}
          />
        ))}
      </div>
      <p className="text-text font-sans text-sm leading-relaxed mb-6 flex-1 overflow-hidden line-clamp-5">
        &ldquo;{text}&rdquo;
      </p>
      <div className="border-t border-cream-dark pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-navy text-white text-xs font-bold font-heading">
            {author.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="font-heading font-bold text-navy text-sm flex items-center gap-1.5">
              {author}
              {isVerified && (
                <FiCheckCircle className="text-gold flex-shrink-0" size={13} title="Verified review" />
              )}
            </p>
            <p className="text-text-light text-xs font-sans">{formatted}</p>
          </div>
        </div>
      </div>
      {hasResponse && (
        <div className="mt-4 pt-4 border-t border-cream-dark bg-cream/50 -mx-7 -mb-7 px-7 pb-7 rounded-b-xl">
          <p className="text-xs font-heading font-bold text-navy mb-1.5">Owner Response</p>
          <p className="text-text-light font-sans text-sm leading-relaxed line-clamp-3">{response}</p>
          {responseDate && (
            <p className="text-text-light text-xs font-sans mt-2">
              {new Date(responseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
