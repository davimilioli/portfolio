'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Badge from '@/components/ui/Badge';
import { categoriesSkills, skills } from '@/data/skills';
import Heading from '@/components/ui/Heading';
import SkillCard from './SkillCard';
import Button from '@/components/ui/Button';

export default function SkillsContent() {

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.06,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1] as const,
            },
        },
    };

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 mb-16 items-end"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            >
                <div className="space-y-2">
                    <Badge>Tech Stacks</Badge>
                    <Heading level="h2" variant="h2" className="text-white leading-tight">
                        Skills
                    </Heading>
                </div>
                <div className="lg:pb-1">
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                        Ferramentas e tecnologias que compõem meu stack de desenvolvimento.
                    </p>
                </div>
            </motion.div>

            <motion.div
                className="border-t border-l border-zinc-800"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
            >
                <div className="grid grid-cols-2 lg:grid-cols-3">
                    {skills.slice(0, 6).map((skillItem) => {
                        const categoryLabel = categoriesSkills[skillItem.category] || skillItem.category;
                        return (
                            <motion.div key={skillItem.id} variants={cardVariants}>
                                <SkillCard
                                    skill={skillItem.skill}
                                    icon={skillItem.icon}
                                    categoryLabel={categoryLabel}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            key="extra-skills"
                            className="overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                        >
                            <div className="grid grid-cols-2 lg:grid-cols-3">
                                {skills.slice(6).map((skillItem, index) => {
                                    const categoryLabel = categoriesSkills[skillItem.category] || skillItem.category;
                                    return (
                                        <motion.div
                                            key={skillItem.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.04 }}
                                        >
                                            <SkillCard
                                                skill={skillItem.skill}
                                                icon={skillItem.icon}
                                                categoryLabel={categoryLabel}
                                            />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="border-r border-b border-zinc-800 flex justify-center py-6">
                    <Button
                        onClick={() => setIsExpanded(!isExpanded)}
                        variant="primary"
                    >
                        {isExpanded ? 'Ver menos' : 'Ver mais'}
                    </Button>
                </div>
            </motion.div>

            <motion.div
                className="mt-10 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <p className="text-xs text-neutral-600">
                    Sempre explorando novas ferramentas.
                </p>
            </motion.div>
        </>
    );
}
