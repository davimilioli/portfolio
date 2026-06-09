'use server';

import { headers } from 'next/headers';

export interface ContactFormData {
    firstName: string;
    email: string;
    message: string;
}

export interface ContactResult {
    success: boolean;
    error?: string;
}

const COOLDOWN_MS = 60_000;
const rateLimitMap = new Map<string, number>();

function pruneMap() {
    const now = Date.now();
    for (const [ip, ts] of rateLimitMap) {
        if (now - ts > 60_000) rateLimitMap.delete(ip);
    }
}

export async function sendContact(data: ContactFormData): Promise<ContactResult> {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0].trim() ?? headersList.get('x-real-ip') ?? 'unknown';

    pruneMap();

    const lastSubmission = rateLimitMap.get(ip);
    const now = Date.now();

    if (lastSubmission && now - lastSubmission < COOLDOWN_MS) {
        const remaining = Math.ceil((COOLDOWN_MS - (now - lastSubmission)) / 1000);
        return {
            success: false,
            error: `Aguarde ${remaining}s antes de enviar outra mensagem.`,
        };
    }

    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            template_params: {
                from_name: data.firstName,
                from_email: data.email,
                message: data.message,
            },
        }),
    });

    if (!res.ok) {
        return { success: false, error: 'Erro ao enviar a mensagem. Tente novamente.' };
    }

    rateLimitMap.set(ip, now);
    return { success: true };
}
