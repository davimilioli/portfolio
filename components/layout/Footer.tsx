import Container from "@/components/ui/Container";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-zinc-950/85 backdrop-blur border-t border-zinc-900 text-neutral-500 py-3 z-30">
            <Container className="flex justify-between items-center text-xs">
                <p>
                    &copy; 2026 Davi Milioli. Todos os direitos reservados.
                </p>
                <p className="font-mono text-neutral-600">
                    v4.0.0
                </p>
            </Container>
        </footer>
    );
}