'use client';

import { useRef, useState } from 'react';
import type { HTMLAttributes } from 'react';
import { HiClipboard, HiClipboardCheck } from 'react-icons/hi';

export default function CodeBlock(props: HTMLAttributes<HTMLPreElement>) {
    const [copied, setCopied] = useState(false);
    const preRef = useRef<HTMLPreElement>(null);

    const handleCopy = async () => {
        const text = preRef.current?.textContent ?? '';
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative my-4">
            <pre
                {...props}
                ref={preRef}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 pr-14 overflow-x-auto text-xs font-mono leading-relaxed text-neutral-200"
            />
            <button
                type="button"
                onClick={handleCopy}
                aria-label="Copiar skill"
                className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-neutral-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
                {copied ? (
                    <HiClipboardCheck className="w-4 h-4 text-emerald-400" />
                ) : (
                    <HiClipboard className="w-4 h-4" />
                )}
            </button>
        </div>
    );
}
