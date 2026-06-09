import ContactForm from '@/components/home/contact/ContactForm';
import ContactInfo from '@/components/home/contact/ContactInfo';
import Container from '@/components/ui/Container';

export default function Contact() {
    return (
        <section className="bg-neutral-950 bg-dots relative w-full text-white py-16 md:py-24 border-t border-zinc-900 overflow-hidden">
            <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                <ContactInfo />
                <ContactForm />
            </Container>
        </section>
    );
}
