import Image from 'next/image';
import { HiArrowNarrowRight } from 'react-icons/hi';

interface FeaturedProjectCardProps {
    title: string;
    description: string;
    tag: string;
    tagClass?: string;
    img?: string;
    onClick?: () => void;
}

export default function FeaturedProjectCard({
    title,
    description,
    tag,
    img,
    onClick
}: FeaturedProjectCardProps) {
    return (
        <div
            onClick={onClick}
            className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-zinc-700 transition-all duration-300 flex flex-col"
        >

            <div className="px-5 pt-5 pb-3 text-xs font-mono text-neutral-500 uppercase tracking-widest">
                • {tag} &nbsp;·&nbsp; {title}
            </div>


            <div className="mx-4 rounded-xl bg-zinc-950 overflow-hidden h-56 relative border border-zinc-800/50 flex-shrink-0">
                {img ? (
                    img.endsWith('.mp4') ? (
                        <video
                            src={img}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <Image
                            src={img}
                            alt={title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    )
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
                        <span className="text-9xl font-black text-zinc-800/70 leading-none">
                            {title.charAt(0)}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent pointer-events-none" />
            </div>


            <div className="px-5 pt-5 pb-6 flex flex-col flex-1 space-y-3">
                <h3 className="text-lg font-bold text-neutral-100 group-hover:text-white transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed flex-1">
                    {description}
                </p>
                <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-sm text-neutral-200 border border-zinc-700 rounded-full px-4 py-2 group-hover:border-zinc-500 group-hover:text-white transition-all duration-200">
                        Ver detalhes
                        <HiArrowNarrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </span>
                </div>
            </div>
        </div>
    );
}
