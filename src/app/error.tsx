'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-sand flex items-center justify-center px-5 sm:px-8 pt-[72px]">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-accent text-2xl">!</span>
        </div>
        <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-brand tracking-tight mb-3">Something went wrong</h2>
        <p className="text-ink-muted text-base leading-relaxed mb-8">
          We&apos;re having trouble loading this page. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-accent hover:bg-accent-dark text-white font-semibold text-[12px] uppercase tracking-wider px-7 py-4 rounded-full transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
