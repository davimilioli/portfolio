"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

export default function Header() {
    const navItems = [
        { label: 'Sobre mim', href: 'sobre' },
        { label: 'Skills', href: 'skills' },
        { label: 'Projetos', href: 'projetos' },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('');

    useEffect(() => {
        let lastScrolled = window.scrollY > 40;
        setScrolled(lastScrolled);
        const handleScroll = () => {
            const isScrolled = window.scrollY > 40;
            if (isScrolled !== lastScrolled) {
                lastScrolled = isScrolled;
                setScrolled(isScrolled);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        navItems.forEach(({ href }) => {
            const el = document.getElementById(href);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(href); },
                { threshold: 0.4 }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach(obs => obs.disconnect());
    }, []);

    const scrollTo = (id: string) => {
        setIsOpen(false);
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 320);
    };

    const navClass = (id: string) =>
        `px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${active === id
            ? 'text-white'
            : 'text-neutral-400 hover:text-neutral-100'
        }`;

    return (
        <header className={`fixed top-0 left-0 w-full z-50 text-white py-4 transition-all duration-300 ease-in-out ${isOpen
            ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60 shadow-lg'
            : scrolled
                ? 'bg-zinc-950/75 backdrop-blur-md border-b border-zinc-800/60 shadow-lg'
                : 'bg-transparent border-b border-transparent'
            }`}>
            <nav className="relative">
                <Container>
                    <div className="flex items-center justify-between relative">

                        <img src="/logo.svg" alt="Logo" className="h-9 md:h-13 w-auto" />

                        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                            {navItems.map(({ label, href }) => (
                                <button key={href} onClick={() => scrollTo(href)} className={navClass(href)}>
                                    {label}
                                </button>
                            ))}
                        </div>

                        <div className="hidden md:flex items-center gap-3">
                            <a href="https://linkedin.com/in/davimilioli" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors duration-200" title="LinkedIn">
                                <FaLinkedin className="w-4.5 h-4.5" />
                            </a>
                            <a href="https://github.com/davimilioli" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors duration-200" title="GitHub">
                                <FaGithub className="w-4.5 h-4.5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors duration-200" title="Instagram">
                                <FaInstagram className="w-4.5 h-4.5" />
                            </a>

                            <div className="h-5 w-px bg-neutral-700 mx-1" />

                            <Button variant="primary" onClick={() => scrollTo('contato')}>
                                Contato
                                <HiArrowNarrowRight className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="relative w-8 h-8 text-neutral-400 hover:text-white focus:outline-none cursor-pointer flex items-center justify-center"
                                aria-label="Menu"
                            >
                                <span className="sr-only">Menu</span>
                                <div className="relative w-7 h-2.5">
                                    <motion.span
                                        className="absolute h-px bg-current rounded-full left-0 top-0"
                                        animate={{
                                            rotate: isOpen ? 45 : 0,
                                            y: isOpen ? 4 : 0,
                                            width: "28px"
                                        }}
                                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                    <motion.span
                                        className="absolute h-px bg-current rounded-full right-0 bottom-0"
                                        animate={{
                                            rotate: isOpen ? -45 : 0,
                                            y: isOpen ? -4 : 0,
                                            width: isOpen ? "28px" : "18px"
                                        }}
                                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </Container>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="mobile-menu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="md:hidden overflow-hidden absolute top-full left-0 w-full bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60 shadow-lg"
                        >
                            <Container>
                                <div className="py-4 flex flex-col gap-2">
                                    {navItems.map(({ label, href }, i) => (
                                        <motion.button
                                            key={href}
                                            initial={{ opacity: 0, x: -12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.06, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                            onClick={() => scrollTo(href)}
                                            className={`w-full text-left px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${active === href
                                                ? 'text-white'
                                                : 'text-neutral-400 hover:text-white'
                                                }`}
                                        >
                                            {label}
                                        </motion.button>
                                    ))}
                                    <hr className="border-neutral-800 my-2" />
                                    <Button variant="primary" className="w-full text-center" onClick={() => scrollTo('contato')}>
                                        Contato
                                        <HiArrowNarrowRight className="w-4 h-4 ml-1.5 inline-block" />
                                    </Button>
                                    <div className="flex justify-center gap-4 mt-2 py-2 border-t border-neutral-800/50">
                                        <a href="https://linkedin.com/in/davimilioli" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white"><FaLinkedin className="w-5 h-5" /></a>
                                        <a href="https://github.com/davimilioli" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white"><FaGithub className="w-5 h-5" /></a>
                                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white"><FaInstagram className="w-5 h-5" /></a>
                                    </div>
                                </div>
                            </Container>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}
