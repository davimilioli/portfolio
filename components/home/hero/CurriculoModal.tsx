'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HiOutlineDownload, HiX } from 'react-icons/hi';
import Button from '@/components/ui/Button';

interface CurriculoModalProps {
    open: boolean;
    onClose: () => void;
}

export default function CurriculoModal({ open, onClose }: CurriculoModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-4xl h-full max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl z-[70]"
                        initial={{ opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 16 }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    >
                        <div className="flex items-center justify-between px-6 py-4 bg-zinc-950/75 backdrop-blur-md border-b border-zinc-800/60 shadow-lg shrink-0">
                            <span className="text-sm font-semibold text-neutral-200">
                                Currículo
                            </span>
                            <div className="flex items-center gap-2">
                                <Button
                                    href="/curriculoDaviMilioli.pdf"
                                    download
                                    variant="primary"
                                >
                                    <HiOutlineDownload className="w-3.5 h-3.5 mr-1.5" />
                                    Baixar
                                </Button>
                                <Button
                                    variant="transparent"
                                    onClick={onClose}
                                    aria-label="Fechar"
                                    className="p-2"
                                >
                                    <HiX className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        <iframe
                            src="/curriculoDaviMilioli.pdf"
                            className="flex-1 w-full"
                            title="Curriculo Davi Milioli"
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
