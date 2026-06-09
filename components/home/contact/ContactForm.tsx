'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { sendContact } from '@/app/actions/contact';

interface ChatMessage {
    id: string;
    type: 'bot' | 'user';
    text: string;
    time: string;
}

export default function ContactForm() {
    const getTime = () =>
        new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const steps = [
        { field: 'firstName', question: 'Olá! Para começar, qual é o seu nome?', placeholder: 'Seu nome...', type: 'text' },
        { field: 'email', question: 'Qual é o seu e-mail para contato?', placeholder: 'seuemail@exemplo.com', type: 'email' },
        { field: 'message', question: 'Perfeito! O que você gostaria de dizer?', placeholder: 'Escreva sua mensagem...', type: 'textarea' },
    ];

    function validate(value: string, step: number): string | null {
        if (!value.trim()) return 'Por favor, preencha este campo.';
        if (step === 1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'E-mail inválido.';
        if (step === 2 && value.trim().length < 10) return 'Mínimo de 10 caracteres.';
        return null;
    }

    const [step, setStep] = useState(0);
    const [input, setInput] = useState('');
    const [inputErr, setInputErr] = useState('');
    const [values, setValues] = useState({ firstName: '', email: '', message: '' });
    const [messages, setMessages] = useState<ChatMessage[]>(() => [
        { id: 'init', type: 'bot', text: steps[0].question, time: getTime() },
    ]);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, status]);

    useEffect(() => {
        if (status === 'idle') {
            if (steps[step]?.type === 'textarea') {
                textareaRef.current?.focus({ preventScroll: true });
            } else {
                inputRef.current?.focus({ preventScroll: true });
            }
        }
    }, [step, status]);

    const pushBotMessage = (text: string) => {
        setMessages(prev => [...prev, { id: Date.now().toString(), type: 'bot', text, time: getTime() }]);
    };

    const handleSend = async () => {
        const err = validate(input, step);
        if (err) { setInputErr(err); return; }
        setInputErr('');

        const userMsg: ChatMessage = { id: Date.now().toString(), type: 'user', text: input.trim(), time: getTime() };
        const fieldKey = steps[step].field as keyof typeof values;
        const newValues = { ...values, [fieldKey]: input.trim() };
        setValues(newValues);
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        if (step < steps.length - 1) {
            const next = step + 1;
            setStep(next);
            setTimeout(() => pushBotMessage(steps[next].question), 500);
        } else {
            setStatus('submitting');
            const result = await sendContact(newValues);
            if (result.success) {
                setStatus('success');
                setTimeout(() => pushBotMessage('Mensagem recebida! Entrarei em contato em breve. 🎉'), 500);
            } else {
                setStatus('error');
                setTimeout(() => {
                    pushBotMessage(result.error ?? 'Ops! Algo deu errado. Tente novamente.');
                    setStatus('idle');
                    setStep(2);
                }, 500);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };

    const isDone = status === 'success';
    const isSubmitting = status === 'submitting';
    const isTextarea = steps[step]?.type === 'textarea';

    const statusTags = [
        values.firstName && { label: 'NOME', value: values.firstName },
        values.email && { label: 'EMAIL', value: values.email },
        values.message && { label: 'MSG', value: values.message.slice(0, 14) + (values.message.length > 14 ? '…' : '') },
        isSubmitting && { label: '●', value: 'enviando…', accent: 'amber' },
        isDone && { label: '●', value: 'enviado!', accent: 'green' },
    ].filter(Boolean) as { label: string; value: string; accent?: string }[];

    return (
        <div className="lg:col-span-7 bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm flex flex-col h-[500px]">

            <div className="px-5 py-3.5 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-neutral-400">Mensagem &nbsp;·&nbsp; portfolio</span>
                </div>
                <span className="text-xs font-mono text-neutral-600">Contato &nbsp;·&nbsp; online</span>
            </div>

            <div
                ref={chatRef}
                className="flex-1 overflow-y-auto p-5 space-y-3 [scrollbar-width:thin] [scrollbar-color:#27272a_transparent]"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-3/4 px-4 py-2.5 rounded-2xl ${msg.type === 'user'
                                ? 'bg-zinc-800 text-neutral-200 rounded-tr-sm'
                                : 'bg-indigo-500 text-white rounded-tl-sm'
                                }`}>
                                {msg.type === 'bot' && (
                                    <p className="text-xs font-bold uppercase tracking-widest text-blue-200/70 mb-1">Davi</p>
                                )}
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <p className={`text-xs mt-1 text-right ${msg.type === 'user' ? 'text-neutral-500' : 'text-blue-200/60'}`}>
                                    {msg.time}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isSubmitting && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                    >
                        <div className="bg-indigo-500/40 px-4 py-3 rounded-2xl rounded-tl-sm">
                            <div className="flex gap-1 items-center">
                                {[0, 150, 300].map((delay) => (
                                    <span
                                        key={delay}
                                        className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-bounce"
                                        style={{ animationDelay: `${delay}ms` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
            <AnimatePresence>
                {!isDone && !isSubmitting && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="border-t border-zinc-800/80 p-4 shrink-0"
                    >
                        <div className="flex gap-2 items-end">
                            {isTextarea ? (
                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={(e) => { setInput(e.target.value); setInputErr(''); }}
                                    onKeyDown={handleKeyDown}
                                    rows={2}
                                    placeholder={steps[step]?.placeholder}
                                    className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none resize-none transition-colors"
                                />
                            ) : (
                                <input
                                    ref={inputRef}
                                    type={steps[step]?.type as string}
                                    value={input}
                                    onChange={(e) => { setInput(e.target.value); setInputErr(''); }}
                                    onKeyDown={handleKeyDown}
                                    placeholder={steps[step]?.placeholder}
                                    className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none transition-colors"
                                />
                            )}
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-25 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                            >
                                <HiArrowNarrowRight className="w-4 h-4 text-white" />
                            </button>
                        </div>
                        {inputErr && <p className="text-xs text-red-400 mt-1.5 ml-1">{inputErr}</p>}
                    </motion.div>
                )}
            </AnimatePresence>

            {statusTags.length > 0 && (
                <div className="px-4 pb-4 flex flex-wrap gap-1.5 shrink-0">
                    {statusTags.map((tag, i) => (
                        <span
                            key={i}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider border ${tag.accent === 'green'
                                ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                                : tag.accent === 'amber'
                                    ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                                    : 'border-zinc-700/60 text-neutral-500 bg-zinc-900/60'
                                }`}
                        >
                            <span className="font-semibold">{tag.label}</span>
                            {tag.value && <span className="text-neutral-600 mx-0.5">·</span>}
                            <span>{tag.value}</span>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
