'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { HiArrowNarrowRight } from 'react-icons/hi';
import Button from '@/components/ui/Button';
import ProjectModal from '@/components/home/projects/ProjectModal';
import { Project } from '@/types/Project';
import { projects, getCategoryLabel } from '@/data/projects';
import { skills } from '@/data/skills';

function toSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export default function ProjectsContent() {
    const accents = [
        {
            bg: 'bg-white border border-neutral-200/80 hover:border-indigo-400/40 hover:shadow-md',
            canvasBg: 'bg-slate-50',
            inner: 'bg-slate-50 border border-slate-100',
            label: 'text-indigo-500 font-semibold',
            title: 'text-neutral-900',
            desc: 'text-neutral-500',
            btn: 'border-blue-200 text-blue-600 hover:bg-blue-50',
        },
        {
            bg: 'bg-white border border-neutral-200/80 hover:border-purple-400/40 hover:shadow-md',
            canvasBg: 'bg-purple-50/50',
            inner: 'bg-slate-50 border border-slate-100',
            label: 'text-purple-500 font-semibold',
            title: 'text-neutral-900',
            desc: 'text-neutral-500',
            btn: 'border-purple-200 text-purple-600 hover:bg-purple-50',
        },
        {
            bg: 'bg-white border border-neutral-200/80 hover:border-emerald-400/40 hover:shadow-md',
            canvasBg: 'bg-emerald-50/50',
            inner: 'bg-slate-50 border border-slate-100',
            label: 'text-emerald-500 font-semibold',
            title: 'text-neutral-900',
            desc: 'text-neutral-500',
            btn: 'border-emerald-200 text-emerald-600 hover:bg-emerald-50',
        },
        {
            bg: 'bg-white border border-neutral-200/80 hover:border-rose-400/40 hover:shadow-md',
            canvasBg: 'bg-rose-50/50',
            inner: 'bg-slate-50 border border-slate-100',
            label: 'text-rose-500 font-semibold',
            title: 'text-neutral-900',
            desc: 'text-neutral-500',
            btn: 'border-rose-200 text-rose-600 hover:bg-rose-50',
        },
    ];

    const sectionRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [canvasBg, setCanvasBg] = useState<string>('bg-zinc-950');
    const [isCanvasLight, setIsCanvasLight] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const match = window.location.pathname.match(/^\/projects\/(.+)/);
        if (!match) return;
        const slug = match[1];
        const projectIdx = projects.findIndex(p => toSlug(p.name) === slug);
        if (projectIdx === -1) return;
        const project = projects[projectIdx];
        const accent = accents[projectIdx % accents.length];
        setSelectedProject(project);
        setCanvasBg(accent.canvasBg);
        setIsCanvasLight(true);
        setTimeout(() => {
            document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClose = useCallback(() => {
        setSelectedProject(null);
        if (window.location.pathname.startsWith('/projects/')) {
            window.history.pushState({}, '', '/');
        }
    }, []);

    const handleToggle = () => {
        const nextExpanded = !isExpanded;
        setIsExpanded(nextExpanded);
        if (nextExpanded) {
            setTimeout(() => {
                buttonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 120);
        } else {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const topProjects = projects.slice(0, 3);
    const extraProjects = projects.slice(3);

    function PastelCard({ project, accent, imgHeight = 'h-48', className = '' }: { project: Project; accent: typeof accents[0]; imgHeight?: string; className?: string }) {
        return (
            <div
                onClick={() => {
                    setSelectedProject(project);
                    setCanvasBg(accent.canvasBg);
                    setIsCanvasLight(true);
                    window.history.pushState({}, '', `/projects/${toSlug(project.name)}`);
                }}
                className={`${accent.bg} rounded-3xl p-5 flex flex-col cursor-pointer group transition-all duration-300 w-72 sm:w-auto shrink-0 snap-start ${className}`}
            >
                <div className={`text-xs font-mono uppercase tracking-widest mb-3 ${accent.label}`}>
                    • {getCategoryLabel(project.category)} &nbsp;·&nbsp; {project.name}
                </div>

                <div className={`${accent.inner} rounded-2xl overflow-hidden ${imgHeight} relative mb-4 flex-shrink-0 flex items-center justify-center`}>
                    {project.img?.[0] ? (
                        <Image
                            src={project.img[0]}
                            alt={project.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                            unoptimized={project.img[0].endsWith('.gif')}
                        />
                    ) : (
                        <span className={`text-8xl font-black opacity-5 leading-none select-none ${accent.title}`}>
                            {project.name.charAt(0)}
                        </span>
                    )}
                </div>

                <div className="flex flex-col flex-1 gap-2 px-1">
                    <h3 className={`text-xl font-bold ${accent.title}`}>{project.name}</h3>
                    <p className={`text-sm leading-relaxed flex-1 ${accent.desc}`}>{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.technologies.map((techName) => {
                            const skill = skills.find(s => s.skill === techName);
                            const IconComponent = skill?.icon;
                            return (
                                <span
                                    key={techName}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-neutral-50 border border-neutral-200/80 rounded-full text-xs font-medium text-neutral-600 shadow-2xs"
                                >
                                    {IconComponent && <IconComponent className="w-3.5 h-3.5 text-neutral-400" />}
                                    {techName}
                                </span>
                            );
                        })}
                    </div>

                    <div className="pt-3">
                        <span className={`inline-flex items-center gap-2 text-sm border rounded-full px-4 py-2 transition-colors duration-200 ${accent.btn}`}>
                            Ver detalhes
                            <HiArrowNarrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div ref={sectionRef}>
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 xl:grid-cols-3 sm:overflow-visible sm:pb-0">
                {projects.map((project, i) => (
                    <PastelCard
                        key={project.id}
                        project={project}
                        accent={accents[i % accents.length]}
                        className={i >= 3 ? 'sm:hidden' : ''}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 flex flex-col group md:col-span-3">
                    <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                        • PORTFÓLIO · NÚMEROS
                    </div>
                    <div className="bg-zinc-950 rounded-2xl border border-zinc-800/60 p-5 mb-4 flex-shrink-0">
                        <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">Participação em projetos</p>
                        <p className="text-5xl font-black text-neutral-100 tracking-tight">80+</p>
                        <div className="mt-3 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[82%]" />
                        </div>
                        <div className="flex justify-between mt-1.5 text-xs text-neutral-400">
                            <span>3+ anos exp.</span>
                            <span>82%</span>
                        </div>
                    </div>
                </div>
            </div>

            {extraProjects.length > 0 && (
                <>
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                key="extra-projects"
                                className="overflow-hidden"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                            >
                                <div className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-4 pt-4">
                                    {extraProjects.map((project, i) => (
                                        <PastelCard
                                            key={project.id}
                                            project={project}
                                            accent={accents[(i + topProjects.length) % accents.length]}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div ref={buttonRef} className="hidden sm:flex justify-center pt-4">
                        <Button
                            variant="outline"
                            onClick={handleToggle}
                        >
                            {isExpanded ? 'Ver menos' : `Ver mais ${extraProjects.length} projeto${extraProjects.length > 1 ? 's' : ''}`}
                        </Button>
                    </div>
                </>
            )}

            <ProjectModal
                project={selectedProject}
                onClose={handleClose}
            />
        </div>
    );
}
