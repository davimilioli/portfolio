import { skills } from '@/data/skills';

export default function StackCard() {
    const mainTechs = ['Next.js', 'TypeScript', 'Tailwind'];

    return (
        <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 sm:p-8 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none">
            <div className="flex flex-col h-full justify-between">
                <div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-purple-600 dark:text-purple-400">Stacks</span>
                    <h3 className="text-xl font-bold mt-2 text-neutral-900 dark:text-neutral-200">Arquitetura</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                        Experiência no ecossistema React, TypeScript e Tailwind.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-6">
                    {mainTechs.map((tech) => (
                        <div key={tech} className="px-3 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-300 text-center">
                            {tech}
                        </div>
                    ))}
                    <div className="px-3 py-2 bg-purple-500/10 dark:bg-purple-500/20 border border-purple-200/30 dark:border-purple-800/30 rounded-lg text-xs font-semibold text-purple-600 dark:text-purple-400 text-center flex items-center justify-center">
                        +{skills.length - 3}
                    </div>
                </div>
            </div>
        </div>
    );
}
