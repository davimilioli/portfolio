'use client';

import { ComponentType, ReactNode } from 'react';
import { motion } from 'motion/react';

interface ProfileTabProps {
    title: string;
    icon: ComponentType<{ className?: string }>;
    shortDescription: string;
    content: ReactNode;
    isSelected: boolean;
    onClick: () => void;
    isLast: boolean;
}

export default function ProfileTab({
    title,
    icon: Icon,
    shortDescription,
    content,
    isSelected,
    onClick,
    isLast,
}: ProfileTabProps) {
    return (
        <div
            className={`${!isLast ? 'border-b border-zinc-800/60' : ''} transition-colors duration-200 ${isSelected ? 'bg-zinc-800/40' : 'hover:bg-zinc-800/20'}`}
        >
            <button
                onClick={onClick}
                className="w-full px-5 py-4 flex items-center gap-3 text-left focus:outline-none cursor-pointer"
            >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${isSelected ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-800 text-zinc-500'}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <span className={`font-semibold text-sm transition-colors duration-200 ${isSelected ? 'text-white' : 'text-neutral-400'}`}>
                            {title}
                        </span>
                        {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                        )}
                    </div>
                    <p className="text-xs text-neutral-600 truncate mt-0.5">
                        {shortDescription}
                    </p>
                </div>
            </button>

            <motion.div
                initial={false}
                animate={{
                    height: isSelected ? 'auto' : 0,
                    opacity: isSelected ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                className="overflow-hidden"
            >
                <div className="px-5 pb-5 pt-2 border-t border-zinc-800/40">
                    {content}
                </div>
            </motion.div>
        </div>
    );
}
