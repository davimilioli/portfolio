'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { HiCode } from 'react-icons/hi';
import Button from '@/components/ui/Button';
import SkillMarkdownModal from './SkillMarkdownModal';

interface SkillCardProps {
    name: string;
    description: string;
    children: ReactNode;
    buttonLabel?: string;
}

export default function SkillCard({ name, description, children, buttonLabel = "Ver skill em Markdown" }: SkillCardProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="h-full flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
            <h4 className="text-sm font-semibold text-neutral-900 mb-1.5">{name}</h4>
            <p className="text-sm leading-relaxed text-neutral-600 mb-4">{description}</p>
            <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(true)}
                className="!px-4 !py-2 text-xs mt-auto self-start"
            >
                <HiCode className="w-4 h-4" />
                {buttonLabel}
            </Button>

            <SkillMarkdownModal open={open} title={name} onClose={() => setOpen(false)}>
                {children}
            </SkillMarkdownModal>
        </div>
    );
}
