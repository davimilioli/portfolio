import React, { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon' | 'outline' | 'transparent';

interface BaseButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  href?: string;
  className?: string;
}

type ButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps>;

export default function Button({
  variant = 'primary',
  children,
  href,
  className = '',
  ...props
}: ButtonProps) {
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-white text-neutral-950 border-transparent hover:bg-indigo-500 hover:text-white',
    secondary: 'bg-transparent text-white border border-white hover:bg-white hover:text-neutral-950',
    ghost: 'bg-transparent text-neutral-300 border border-neutral-800 hover:bg-neutral-900 hover:text-white',
    icon: 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:bg-neutral-900 hover:text-white',
    outline: 'bg-white text-neutral-900 border-neutral-200 hover:bg-white/90 hover:border-neutral-300 shadow-xs',
    transparent: 'bg-transparent text-neutral-500 border-transparent hover:bg-black/5 hover:text-neutral-900',
  };
  const baseClasses = 'tracking-wide flex items-center justify-center gap-2.5 px-8 py-2.5 rounded-full font-semibold text-sm tracking-tight whitespace-nowrap cursor-pointer border transition-all duration-300 select-none text-center no-underline font-inherit';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href?.startsWith("http")) {
    return (
      <a href={href} className={combinedClasses} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}