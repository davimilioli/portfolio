import Container from '@/components/ui/Container';
import ProfileCard from '@/components/home/about/ProfileCard';
import AboutDescription from '@/components/home/about/AboutDescription';

export default function About() {
    return (
        <>
            <style>{`
                .about-scrollbar::-webkit-scrollbar { width: 4px; }
                .about-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .about-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 9999px; }
                .about-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
                .about-scrollbar { scrollbar-width: thin; scrollbar-color: #27272a transparent; }
            `}</style>

            <section className="relative w-full text-white py-16 md:py-28 border-b border-zinc-900 overflow-hidden bg-grid bg-[#09090b] bg-neutral-950 ">

                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-40 -left-40 rounded-full bg-blue-600/8 w-[500px] h-[500px] blur-[140px]" />
                    <div className="absolute -bottom-40 -right-40 rounded-full bg-purple-600/8 w-[500px] h-[500px] blur-[140px]" />
                </div>

                <Container className="relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        <ProfileCard />
                        <AboutDescription />
                    </div>
                </Container>
            </section>
        </>
    );
}
