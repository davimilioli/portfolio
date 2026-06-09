'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Badge from '@/components/ui/Badge';
import Container from '@/components/ui/Container';
import Heading from '@/components/ui/Heading';
import ProjectsContent from '@/components/home/projects/ProjectsContent';

export default function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'start 0.2'],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], [24, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

    return (
        <div ref={sectionRef} className="bg-neutral-50">
            <motion.section
                style={{ scale, borderRadius, opacity }}
                className="w-full bg-neutral-50 text-neutral-900 py-16 md:py-24 border-t border-neutral-200 relative overflow-hidden origin-top"
            >
                <Container className="space-y-4 relative z-10">
                    <div className="mb-12 space-y-2">
                        <Badge>Portfólio</Badge>
                        <Heading level="h2" variant="h2">
                            Projetos
                        </Heading>
                    </div>
                    <ProjectsContent />
                </Container>
            </motion.section>
        </div>
    );
}
