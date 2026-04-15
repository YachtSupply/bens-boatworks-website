import { clsx } from 'clsx';

interface SectionWrapperProps {
  children: React.ReactNode;
  variant?: 'light' | 'alt' | 'dark' | 'white';
  className?: string;
  id?: string;
}

const variants = {
  light: 'bg-surface text-txt',
  alt:   'bg-surface-alt text-txt',
  white: 'bg-white text-txt',
  dark:  'bg-navy text-white',
};

export function SectionWrapper({ children, variant = 'light', className, id }: SectionWrapperProps) {
  return (
    <section id={id} className={clsx('py-24 px-5 sm:px-8', variants[variant], className)}>
      <div className="max-w-page mx-auto">{children}</div>
    </section>
  );
}
