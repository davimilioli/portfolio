import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SkillsContent from '@/app/skills/components/SkillsContent';

export const metadata: Metadata = {
  title: 'Skills - Davi Milioli',
  description: 'Confira minhas competências técnicas, frameworks e ferramentas que utilizo.',
};

export default function SkillsPage() {
  return (
    <section className="relative w-full min-h-screen text-white py-16 md:py-24 overflow-hidden bg-neutral-950 bg-[radial-gradient(ellipse_at_30%_5%,rgba(59,130,246,0.09)_0%,rgba(9,9,11,0)_50%),radial-gradient(ellipse_at_70%_95%,rgba(139,92,246,0.08)_0%,rgba(9,9,11,0)_50%)]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 rounded-full bg-blue-600/10 animate-float-orb w-[600px] h-[600px] blur-[140px] translate-x-[30%] -translate-y-[30%]" />
        <div className="absolute bottom-0 left-0 rounded-full bg-purple-600/10 animate-float-orb w-[600px] h-[600px] blur-[140px] -translate-x-[30%] translate-y-[30%] [animation-delay:3s] [animation-direction:reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/6 animate-float-orb w-[400px] h-[400px] blur-[120px] [animation-delay:6s] [animation-duration:16s]" />
      </div>

      <Container className="relative z-10">
        <SkillsContent />
      </Container>
    </section>
  );
}
