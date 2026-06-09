import { ReactNode } from "react"

interface BadgeProps {
    children: ReactNode;
    className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
    return (
        <span className={`inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-500 ${className}`}>
            <span className="w-6 h-px bg-neutral-400 dark:bg-neutral-600" />
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
            {children}
        </span>
    )
}
