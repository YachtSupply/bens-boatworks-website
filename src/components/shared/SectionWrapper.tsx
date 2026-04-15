import { clsx } from 'clsx';

interface SectionWrapperProps {
  children: React.ReactNode;
  variant?: 'sand' | 'white' | 'dark' | 'alt';
  className?: string;
  id?: string;
}

const variants = {
  sand:  'bg-sand text-ink',
  alt:   'bg-sand-dark text-ink',
  white: 'bg-white text-ink',
  dark:  'bg-brand text-white',
};

export function SectionWrapper({ children, variant = 'sand', className, id }: SectionWrapperProps) {
  return (
    <section id={id} className={clsx('py-24 px-5 sm:px-8', variants[variant], className)}>
      <div className="max-w-page mx-auto">{children}</div>
    </section>
  );
}
