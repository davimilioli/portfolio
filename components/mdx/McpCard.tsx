import { HiExternalLink } from 'react-icons/hi';
import Button from '@/components/ui/Button';

interface McpCardProps {
    name: string;
    description: string;
    href: string;
}

export default function McpCard({ name, description, href }: McpCardProps) {
    return (
        <div className="h-full flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
            <h4 className="text-sm font-semibold text-neutral-900 mb-1.5">{name}</h4>
            <p className="text-sm leading-relaxed text-neutral-600 mb-4">{description}</p>
            <Button
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="!px-4 !py-2 text-xs mt-auto self-start"
            >
                <HiExternalLink className="w-4 h-4" />
                Ver documentação
            </Button>
        </div>
    );
}
