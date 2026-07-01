'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiOutlineUser, HiOutlineCode, HiOutlineFolder, HiOutlineMail, HiX, HiArrowNarrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Container from "@/components/ui/Container";
import Logo from '@/components/Logo';
import { aboutInfo } from '@/data/about';
import { projects } from '@/data/projects';
import ContactForm from '@/components/home/contact/ContactForm';
import ProjectModal from '@/components/home/projects/ProjectModal';
import { Project } from '@/types/Project';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
};

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState(0);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const accents = [
        {
            bg: 'bg-white border border-neutral-200/80 hover:border-indigo-400/40 hover:shadow-md',
            label: 'text-indigo-500 font-semibold',
            title: 'text-neutral-900',
            desc: 'text-neutral-500',
            dot: 'bg-indigo-500',
            btn: 'border-blue-200 text-blue-600 hover:bg-blue-50',
        },
        {
            bg: 'bg-white border border-neutral-200/80 hover:border-purple-400/40 hover:shadow-md',
            label: 'text-purple-500 font-semibold',
            title: 'text-neutral-900',
            desc: 'text-neutral-500',
            dot: 'bg-purple-500',
            btn: 'border-purple-200 text-purple-600 hover:bg-purple-50',
        },
        {
            bg: 'bg-white border border-neutral-200/80 hover:border-emerald-400/40 hover:shadow-md',
            label: 'text-emerald-500 font-semibold',
            title: 'text-neutral-900',
            desc: 'text-neutral-500',
            dot: 'bg-emerald-500',
            btn: 'border-emerald-200 text-emerald-600 hover:bg-emerald-50',
        },
        {
            bg: 'bg-white border border-neutral-200/80 hover:border-rose-400/40 hover:shadow-md',
            label: 'text-rose-500 font-semibold',
            title: 'text-neutral-900',
            desc: 'text-neutral-500',
            dot: 'bg-rose-500',
            btn: 'border-rose-200 text-rose-600 hover:bg-rose-50',
        },
    ];
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [uptime, setUptime] = useState('00:00:00');

    useEffect(() => {
        const event = new CustomEvent('dashboard-tab-changed', { detail: activeTab });
        window.dispatchEvent(event);
    }, [activeTab]);

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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setIsContactOpen((prev) => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const handleTabChange = (e: Event) => {
            const customEvent = e as CustomEvent<number>;
            if (typeof customEvent.detail === 'number') {
                setActiveTab(customEvent.detail);
                const mainArea = document.getElementById('main-dashboard-content');
                if (mainArea && window.innerWidth < 1024) {
                    mainArea.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };
        window.addEventListener('change-tab', handleTabChange);
        return () => window.removeEventListener('change-tab', handleTabChange);
    }, []);

    const heroTabs = [
        { id: 0, title: 'Sobre mim', icon: HiOutlineUser },
        { id: 1, title: 'skills', icon: HiOutlineCode },
        { id: 2, title: 'projetos', icon: HiOutlineFolder },
    ];

    const gitLogs = [
        {
            commit: 'e4f89d1',
            date: '2022 — Atualmente',
            role: 'Desenvolvedor Full-Stack',
            company: 'Inforce Tecnologia',
            bullets: [
                "Desenvolvimento e manutenção de sites e aplicações web (HTML, CSS, SASS, JS, TS, jQuery, PHP, React, Next.js, Node.js).",
                "Atuação na construção de mais de 80 projetos de sites ao longo de 4 anos, aplicando boas práticas de templating e reuso.",
                "Criação e manutenção de componentes reutilizáveis, automatizando deploy via CI/CD com GitHub Actions.",
                "Integração entre camadas Front e Back-End em PHP, garantindo comunicação eficiente e otimizando performance e SEO."
            ]
        },
        {
            commit: '8a1b5c2',
            date: '2022 — 2024',
            role: 'Graduação em ADS',
            company: 'UNISUAM - Centro Universitário Augusto Motta',
            bullets: [
                "Estrutura de Sistemas, Banco de Dados, Programação.",
                "Desenvolvimento de Software para Internet (Front-end & Back-end).",
                "Desenvolvimento de Aplicativos Mobile."
            ]
        }
    ];

    const renderPackageJson = () => (
        <pre className="p-4 overflow-x-auto text-[11px] md:text-xs leading-relaxed custom-scroll-dark text-neutral-400 font-mono">
            <code>
                {`{\n`}
                {`  `}
                <span className="text-sky-400">"name"</span>: <span className="text-emerald-400">"davi-milioli"</span>,{"\n"}
                {`  `}
                <span className="text-sky-400">"version"</span>: <span className="text-emerald-400">"4.0.0"</span>,{"\n"}
                {`  `}
                <span className="text-sky-400">"description"</span>: <span className="text-emerald-400">"Full-Stack Developer"</span>,{"\n"}
                {`  `}
                <span className="text-sky-400">"dependencies"</span>: {"{\n"}
                {`    `}
                <span className="text-sky-400">"next"</span>: <span className="text-emerald-400">"^16.2.7"</span>,{"\n"}
                {`    `}
                <span className="text-sky-400">"react"</span>: <span className="text-emerald-400">"^19.2.4"</span>,{"\n"}
                {`    `}
                <span className="text-sky-400">"typescript"</span>: <span className="text-emerald-400">"^5.3.3"</span>,{"\n"}
                {`    `}
                <span className="text-sky-400">"node-js"</span>: <span className="text-emerald-400">"^20.11.0"</span>,{"\n"}
                {`    `}
                <span className="text-sky-400">"php"</span>: <span className="text-emerald-400">"^8.2.0"</span>,{"\n"}
                {`    `}
                <span className="text-sky-400">"mysql"</span>: <span className="text-emerald-400">"^8.0.35"</span>,{"\n"}
                {`    `}
                <span className="text-sky-400">"tailwindcss"</span>: <span className="text-emerald-400">"^4.0.0"</span>,{"\n"}
                {`    `}
                <span className="text-sky-400">"sass"</span>: <span className="text-emerald-400">"^1.70.0"</span>,{"\n"}
                {`    `}
                <span className="text-sky-400">"angular"</span>: <span className="text-emerald-400">"^17.1.0"</span>,{"\n"}
                {`    `}
                <span className="text-sky-400">"git"</span>: <span className="text-emerald-400">"^2.43.0"</span>,{"\n"}
                {`    `}
                <span className="text-sky-400">"prisma"</span>: <span className="text-emerald-400">"^5.8.0"</span>,{"\n"}
                {`    `}
                <span className="text-sky-400">"figma"</span>: <span className="text-emerald-400">"^116.2.0"</span>{"\n"}
                {`  }\n`}
                {`}`}
            </code>
        </pre>
    );

    return (
        <section className="min-h-screen relative flex flex-col text-neutral-100 antialiased overflow-hidden bg-neutral-950 bg-[radial-gradient(ellipse_at_30%_5%,rgba(59,130,246,0.09)_0%,rgba(9,9,11,0)_50%),radial-gradient(ellipse_at_70%_95%,rgba(139,92,246,0.08)_0%,rgba(9,9,11,0)_50%)]">
            <style>{`
                .custom-scroll-dark {
                    scrollbar-width: thin;
                    scrollbar-color: #27272a transparent;
                }
                .custom-scroll-light {
                    scrollbar-width: thin;
                    scrollbar-color: #d4d4d8 transparent;
                }
            `}</style>
            <div className="absolute -left-32 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                <Logo className="w-[700px] md:w-[900px] lg:w-[1100px] h-auto opacity-[0.04]" />
            </div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="hidden md:block absolute -top-48 -left-48 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 animate-float-orb w-[600px] h-[600px] blur-[80px] will-change-transform" />
                <div className="hidden md:block absolute -bottom-64 -right-48 rounded-full bg-purple-500/10 dark:bg-purple-500/20 animate-float-orb w-[700px] h-[700px] blur-[80px] [animation-delay:4s] [animation-direction:reverse] will-change-transform" />
                <div className="hidden lg:block absolute top-1/3 right-1/3 rounded-full bg-emerald-500/8 dark:bg-emerald-500/12 animate-float-orb w-[400px] h-[400px] blur-[70px] [animation-delay:2s] [animation-duration:14s] will-change-transform" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/30 to-neutral-50 dark:via-neutral-950/30 dark:to-neutral-950 pointer-events-none" />

            <Container className="relative z-10 pt-28 pb-16 flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    <div className="lg:col-span-4 space-y-6">

                        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-neutral-800 bg-zinc-950/80 text-[10px] font-mono text-neutral-400 backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Disponível para novos projetos
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-3xl font-black text-neutral-100 tracking-tight">Davi Milioli</h1>
                                <p className="text-sm font-mono text-indigo-400">Desenvolvedor Full-Stack</p>
                            </div>
                            <p className="text-xs text-neutral-400 leading-relaxed">
                                Dedicado a transformar ideias em soluções digitais por meio de habilidades técnicas e criatividade.
                            </p>
                            <div className="flex gap-3 pt-2">
                                {aboutInfo.personalData.socials.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-neutral-500 hover:text-white transition-colors duration-200"
                                            title={social.name}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm text-left">
                            <div className="px-5 py-4 border-b border-zinc-800/80 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                    <span className="text-sm font-medium text-neutral-300">Navegação</span>
                                </div>
                                <span className="text-xs text-neutral-600">{heroTabs.length} seções</span>
                            </div>

                            {heroTabs.map((tab, idx) => {
                                const Icon = tab.icon;
                                const isSelected = activeTab === idx;
                                const isLast = idx === heroTabs.length - 1;
                                return (
                                    <div
                                        key={tab.id}
                                        className={`${!isLast ? 'border-b border-zinc-800/60' : ''} transition-colors duration-200 ${isSelected ? 'bg-zinc-800/40' : 'hover:bg-zinc-800/20'}`}
                                    >
                                        <button
                                            onClick={() => setActiveTab(idx)}
                                            className="w-full px-5 py-4 flex items-center gap-3 text-left focus:outline-none cursor-pointer"
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${isSelected ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-800 text-zinc-500'}`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className={`font-semibold text-sm transition-colors duration-200 ${isSelected ? 'text-white' : 'text-neutral-400'}`}>
                                                    {tab.title}
                                                </span>
                                            </div>
                                            {isSelected && (
                                                <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                                            )}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 font-mono text-[11px] text-neutral-500 space-y-2.5 shadow-2xl backdrop-blur-sm">
                            <div className="flex justify-between gap-8">
                                <span className="text-neutral-600 uppercase text-[10px] tracking-widest">SESSION</span>
                                <span className="text-neutral-300">portfolio / live</span>
                            </div>
                            <div className="flex justify-between gap-8">
                                <span className="text-neutral-600 uppercase text-[10px] tracking-widest">UPTIME</span>
                                <span className="text-neutral-300">{uptime}</span>
                            </div>
                            <div className="flex justify-between gap-8">
                                <span className="text-neutral-600 uppercase text-[10px] tracking-widest">STATUS</span>
                                <span className="text-emerald-500 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                                    operacional
                                </span>
                            </div>
                            <div className="flex justify-between gap-8">
                                <span className="text-neutral-600 uppercase text-[10px] tracking-widest">EXP</span>
                                <span className="text-neutral-300">4 anos</span>
                            </div>
                        </div>

                    </div>

                    <div id="main-dashboard-content" className="lg:col-span-8">
                        <div className={`rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden lg:h-full h-[650px] flex flex-col transition-all duration-300 ${activeTab === 2 ? 'bg-white border border-neutral-200' : 'bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm'}`}>

                            <div className={`flex items-center gap-2 text-xs font-mono border-b pb-4 mb-6 shrink-0 ${activeTab === 2 ? 'text-neutral-400 border-neutral-200' : 'text-neutral-500 border-zinc-800/80'}`}>
                                <span className={activeTab === 2 ? 'text-neutral-300' : 'text-neutral-600'}>~</span>
                                <span>/</span>
                                <span className={activeTab === 2 ? 'text-neutral-500' : 'text-neutral-400'}>davi-milioli</span>
                                <span>/</span>
                                <span className={activeTab === 2 ? 'text-indigo-600 font-semibold' : 'text-indigo-400'}>
                                    {activeTab === 0 ? 'sobre-mim' : activeTab === 1 ? 'skills' : 'projetos'}
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 custom-scroll-dark">
                                <AnimatePresence mode="wait">
                                    {activeTab === 0 && (
                                        <motion.div
                                            key="about"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6 text-left"
                                        >
                                            <div className="space-y-2">
                                                <h2 className="text-xl font-bold text-white">Logs do Sistema</h2>
                                                <p className="text-xs text-neutral-400 leading-relaxed max-w-xl">
                                                    {aboutInfo.personalData.bio}
                                                </p>
                                            </div>

                                            <div className="border-t border-zinc-800/60 pt-6">
                                                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">$ git log --oneline --graph</h3>

                                                <div className="space-y-6 max-h-[380px] overflow-y-auto pr-1 custom-scroll-dark">
                                                    {gitLogs.map((log, idx) => (
                                                        <div key={log.commit} className="relative pl-6 border-l-2 border-zinc-800">
                                                            <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-zinc-950" />
                                                            <div className="space-y-1.5 text-xs font-mono text-neutral-400">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-yellow-500 font-bold">commit {log.commit}</span>
                                                                    <span className="text-neutral-600 text-[10px]">
                                                                        ({idx === 0 ? 'HEAD -> main, origin/main' : 'tag: education-v1'})
                                                                    </span>
                                                                </div>
                                                                <p><span className="text-neutral-600">Author:</span> Davi Milioli &lt;{aboutInfo.personalData.email}&gt;</p>
                                                                <p><span className="text-neutral-600">Date:</span> {log.date}</p>
                                                                <div className="pt-2 text-neutral-300">
                                                                    <p className="font-semibold text-neutral-200">{log.role} @ {log.company}</p>
                                                                    <ul className="list-none pl-4 space-y-1 mt-2 text-neutral-400 text-[11px] leading-relaxed">
                                                                        {log.bullets.map((b, i) => (
                                                                            <li key={i}>* {b}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 1 && (
                                        <motion.div
                                            key="skills"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6 text-left"
                                        >
                                            <div className="space-y-2">
                                                <h2 className="text-xl font-bold text-white">Dependencies (Stack)</h2>
                                                <p className="text-xs text-neutral-400 leading-relaxed">
                                                    Lista de dependências do sistema organizadas em formato package.json.
                                                </p>
                                            </div>

                                            <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl overflow-hidden shadow-inner">
                                                <div className="bg-zinc-900/60 px-4 py-2.5 border-b border-zinc-800/80 flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                                    </div>
                                                    <span className="text-neutral-500 font-mono text-[10px]">package.json</span>
                                                    <span className="w-4" />
                                                </div>
                                                {renderPackageJson()}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 2 && (
                                        <motion.div
                                            key="projects"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6 text-left"
                                        >
                                            <div className="space-y-2">
                                                <h2 className="text-xl font-bold text-neutral-900">Registry (Projetos)</h2>
                                                <p className="text-xs text-neutral-500 leading-relaxed">
                                                    Registro de módulos de software implantados em produção.
                                                </p>
                                            </div>

                                            <div className="max-h-[380px] overflow-y-auto pr-1 custom-scroll-light">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
                                                    {projects.map((project, idx) => {
                                                        const accent = accents[idx % accents.length];
                                                        return (
                                                            <div
                                                                key={project.id}
                                                                onClick={() => setSelectedProject(project)}
                                                                className={`${accent.bg} rounded-xl p-4 cursor-pointer flex flex-col justify-between space-y-4 group transition-all duration-200 shadow-sm`}
                                                            >
                                                                <div>
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <span className={`text-[10px] font-mono uppercase tracking-widest ${accent.label}`}>
                                                                            {project.category === 'app-web' ? 'Web App' : project.category === 'app-mobile' ? 'Mobile App' : 'Website'}
                                                                        </span>
                                                                    </div>
                                                                    <h4 className={`font-bold text-sm transition-colors ${accent.title}`}>{project.name}</h4>
                                                                    <p className={`text-[11px] leading-relaxed mt-1.5 line-clamp-3 ${accent.desc}`}>{project.description}</p>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <div className="flex flex-wrap gap-1">
                                                                        {project.technologies.slice(0, 3).map((tech) => (
                                                                            <span key={tech} className="px-1.5 py-0.5 text-[9px] bg-neutral-50 border border-neutral-200/80 rounded text-neutral-500 font-mono">
                                                                                {tech}
                                                                            </span>
                                                                        ))}
                                                                        {project.technologies.length > 3 && (
                                                                            <span className="px-1.5 py-0.5 text-[9px] bg-neutral-50 border border-neutral-200/80 rounded text-neutral-500 font-mono">
                                                                                +{project.technologies.length - 3}
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    <div className={`flex items-center justify-between text-xs font-medium border-t border-neutral-100 pt-2 transition-colors ${accent.btn} border-0`}>
                                                                        <span>Detalhes do registro</span>
                                                                        <HiArrowNarrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                        </div>
                    </div>

                </div>
            </Container>

            <button
                onClick={() => setIsContactOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full p-4 shadow-xl border border-indigo-400 cursor-pointer flex items-center justify-center transition-all hover:scale-105 group"
                title="Abrir Contato (Ctrl + K)"
            >
                <HiOutlineMail className="w-6 h-6 group-hover:scale-115 transition-transform duration-200" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-neutral-950 animate-ping" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-neutral-950" />
            </button>

            <AnimatePresence>
                {isContactOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                        onClick={() => setIsContactOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 15 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 15 }}
                            transition={{ type: "spring", duration: 0.4 }}
                            className="w-full max-w-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsContactOpen(false)}
                                className="absolute top-4 right-4 z-50 text-neutral-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-zinc-800 cursor-pointer"
                            >
                                <HiX className="w-5 h-5" />
                            </button>
                            <ContactForm />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
