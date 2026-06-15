import type { MDXComponents } from 'mdx/types'
import CodeBlock from '@/components/mdx/CodeBlock'
import SkillCard from '@/components/mdx/SkillCard'
import McpCard from '@/components/mdx/McpCard'
import FigmaChatDemo from '@/components/mdx/FigmaChatDemo'
import GithubChatDemo from '@/components/mdx/GithubChatDemo'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => (
            <h1 className="text-lg font-bold text-neutral-900 mb-3">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mt-6 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-sm font-semibold text-neutral-800 mt-4 mb-1.5">{children}</h3>
        ),
        p: ({ children }) => (
            <p className="text-sm leading-relaxed text-neutral-700 mb-4 last:mb-0">{children}</p>
        ),
        ul: ({ children }) => (
            <ul className="list-disc marker:text-emerald-500 pl-5 space-y-1.5 text-sm leading-relaxed text-neutral-700 mb-4">{children}</ul>
        ),
        ol: ({ children }) => (
            <ol className="list-decimal marker:text-emerald-500 pl-5 space-y-1.5 text-sm leading-relaxed text-neutral-700 mb-4">{children}</ol>
        ),
        li: ({ children }) => (
            <li>{children}</li>
        ),
        a: ({ children, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium underline underline-offset-2 hover:text-indigo-700">
                {children}
            </a>
        ),
        strong: ({ children }) => (
            <strong className="font-semibold text-neutral-900">{children}</strong>
        ),
        code: ({ className, children, ...props }) => {
            const isCodeBlock = typeof className === 'string' && className.startsWith('language-');
            if (isCodeBlock) {
                return <code className={className} {...props}>{children}</code>;
            }
            return (
                <code className="px-1.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-800 text-[0.8em] font-mono" {...props}>
                    {children}
                </code>
            );
        },
        pre: CodeBlock,
        SkillCard,
        McpCard,
        FigmaChatDemo,
        GithubChatDemo,
        ...components,
    }
}
