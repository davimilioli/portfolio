import { HiCheck } from 'react-icons/hi';
import { aboutInfo } from '@/data/about';
import Heading from '@/components/ui/Heading';
import Badge from '@/components/ui/Badge';

export default function ContactInfo() {
    return (
        <div className="lg:col-span-5 flex flex-col justify-start space-y-7 lg:sticky lg:top-24 h-fit">

            <div className="space-y-2">
                <Badge>Fale comigo</Badge>
                <Heading level="h2" className="text-white">
                    Contato
                </Heading>
            </div>

            <p className="text-neutral-400 text-base leading-relaxed">
                Envie uma mensagem, em breve responderei seu contato.
            </p>

            <ul className="space-y-3">
                {aboutInfo.expertise.map((item) => (
                    <li key={item.id} className="flex items-start gap-3 text-sm text-neutral-300">
                        <HiCheck className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                        <span>
                            <span className="font-semibold text-neutral-200">{item.title}</span>
                            {item.description && (
                                <span className="text-neutral-500"> — {item.description}</span>
                            )}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="flex items-center gap-3 pt-2 border-t border-zinc-900/60">
                {aboutInfo.personalData.socials.map((social) => {
                    const Icon = social.icon;
                    return (
                        <a
                            key={social.name}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-black/60 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg text-neutral-400 hover:text-white transition-all duration-300"
                            title={social.name}
                        >
                            <Icon className="w-5 h-5" />
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
