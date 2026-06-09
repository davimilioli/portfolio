'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { HiX, HiChevronLeft, HiChevronRight, HiArrowNarrowRight } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { Project } from '@/types/Project';
import { skills } from '@/data/skills';
import { getCategoryLabel } from '@/data/projects';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface ProjectOffcanvasProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectOffcanvas({ project, onClose }: ProjectOffcanvasProps) {
    const isLight = true;
    const [mounted, setMounted] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => { setMounted(true); }, []);
    const [direction, setDirection] = useState(1);
    const slideVariants = {
        enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
    };

    useEffect(() => {
        setImgIndex(0);
        setDirection(1);
    }, [project?.id]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') goTo(imgIndex - 1, -1);
            if (e.key === 'ArrowRight') goTo(imgIndex + 1, 1);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
        // eslint-disable-next-line
    }, [onClose, imgIndex]);

    useEffect(() => {
        document.body.style.overflow = project ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [project]);

    const goTo = (index: number, dir: number) => {
        if (!project?.img?.length) return;
        const total = project.img.length;
        setDirection(dir);
        setImgIndex(((index % total) + total) % total);
    };

    const prev = () => goTo(imgIndex - 1, -1);
    const next = () => goTo(imgIndex + 1, 1);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {project && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                    />

                    <motion.aside
                        className={`fixed right-0 top-0 h-full w-full max-w-lg bg-slate-50 border-l z-[70] ${isLight ? 'border-black/10' : 'border-zinc-800'
                            } flex flex-col shadow-2xl`}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                    >
                        <div className={`flex items-start justify-between p-5 sm:p-8 border-b shrink-0 ${isLight ? 'border-black/10' : 'border-zinc-900'
                            }`}>
                            <div className="space-y-2 pr-4">
                                <Badge>
                                    {getCategoryLabel(project.category)}
                                </Badge>
                                <h2 className={`text-2xl font-bold leading-tight ${isLight ? 'text-neutral-900' : 'text-white'
                                    }`}>
                                    {project.name}
                                </h2>
                            </div>
                            <Button
                                variant="transparent"
                                onClick={onClose}
                                aria-label="Fechar"
                                className="p-2 shrink-0 mt-1"
                            >
                                <HiX className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-8">

                            <p className={`leading-relaxed text-sm ${isLight ? 'text-neutral-700' : 'text-neutral-300'
                                }`}>
                                {project.description}
                            </p>

                            {project.img && project.img.length > 0 && (
                                <div className="space-y-3">
                                    <div
                                        className={`relative rounded-xl border overflow-hidden ${project.category === 'app-mobile' ? 'aspect-[9/16]' : 'aspect-video'} ${isLight ? 'border-black/10 bg-white/40' : 'border-zinc-800 bg-zinc-900'}`}
                                    >
                                        <AnimatePresence initial={false} custom={direction}>
                                            <motion.div
                                                key={imgIndex}
                                                custom={direction}
                                                variants={slideVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ type: 'spring', damping: 32, stiffness: 320 }}
                                                className="absolute inset-0"
                                            >
                                                <Image
                                                    src={project.img[imgIndex]}
                                                    alt={`${project.name} screenshot ${imgIndex + 1}`}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 512px"
                                                    className="object-cover"
                                                    unoptimized={project.img[imgIndex].endsWith('.gif')}
                                                />
                                            </motion.div>
                                        </AnimatePresence>

                                        {project.img.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prev}
                                                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-lg bg-black/50 hover:bg-black/75 text-white transition-colors cursor-pointer"
                                                    aria-label="Anterior"
                                                >
                                                    <HiChevronLeft className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={next}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-lg bg-black/50 hover:bg-black/75 text-white transition-colors cursor-pointer"
                                                    aria-label="Próximo"
                                                >
                                                    <HiChevronRight className="w-4 h-4" />
                                                </button>

                                                <span className="absolute bottom-2 right-3 z-10 text-xs text-white/60 tabular-nums">
                                                    {imgIndex + 1} / {project.img.length}
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    {project.img.length > 1 && (
                                        <div className="flex justify-center gap-1.5">
                                            {project.img.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => goTo(i, i > imgIndex ? 1 : -1)}
                                                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === imgIndex
                                                        ? isLight ? 'w-5 bg-neutral-900' : 'w-5 bg-white'
                                                        : isLight ? 'w-1.5 bg-neutral-300 hover:bg-neutral-500' : 'w-1.5 bg-zinc-600 hover:bg-zinc-400'
                                                        }`}
                                                    aria-label={`Ir para imagem ${i + 1}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="space-y-3">
                                <h3 className={`text-xs font-semibold tracking-wider uppercase ${isLight ? 'text-neutral-500' : 'text-neutral-500'
                                    }`}>
                                    Tecnologias
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((techName) => {
                                        const skill = skills.find(s => s.skill === techName);
                                        const IconComponent = skill?.icon;
                                        return (
                                            <span
                                                key={techName}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-xs font-medium ${isLight
                                                    ? 'bg-white border-neutral-200 text-neutral-800 shadow-2xs'
                                                    : 'bg-zinc-900 border-zinc-800 text-neutral-300'
                                                    }`}
                                            >
                                                {IconComponent && <IconComponent className={`w-3.5 h-3.5 ${isLight ? 'text-neutral-500' : 'text-neutral-400'
                                                    }`} />}
                                                {techName}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-500">
                                    Destaques
                                </h3>
                                <ul className="space-y-3">
                                    {project.features.map((feature, i) => (
                                        <li key={i} className={`flex items-start gap-3 text-sm leading-relaxed ${isLight ? 'text-neutral-700' : 'text-neutral-300'
                                            }`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className={`p-5 sm:px-8 sm:py-6 border-t shrink-0 flex gap-3 bg-slate-50 ${isLight ? 'border-black/10' : 'border-zinc-800'}`}>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-6 py-2.5 border rounded-full text-sm font-semibold transition-all duration-200 ${isLight
                                    ? 'bg-white text-neutral-800 border-black/10 hover:text-black hover:bg-neutral-50 hover:border-black/20 hover:shadow-2xs'
                                    : 'bg-zinc-900 border-zinc-800 text-neutral-300 hover:text-white hover:border-zinc-700'
                                    }`}
                            >
                                <FaGithub className="w-4 h-4" />
                                GitHub
                            </a>
                            {project.preview && (
                                <a
                                    href={project.preview}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 px-6 py-2.5 border rounded-full text-sm font-semibold transition-all duration-200 ${isLight
                                        ? 'bg-white text-neutral-900 border-black/10 hover:bg-neutral-50 hover:border-black/20 hover:shadow-xs'
                                        : 'bg-white text-zinc-950 border-transparent hover:bg-neutral-100'
                                        }`}
                                >
                                    Ver demo
                                    <HiArrowNarrowRight className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
