'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import { HiOutlineDocumentText, HiArrowNarrowRight } from 'react-icons/hi';
import Container from "@/components/ui/Container";
import Button from '@/components/ui/Button';
import ResumeViewerModal from '@/components/home/modal-viewer/ResumeViewerModal';
import Heading from '@/components/ui/Heading';

export default function HeroContent() {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 28 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1] as const,
            },
        },
    };

    const controls = useAnimationControls();
    const started = useRef(false);
    const [curriculoOpen, setCurriculoOpen] = useState(false);
    const [uptime, setUptime] = useState('00:00:00');

    useEffect(() => {
        if (!started.current) {
            started.current = true;
            controls.start('visible');
        }
    }, [controls]);

    useEffect(() => {
        const start = Date.now();
        const timer = setInterval(() => {
            const elapsed = Date.now() - start;
            const h = Math.floor(elapsed / 3600000).toString().padStart(2, '0');
            const m = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0');
            const s = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
            setUptime(`${h}:${m}:${s}`);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
                <motion.div
                    className="absolute w-10 h-10 bg-teal-400/70 dark:bg-teal-400/80 rounded-lg top-[18%] right-[28%]"
                    animate={{ y: [-10, 10, -10], rotate: [0, 15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute w-7 h-7 rounded-full bg-pink-500/80 dark:bg-pink-500/90 top-[42%] right-[10%]"
                    animate={{ y: [8, -8, 8], x: [-4, 4, -4] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />
                <motion.div
                    className="absolute w-5 h-5 bg-indigo-400/50 dark:bg-indigo-400/60 rounded-sm rotate-45 bottom-[28%] left-[6%]"
                    animate={{ y: [-6, 6, -6], rotate: [45, 62, 45] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="absolute top-8 right-8 z-20 hidden lg:block"
            >
                <div className="bg-white/80 dark:bg-neutral-900/90 backdrop-blur border border-neutral-200 dark:border-neutral-700/50 rounded-xl p-4 font-mono text-xs text-neutral-500 dark:text-neutral-400 space-y-2 min-w-48 shadow-sm dark:shadow-none">
                    <div className="flex justify-between gap-8">
                        <span className="text-neutral-400 dark:text-neutral-600 uppercase text-xs tracking-widest">SESSION</span>
                        <span className="text-neutral-700 dark:text-neutral-300">portfolio / live</span>
                    </div>
                    <div className="flex justify-between gap-8">
                        <span className="text-neutral-400 dark:text-neutral-600 uppercase text-xs tracking-widest">UPTIME</span>
                        <span className="text-neutral-700 dark:text-neutral-300">{uptime}</span>
                    </div>
                    <div className="flex justify-between gap-8">
                        <span className="text-neutral-400 dark:text-neutral-600 uppercase text-xs tracking-widest">STATUS</span>
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                            operacional
                        </span>
                    </div>
                    <div className="flex justify-between gap-8">
                        <span className="text-neutral-400 dark:text-neutral-600 uppercase text-xs tracking-widest">EXP</span>
                        <span className="text-neutral-700 dark:text-neutral-300">4 anos</span>
                    </div>
                </div>
            </motion.div>

            <div className="relative z-10 flex-1 flex flex-col justify-between">
                <Container className="pt-10 md:pt-16 pb-8 flex-1 flex flex-col justify-center">
                    <motion.div
                        initial="hidden"
                        animate={controls}
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="mb-8 md:mb-10">
                            <div className="inline-flex items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Disponível para novos projetos
                                </span>
                                <span className="text-neutral-300 dark:text-neutral-700">{"//"}</span>
                                <span className="tracking-widest uppercase text-xs text-neutral-400">DEV FULL-STACK <span className="w-1 h-1 rounded-full bg-neutral-400 inline-block" />  2026</span>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-8 md:mb-10">
                            <Heading level="h1">
                                <span className="text-neutral-700 dark:text-neutral-200 block">Olá, eu sou o</span>
                                <span className="block bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 dark:from-indigo-400 dark:via-purple-300 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient-shift [background-size:200%_auto]">
                                    Davi Milioli.
                                </span>
                            </Heading>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-col items-start gap-6 max-w-2xl">
                            <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed flex-1">
                                Sou um Desenvolvedor Full-Stack dedicado a transformar ideias em soluções digitais por meio de habilidades técnicas e criatividade. Estou sempre em busca de novos desafios e oportunidades para evoluir profissionalmente.
                            </p>
                            <div className="shrink-0 flex flex-wrap gap-3">
                                <Button variant="primary" onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}>
                                    Contato
                                    <HiArrowNarrowRight className="w-4 h-4" />
                                </Button>
                                <Button variant="secondary" onClick={() => setCurriculoOpen(true)}>
                                    <HiOutlineDocumentText className="w-4 h-4 mr-1.5" />
                                    Ver currículo
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                </Container>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                    className="relative z-10 border-t border-neutral-200 dark:border-neutral-800/60"
                >
                    <Container>
                        <div className="flex items-center justify-between py-4 font-mono text-xs text-neutral-400 dark:text-neutral-600 uppercase tracking-widest">
                            <span className="flex items-center gap-2">
                                <span>4 Anos de Experiência</span>
                                <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                                <span>80+ Projetos</span>
                                <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                                <span>Next.js &amp; TypeScript</span>
                            </span>
                            <span className="hidden sm:flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Disponível</span>
                                <span className="w-1 h-1 rounded-full bg-emerald-500 dark:bg-emerald-500/60" />
                                <span>Novos Projetos</span>
                            </span>
                        </div>
                    </Container>
                </motion.div>
            </div>

            <ResumeViewerModal open={curriculoOpen} onClose={() => setCurriculoOpen(false)} />
        </>
    );
}
