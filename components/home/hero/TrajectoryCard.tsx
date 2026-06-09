import { ReactNode } from 'react';

interface TrajectoryCardProps {
    icon: ReactNode;
    value: string | ReactNode;
    label: string;
    hoverClass?: string;
    iconBgClass?: string;
    iconTextClass?: string;
}

export default function TrajectoryCard({
    icon,
    value,
    label,
    hoverClass = "hover:border-indigo-500/30 dark:hover:border-indigo-400/30",
    iconBgClass = "bg-blue-50 dark:bg-blue-950/30",
    iconTextClass = "text-blue-600 dark:text-indigo-400",
}: TrajectoryCardProps) {
    return (
        <div className={`flex flex-col justify-between p-5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl transition-all duration-300 ${hoverClass}`}>
            <div>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${iconBgClass} ${iconTextClass}`}>
                    {icon}
                </div>
                {typeof value === 'string' ? (
                    <span className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">{value}</span>
                ) : (
                    value
                )}
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-3">{label}</span>
        </div>
    );
}
