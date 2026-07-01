'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HiOutlineDownload, HiX } from 'react-icons/hi';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import Button from '@/components/ui/Button';
import dynamic from 'next/dynamic';

interface ResumeViewerModalProps {
    open: boolean;
    onClose: () => void;
}

const PdfViewer = dynamic(() => import("@/components/modal-viewer/PdfViewer"), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full py-12 px-4 gap-3 animate-pulse">
            <span className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-400 font-mono text-xs tracking-wide">Preparando visualizador...</p>
        </div>
    )
});

export default function ResumeViewerModal({ open, onClose }: ResumeViewerModalProps) {
    const [mounted, setMounted] = useState(false);

    const [scale, setScale] = useState<number>(1.1);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (open && typeof window !== 'undefined') {
            if (window.innerWidth < 640) {
                setScale(0.55);
            } else if (window.innerWidth < 1024) {
                setScale(0.85);
            } else {
                setScale(1.1);
            }
        }
    }, [open]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.15, 2.0));
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.15, 0.4));

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
                            <span className="text-sm font-semibold text-neutral-200">Currículo</span>
                            <div className="flex items-center gap-2">
                                <Button href="/curriculoDaviMilioli.pdf" download variant="secondary">
                                    <HiOutlineDownload className="w-5 h-5" />
                                    <span className="hidden md:block">
                                        Baixar
                                    </span>
                                </Button>
                                <Button onClick={onClose} aria-label="Fechar" className="p-2" variant="icon">
                                    <HiX className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 [scrollbar-width:thin] [scrollbar-color:#27272a_transparent]">
                            <PdfViewer fileUrl="/curriculoDaviMilioli.pdf" scale={scale} />
                        </div>

                        <div className="flex justify-center mx-auto gap-3 items-center p-3 border-t border-zinc-800/40 flex items-center justify-end shrink-0 bg-zinc-950/75 backdrop-blur-md min-h-[64px]">
                            <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800/80 px-3 py-1.5 rounded-xl shadow-lg">
                                <Button
                                    variant="ghost"
                                    onClick={handleZoomOut}
                                    disabled={scale <= 0.4}
                                    className="p-1 text-zinc-400 hover:text-neutral-200 hover:bg-zinc-800/60 rounded-lg disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                                >
                                    <FiZoomOut className="w-4 h-4" />
                                </Button>

                                <span className="text-xs font-mono text-zinc-300 min-w-[36px] text-center select-none">
                                    {Math.round(scale * 100)}%
                                </span>

                                <Button
                                    variant="ghost"
                                    onClick={handleZoomIn}
                                    disabled={scale >= 2.0}
                                    className="p-1 text-zinc-400 hover:text-neutral-200 hover:bg-zinc-800/60 rounded-lg disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                                >
                                    <FiZoomIn className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}