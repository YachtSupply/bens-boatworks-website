interface SectionWrapperProps {
  children: React.ReactNode;
  variant?: 'cream' | 'white' | 'navy' | 'dark';
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, variant = 'white', className, id }: SectionWrapperProps) {
  return (
    <section id={id}>
      <div>{children}</div>
    </section>
  );
}
