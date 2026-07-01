'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';

export interface ChatDemoStep {
    type: 'processing' | 'message' | 'code';
    content: ReactNode;
}

interface ChatDemoProps {
    label: ReactNode;
    userMessage: ReactNode;
    steps: ChatDemoStep[];
    stepDelay?: number;
}

export default function ChatDemo({ label, userMessage, steps, stepDelay = 1400 }: ChatDemoProps) {
    const [step, setStep] = useState(0);
    const [runId, setRunId] = useState(0);

    useEffect(() => {
        setStep(0);

        const timers = steps.map((_, index) =>
            setTimeout(() => setStep(index + 1), stepDelay * (index + 1))
        );

        return () => timers.forEach(clearTimeout);
    }, [runId, steps, stepDelay]);

    return (
        <div className="w-full h-full flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm my-6">
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono font-semibold text-neutral-500 tracking-wide">
                        {label}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={() => setRunId((id) => id + 1)}
                    className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide px-2 py-1 rounded-md bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 transition-colors cursor-pointer"
                >
                    <HiOutlineRefresh className="w-3 h-3" />
                    Reiniciar
                </button>
            </div>

            <div className="p-4 space-y-3 text-sm flex-1 min-h-[300px] flex flex-col justify-end">
                <div className="flex flex-col items-end gap-1 animate-message-in">
                    <span className="text-[10px] text-neutral-400">Você</span>
                    <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[85%] leading-relaxed">
                        {userMessage}
                    </div>
                </div>

                {steps.map((current, index) => {
                    if (step < index + 1) return null;

                    return (
                        <div key={index} className={`flex flex-col items-start gap-1 animate-message-in ${current.type === 'code' ? 'w-full' : ''}`}>
                            <span className="text-[10px] text-neutral-400">IA</span>
                            {current.type === 'processing' && (
                                <div className="bg-neutral-100 text-neutral-600 rounded-2xl rounded-tl-sm px-4 py-2 inline-flex items-center gap-2 text-xs font-mono">
                                    <HiOutlineRefresh className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                                    {current.content}
                                </div>
                            )}
                            {current.type === 'message' && (
                                <div className="bg-neutral-100 text-neutral-700 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%] leading-relaxed">
                                    {current.content}
                                </div>
                            )}
                            {current.type === 'code' && (
                                <pre className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-[11px] leading-relaxed font-mono text-neutral-200 overflow-x-auto">
                                    {current.content}
                                </pre>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
