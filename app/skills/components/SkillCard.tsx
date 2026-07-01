import { IconType } from 'react-icons';

interface SkillCardProps {
    skill: string;
    icon: IconType;
    categoryLabel: string;
}

export default function SkillCard({
    skill,
    icon: IconComponent,
    categoryLabel
}: SkillCardProps) {
    return (
        <div className="group p-6 md:p-8 border-r border-b border-zinc-800 hover:bg-zinc-900/40 transition-colors duration-300 flex flex-col">
            <div className="mb-8">
                <div className="w-10 h-10 flex items-center justify-center bg-zinc-800/60 rounded-lg text-indigo-400 group-hover:bg-zinc-700/60 transition-colors">
                    <IconComponent className="w-5 h-5" />
                </div>
            </div>
            <div className="space-y-1.5 mt-auto">
                <h3 className="text-base font-bold text-neutral-100 group-hover:text-white transition-colors">
                    {skill}
                </h3>
                <p className="text-xs text-neutral-500 font-medium">
                    {categoryLabel}
                </p>
            </div>
        </div>
    );
}