import HeroContent from '@/components/home/hero/HeroContent';

export default function Hero() {
    return (
        <section className="min-h-screen relative flex flex-col text-neutral-100 antialiased overflow-hidden bg-[#09090b] bg-[radial-gradient(ellipse_at_30%_5%,rgba(59,130,246,0.09)_0%,rgba(9,9,11,0)_50%),radial-gradient(ellipse_at_70%_95%,rgba(139,92,246,0.08)_0%,rgba(9,9,11,0)_50%)]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-48 -left-48 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 animate-float-orb w-[700px] h-[700px] blur-[140px]" />
                <div className="absolute -bottom-64 -right-48 rounded-full bg-purple-500/10 dark:bg-purple-500/20 animate-float-orb w-[800px] h-[800px] blur-[160px] [animation-delay:4s] [animation-direction:reverse]" />
                <div className="absolute top-1/3 right-1/3 rounded-full bg-emerald-500/8 dark:bg-emerald-500/12 animate-float-orb w-[500px] h-[500px] blur-[120px] [animation-delay:2s] [animation-duration:14s]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/30 to-neutral-50 dark:via-neutral-950/30 dark:to-neutral-950 pointer-events-none" />
            <HeroContent />
        </section>
    );
}
