'use client';

import { useState, ReactNode, ComponentType } from 'react';
import { motion } from 'motion/react';
import { HiOutlineUser, HiOutlineBriefcase, HiOutlineAcademicCap } from 'react-icons/hi';
import { aboutInfo } from '@/data/about';
import ProfileTab from './ProfileTab';

interface AboutTab {
    id: number;
    title: string;
    icon: ComponentType<{ className?: string }>;
    shortDescription: string;
    content: ReactNode;
}

export default function ProfileCard() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs: AboutTab[] = [
        {
            id: 0,
            title: 'Biografia',
            icon: HiOutlineUser,
            shortDescription: 'Quem sou eu.',
            content: (
                <div className="text-neutral-400 text-sm leading-relaxed">
                    <h4 className="text-sm font-semibold text-neutral-200 mb-2">Olá, me chamo Davi</h4>
                    <p>{aboutInfo.personalData.bio}</p>
                </div>
            ),
        },
        {
            id: 1,
            title: 'Experiência',
            icon: HiOutlineBriefcase,
            shortDescription: 'Onde trabalhei e o que desenvolvi.',
            content: (
                <div className="space-y-5 text-neutral-400 text-sm">
                    {aboutInfo.experiences.map((exp) => (
                        <div key={exp.id}>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h4 className="font-semibold text-neutral-200">{exp.title}</h4>
                                <span className="px-2 py-0.5 text-xs font-medium bg-zinc-900 border border-zinc-700 rounded-full text-neutral-500">
                                    {exp.period}
                                </span>
                            </div>
                            <ul className="list-disc pl-4 space-y-1 text-xs leading-relaxed">
                                {exp.description.map((desc, idx) => (
                                    <li key={idx}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            id: 2,
            title: 'Formação',
            icon: HiOutlineAcademicCap,
            shortDescription: 'Análise e Desenvolvimento de Sistemas',
            content: (
                <div className="space-y-5 text-neutral-400 text-sm">
                    {aboutInfo.education.map((edu) => (
                        <div key={edu.id}>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h4 className="font-semibold text-neutral-200">{edu.company}</h4>
                                <span className="px-2 py-0.5 text-xs font-medium bg-zinc-900 border border-zinc-700 rounded-full text-neutral-500">
                                    {edu.period}
                                </span>
                            </div>
                            <ul className="list-disc pl-4 space-y-1 text-xs leading-relaxed">
                                {edu.description.map((desc, idx) => (
                                    <li key={idx}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">

                <div className="px-5 py-4 border-b border-zinc-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-medium text-neutral-300">Meu Perfil</span>
                    </div>
                    <span className="text-xs text-neutral-600">{tabs.length} seções</span>
                </div>

                {tabs.map((tab, idx) => (
                    <ProfileTab
                        key={tab.id}
                        title={tab.title}
                        icon={tab.icon}
                        shortDescription={tab.shortDescription}
                        content={tab.content}
                        isSelected={activeTab === idx}
                        onClick={() => setActiveTab(idx)}
                        isLast={idx === tabs.length - 1}
                    />
                ))}
            </div>
        </motion.div>
    );
}
