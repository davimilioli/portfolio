'use server';

import { headers } from 'next/headers';
import emailjs from '@emailjs/nodejs';

emailjs.init({
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY!,
    privateKey: process.env.EMAILJS_PRIVATE_KEY!,
});

export interface ContactFormData {
    firstName: string;
    email: string;
    message: string;
}

export interface ContactResult {
    success: boolean;
    error?: string;
}

const COOLDOWN_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 2;

interface RateLimitData {
    count: number;
    firstSubmission: number;
}

const rateLimitMap = new Map<string, RateLimitData>();

function pruneMap() {
    const now = Date.now();
    for (const [ip, data] of rateLimitMap) {
        if (now - data.firstSubmission > COOLDOWN_MS) {
            rateLimitMap.delete(ip);
        }
    }
}

export async function sendContact(data: ContactFormData): Promise<ContactResult> {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0].trim() ?? headersList.get('x-real-ip') ?? 'unknown';

    pruneMap();

    const now = Date.now();
    const userLimit = rateLimitMap.get(ip);

    if (userLimit) {
        if (now - userLimit.firstSubmission > COOLDOWN_MS) {
            rateLimitMap.delete(ip);
        } else if (userLimit.count >= MAX_ATTEMPTS) {
            const timePassed = now - userLimit.firstSubmission;
            const remainingMs = COOLDOWN_MS - timePassed;

            const minutes = Math.floor(remainingMs / 60000);
            const seconds = Math.ceil((remainingMs % 60000) / 1000);

            const timeString = minutes > 0 ? `${minutes}m e ${seconds}s` : `${seconds}s`;

            return {
                success: false,
                error: `Limite de envios atingido. Por favor, aguarde ${timeString} antes de tentar novamente.`,
            };
        }
    }

    try {
        await emailjs.send(
            process.env.EMAILJS_SERVICE_ID!,
            process.env.EMAILJS_TEMPLATE_ID!,
            {
                from_name: data.firstName,
                from_email: data.email,
                message: data.message,
            }
        );

        if (!rateLimitMap.has(ip)) {
            rateLimitMap.set(ip, { count: 1, firstSubmission: now });
        } else {
            const current = rateLimitMap.get(ip)!;
            rateLimitMap.set(ip, { count: current.count + 1, firstSubmission: current.firstSubmission });
        }

        return { success: true };

    } catch (error) {
        console.error('Erro ao enviar e-mail via EmailJS:', error);
        return {
            success: false,
            error: 'Erro ao enviar a mensagem. Tente novamente.'
        };
    }
}