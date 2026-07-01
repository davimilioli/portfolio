'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HiOutlineHome,
    HiOutlineUser,
    HiOutlineCode,
    HiOutlineFolder,
    HiOutlineMail,
    HiChevronRight
} from 'react-icons/hi';
import Logo from '@/components/Logo';

export default function Sidebar({ className = '' }: { className?: string }) {
    const pathname = usePathname();

    const isProjects = pathname.startsWith('/projects');
    const isAbout = pathname === '/about';
    const isContact = pathname === '/contact';

    const asideClasses = isProjects
        ? 'bg-neutral-50 text-neutral-900'
        : isAbout
            ? 'bg-neutral-950 bg-grid text-neutral-100'
            : isContact
                ? 'bg-neutral-950 bg-dots text-neutral-100'
                : 'bg-neutral-950 bg-[radial-gradient(ellipse_at_30%_5%,rgba(59,130,246,0.09)_0%,rgba(9,9,11,0)_50%),radial-gradient(ellipse_at_70%_95%,rgba(139,92,246,0.08)_0%,rgba(9,9,11,0)_50%)] text-neutral-100';

    const borderClass = isProjects ? 'border-neutral-200' : 'border-zinc-800';
    const headerBorderClass = isProjects ? 'border-neutral-200/80' : 'border-zinc-800/80';
    const profileCardBorderClass = isProjects ? 'border-neutral-200 bg-neutral-100/60' : 'border-zinc-800/60 bg-zinc-900/25';
    const textTitleClass = isProjects ? 'text-neutral-800' : 'text-neutral-200';
    const textDescClass = isProjects ? 'text-neutral-500' : 'text-neutral-400';
    const textRoleClass = isProjects ? 'text-indigo-600' : 'text-indigo-400';
    const initialsBgClass = isProjects ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-indigo-600/10 border-indigo-500/20 text-indigo-400';
    const versionBadgeClass = isProjects ? 'border-neutral-200 bg-neutral-200/40 text-neutral-500' : 'border-zinc-800 bg-zinc-900/60 text-neutral-400';
    const copyrightBorder = isProjects ? 'border-neutral-200/80' : 'border-zinc-800/60';

    const menuItems = [
        {
            href: '/',
            title: 'Início',
            iconComponent: HiOutlineHome,
            shortDescription: 'Apresentação e visão geral',
        },
        {
            href: '/about',
            title: 'Sobre mim',
            iconComponent: HiOutlineUser,
            shortDescription: 'Experiência e formação',
        },
        {
            href: '/skills',
            title: 'Skills',
            iconComponent: HiOutlineCode,
            shortDescription: 'Minha stack e competências',
        },
        {
            href: '/projects',
            title: 'Projetos',
            iconComponent: HiOutlineFolder,
            shortDescription: 'Projetos e portfólio',
        },
        {
            href: '/contact',
            title: 'Contato',
            iconComponent: HiOutlineMail,
            shortDescription: 'Envie uma mensagem',
        },
    ];

    return (
        <aside className={`w-80 h-screen sticky top-0 border-r ${borderClass} ${asideClasses} flex flex-col justify-between transition-all duration-300 ${className}`}>
            <div className="flex flex-col flex-1 min-h-0">
                <div className={`p-6 border-b ${headerBorderClass} flex items-center justify-between`}>
                    <Link href="/" className="inline-block">
                        <Logo />
                    </Link>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border ${versionBadgeClass} text-xs font-mono`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        v4.0
                    </span>
                </div>

                <div className={`p-6 border-b ${headerBorderClass} space-y-3`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold text-sm ${initialsBgClass}`}>
                            DM
                        </div>
                        <div className="min-w-0">
                            <h2 className={`font-bold text-md truncate ${textTitleClass}`}>Davi Milioli</h2>
                            <p className={`text-xs font-mono truncate ${textRoleClass}`}>Desenvolvedor Full-Stack</p>
                        </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 w-full rounded border ${profileCardBorderClass} text-xs font-mono ${textDescClass}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Disponível para novos projetos
                    </span>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    {menuItems.map((item, idx) => {
                        const Icon = item.iconComponent;
                        const isSelected = item.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(item.href);
                        const isLast = idx === menuItems.length - 1;

                        let btnClasses = '';
                        let iconCircleClasses = '';
                        let labelClass = '';
                        let shortDescClass = '';

                        if (isProjects) {
                            btnClasses = isSelected
                                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                                : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/50';
                            iconCircleClasses = isSelected
                                ? 'bg-indigo-100 text-indigo-600 scale-105'
                                : 'bg-neutral-200/60 text-neutral-400';
                            labelClass = isSelected ? 'text-indigo-950 font-bold' : 'text-neutral-600';
                            shortDescClass = isSelected ? 'text-indigo-600/70' : 'text-neutral-400';
                        } else {
                            btnClasses = isSelected
                                ? 'bg-zinc-800/40 text-white'
                                : 'text-neutral-400 hover:text-white hover:bg-zinc-800/20';
                            iconCircleClasses = isSelected
                                ? 'bg-indigo-500/20 text-indigo-400 scale-105'
                                : 'bg-zinc-900 text-zinc-500';
                            labelClass = isSelected ? 'text-white' : 'text-neutral-400';
                            shortDescClass = 'text-neutral-600';
                        }

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`w-full px-6 py-3.5 flex items-center gap-3 text-left transition-colors duration-200 ${btnClasses} ${
                                    !isLast ? (isProjects ? 'border-b border-neutral-100/80' : 'border-b border-zinc-800/20') : ''
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${iconCircleClasses}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className={`font-semibold text-md block transition-colors duration-200 ${labelClass}`}>
                                        {item.title}
                                    </span>
                                    <p className={`text-xs truncate mt-0.5 ${shortDescClass}`}>
                                        {item.shortDescription}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    {isSelected && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                    )}
                                    <HiChevronRight className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${isSelected ? 'translate-x-0.5 text-indigo-500' : ''}`} />
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className={`p-6 border-t ${copyrightBorder} bg-transparent text-center shrink-0`}>
                <p className="text-xs text-neutral-500">
                    &copy; 2026 Davi Milioli. Todos os direitos reservados.
                </p>
            </div>
        </aside>
    );
}
