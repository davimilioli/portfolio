import HeroContent from '@/components/home/HeroContent';
import Logo from '@/components/Logo';

export default function Home() {
    return (
        <section className="min-h-screen relative flex flex-col text-neutral-100 antialiased overflow-hidden bg-neutral-950 bg-[radial-gradient(ellipse_at_30%_5%,rgba(59,130,246,0.09)_0%,rgba(9,9,11,0)_50%),radial-gradient(ellipse_at_70%_95%,rgba(139,92,246,0.08)_0%,rgba(9,9,11,0)_50%)]">
            <div className="absolute -left-32 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                <Logo className="w-[700px] md:w-[900px] lg:w-[1100px] h-auto opacity-[0.04]" />
            </div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="hidden md:block absolute -top-48 -left-48 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 animate-float-orb w-[600px] h-[600px] blur-[80px] will-change-transform" />
                <div className="hidden md:block absolute -bottom-64 -right-48 rounded-full bg-purple-500/10 dark:bg-purple-500/20 animate-float-orb w-[700px] h-[700px] blur-[80px] [animation-delay:4s] [animation-direction:reverse] will-change-transform" />
                <div className="hidden lg:block absolute top-1/3 right-1/3 rounded-full bg-emerald-500/8 dark:bg-emerald-500/12 animate-float-orb w-[400px] h-[400px] blur-[70px] [animation-delay:2s] [animation-duration:14s] will-change-transform" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/30 to-neutral-50 dark:via-neutral-950/30 dark:to-neutral-950 pointer-events-none" />
            <HeroContent />
        </section>
    );
}
