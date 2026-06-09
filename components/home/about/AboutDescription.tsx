'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { HiCheck, HiOutlineDocumentText } from 'react-icons/hi';
import Badge from '@/components/ui/Badge';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';
import CurriculoModal from '@/components/home/hero/CurriculoModal';

export default function AboutDescription() {
    const highlights = [
        '4+ anos de experiência com Desenvolvimento Web',
        'Experiência com Next.js, Node.js, React, TypeScript e Tailwind CSS',
        'Otimização de fluxos de desenvolvimento com IA e Model Context Protocol (MCP)',
        'Participação em mais de 80 projetos ao longo de 4 anos',
        'Foco em infraestrutura moderna, automação de deploys e entrega contínua',
    ];

    const [curriculoOpen, setCurriculoOpen] = useState(false);

    return (
        <>
            <motion.div
                className="space-y-7 lg:pt-2"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            >
                <div className="space-y-2">
                    <Badge>Sobre Mim</Badge>
                    <Heading level="h2" className="text-white">
                        Quem está por trás{' '}
                        <span className="italic font-light text-neutral-400">do código.</span>
                    </Heading>
                </div>

                <p className="text-neutral-400 leading-relaxed text-base">
                    Desenvolvedor web com foco em criar experiências digitais que combinam bom design com código sólido. Selecione uma seção ao lado para saber mais sobre mim.
                </p>

                <ul className="space-y-3">
                    {highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                            <HiCheck className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="border-l-2 border-indigo-500 pl-4">
                    <p className="text-sm text-neutral-400 italic leading-relaxed">
                        Sempre em busca de novos desafios e oportunidades para evoluir profissionalmente.
                    </p>
                </div>

                <div>
                    <Button variant="primary" onClick={() => setCurriculoOpen(true)}>
                        <HiOutlineDocumentText className="w-4 h-4 mr-1.5" />
                        Ver currículo
                    </Button>
                </div>

                {/*                 <div className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/30">
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2">Nota</p>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                        Aberto a projetos freelance e oportunidades de trabalho remoto. Entre em contato para conversarmos sobre como posso contribuir com o seu projeto.
                    </p>
                </div> */}
            </motion.div>

            <CurriculoModal open={curriculoOpen} onClose={() => setCurriculoOpen(false)} />
        </>
    );
}
