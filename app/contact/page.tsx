import type { Metadata } from 'next';
import ContactForm from '@/app/contact/components/ContactForm';
import ContactInfo from '@/app/contact/components/ContactInfo';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Contato - Davi Milioli',
  description: 'Entre em contato comigo. Envie uma mensagem de trabalho, sugestões ou dúvidas.',
};

export default function ContactPage() {
  return (
    <section className="bg-neutral-950 bg-dots relative w-full min-h-screen text-white py-16 md:py-24 border-t border-zinc-900 overflow-hidden">
      <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        <ContactInfo />
        <ContactForm />
      </Container>
    </section>
  );
}
