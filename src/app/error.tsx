'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <div>
        <h2>Something went wrong</h2>
        <p>
          We&apos;re having trouble loading this page. Please try again.
        </p>
        <button onClick={reset}>
          Try Again
        </button>
      </div>
    </div>
  );
}
