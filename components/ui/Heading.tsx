import { ReactNode } from "react";

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  variant?: HeadingVariant;
  children: ReactNode;
  className?: string;
}

export default function Heading({
  level = 'h2',
  variant,
  children,
  className = '',
  ...props
}: HeadingProps) {
  const variantClasses: Record<HeadingVariant, string> = {
    h1: 'text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-black leading-none tracking-tight',
    h2: 'text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight',
    h3: 'text-3xl md:text-4xl font-bold tracking-tight',
    h4: 'text-2xl font-bold tracking-tight',
    h5: 'text-xl font-semibold',
    h6: 'text-lg font-semibold',
  };
  const Tag = level;
  const chosenVariant = variant || (level as HeadingVariant);
  const variantClass = variantClasses[chosenVariant] || '';

  return (
    <Tag className={`${variantClass} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
