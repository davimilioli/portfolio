'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import type { ReactNode } from 'react';
import { HiX } from 'react-icons/hi';
import Button from '@/components/ui/Button';

interface SkillMarkdownModalProps {
    open: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export default function SkillMarkdownModal({ open, title, onClose, children }: SkillMarkdownModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previousOverflow; };
    }, [open]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                    />

                    <div className="fixed inset-0 flex items-center justify-center p-0 md:p-6 z-[90] pointer-events-none">
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            className="pointer-events-auto relative w-full h-full md:h-auto md:max-h-[85vh] md:max-w-3xl bg-white border-0 md:border md:border-neutral-200 rounded-none md:rounded-3xl flex flex-col shadow-2xl overflow-hidden"
                            initial={{ opacity: 0, scale: 0.96, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 12 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
                        >
                            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-neutral-200 shrink-0">
                                <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
                                <Button variant="transparent" onClick={onClose} aria-label="Fechar" className="!p-2">
                                    <HiX className="w-5 h-5" />
                                </Button>
                            </div>
                            <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
