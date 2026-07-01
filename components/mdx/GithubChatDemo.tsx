import ChatDemo from './ChatDemo';

export default function GithubChatDemo() {
    return (
        <ChatDemo
            label={
                <span className="flex items-center gap-1.5">
                    <span>MCP</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                    <span>GitHub</span>
                </span>
            }
            userMessage={
                <>
                    Acesse o repositório legado, abra o arquivo <code className="font-mono text-indigo-100">regras.ts</code><br />
                    dentro de <code className="font-mono text-indigo-100">src/regras-de-negocio/</code><br />
                    e mapeie a regra de negócio principal.
                </>
            }
            steps={[
                {
                    type: 'processing',
                    content: 'github_mcp.get_file_contents("src/regras-de-negocio/regras.ts")...',
                },
                {
                    type: 'message',
                    content: (
                        <>
                            Encontrei 2 dependências via <code className="font-mono text-neutral-800 bg-neutral-200 rounded px-1">import</code>:<br />
                            <strong className="font-semibold">calcularImposto.ts</strong> e <strong className="font-semibold">validarUsuario.ts</strong>.<br />
                            Buscando o conteúdo completo desses arquivos no repositório...
                        </>
                    ),
                },
                {
                    type: 'processing',
                    content: 'github_mcp.get_file_contents("src/regras-de-negocio/{calcularImposto,validarUsuario}.ts")...',
                },
                {
                    type: 'code',
                    content: `# regra-calculo-imposto.md — gerado via GitHub MCP

## Entrada
- valor: number
- tipoCliente: 'pf' | 'pj'

## Regra de negócio
1. Valida o usuário (validarUsuario.ts)
2. Calcula a alíquota com base no tipoCliente
3. Aplica o imposto sobre o valor (calcularImposto.ts)

## Saída
- valorFinal: number`,
                },
            ]}
        />
    );
}
