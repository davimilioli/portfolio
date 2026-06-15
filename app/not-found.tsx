import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden bg-grid bg-[#09090b] bg-neutral-950 text-white">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 rounded-full bg-blue-600/8 w-[500px] h-[500px] blur-[140px]" />
                <div className="absolute -bottom-40 -right-40 rounded-full bg-purple-600/8 w-[500px] h-[500px] blur-[140px]" />
            </div>
            <Container className="relative z-10 flex flex-col items-center justify-center">
                <div className="max-w-md mx-auto">
                    <h1 className="text-7xl font-bold text-zinc-200 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold mb-3 text-zinc-100">Página não encontrada</h2>
                    <p className="text-zinc-400 mb-8">O link que você tentou acessar não existe ou mudou de lugar.</p>
                    <Link href="/">
                        <Button variant="ghost" className="flex mx-auto">
                            Voltar ao Ínicio
                        </Button>
                    </Link>
                </div>
            </Container>
        </div>
    );
}