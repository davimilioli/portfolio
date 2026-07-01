'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '@/components/ui/Button';
import { categoriesSkills, skills } from '@/data/skills';
import SkillCard from './SkillCard';


export default function ExpandableSkills() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        key="extra-skills"
                        className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6 overflow-hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                        {skills.slice(6).map((skillItem, index) => {
                            const categoryLabel = categoriesSkills[skillItem.category] || skillItem.category;
                            return (
                                <motion.div
                                    key={skillItem.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.05,
                                        ease: [0.16, 1, 0.3, 1] as const,
                                    }}
                                >
                                    <SkillCard
                                        skill={skillItem.skill}
                                        icon={skillItem.icon}
                                        categoryLabel={categoryLabel}
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-12 flex justify-center">
                <Button
                    onClick={() => setIsExpanded(!isExpanded)}
                    variant="primary"
                >
                    {isExpanded ? 'Ver menos' : 'Ver mais'}
                </Button>
            </div>
        </>
    );
}
