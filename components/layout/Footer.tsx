import Container from "@/components/ui/Container";

export default function Footer() {
    return (
        <footer className="w-full bg-neutral-950 text-neutral-500 py-8 border-t border-neutral-800">
            <Container className="flex justify-center">
                <p className="text-base text-neutral-500">
                    &copy; 2026 Davi Milioli. Todos os direitos reservados.
                </p>
            </Container>
        </footer>
    );
}