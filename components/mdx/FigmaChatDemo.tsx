import ChatDemo from './ChatDemo';

export default function FigmaChatDemo() {
    return (
        <ChatDemo
            label={
                <span className="flex items-center gap-1.5">
                    <span>MCP</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                    <span>Figma Pixel Perfect</span>
                </span>
            }
            userMessage={
                <>
                    Crie o componente <code className="font-mono text-indigo-100">PropertyCard</code> seguindo a skill @<strong className="font-semibold">Figma Pixel Perfect</strong><br />
                    e o padrão de layout do projeto.
                </>
            }
            steps={[
                {
                    type: 'processing',
                    content: 'figma_mcp.get_design_context("PropertyCard")...',
                },
                {
                    type: 'message',
                    content: (
                        <>
                            Tokens carregados! Mapeei espaçamento, cores e tipografia para a escala nativa do Tailwind<br />
                            seguindo a skill <strong className="font-semibold">Figma Pixel Perfect</strong> e o padrão de layout do projeto.<br />
                            Gerando o componente...
                        </>
                    ),
                },
                {
                    type: 'code',
                    content: `// PropertyCard.tsx — gerado via Figma MCP + skill
export function PropertyCard({ imovel }: PropertyCardProps) {
  return (
    <article className="rounded-xl border border-neutral-200 p-4 flex flex-col gap-3">
      {/* Figma: gap 12px -> gap-3 (nativo) */}
      <h3 className="text-base font-semibold text-neutral-900">
        {/* Figma: 16px / 600 -> text-base font-semibold */}
        {imovel.titulo}
      </h3>
      <span className="font-bold text-primary-color">
        {/* Figma: #00B074 -> primary-color */}
        {imovel.preco}
      </span>
    </article>
  )
}`,
                },
            ]}
        />
    );
}
