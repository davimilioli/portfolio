import type { Project, CategoryProject } from "@/types/Project";

export const categoryConfig: Record<string, { label: string; className: string }> = {
    website: { label: 'Website', className: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
    'app-web': { label: 'Aplicação Web', className: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20' },
    'app-mobile': { label: 'App Mobile', className: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
};

export function getCategoryLabel(category: string) {
    return categoryConfig[category]?.label ?? category;
}

export function getCategoryClass(category: string) {
    return categoryConfig[category]?.className ?? 'text-neutral-400 bg-neutral-400/10 border-neutral-400/20';
}

const projectsData: Project[] = [
    {
        id: 1,
        name: 'UnyCall',
        description: 'A Unycall foi um projeto desenvolvido durante o período de estudos em Back-End, com o objetivo de simular uma empresa do setor de telecomunicações. O sistema foi projetado para oferecer uma ampla gama de serviços de comunicação, garantindo conectividade eficiente para indivíduos e empresas. Durante o desenvolvimento, utilizei APIs de CEP para cadastro de usuário.',
        github: 'https://github.com/davimilioli/unycall',
        category: 'app-web',
        features: [
            'Adicionar novo usuário',
            'Excluir usuário',
            'Editar usuário',
            'Autenticação de usuário',
            'Autenticação 2FA',
            'Sistema de assinatura mensal',
            'Sistema de pagamento fictício',
        ],
        technologies: ['PHP', 'JavaScript', 'MySQL'],
    },
    {
        id: 2,
        name: 'UtilizeJá',
        img: [
            '/projetcs/utilizeja/login.png',
            '/projetcs/utilizeja/tela-inicial.png',
            '/projetcs/utilizeja/bloco-notas.png',
            '/projetcs/utilizeja/bloco-notas-form.png',
            '/projetcs/utilizeja/lista-afazeres.png',
            '/projetcs/utilizeja/lista-afazeres-form.png',
            '/projetcs/utilizeja/consulta-cep.png',
            '/projetcs/utilizeja/consulta-cep-preenchido.png',
            '/projetcs/utilizeja/conversor-pdf.png',
            '/projetcs/utilizeja/conversor-pdf-anexo.png',
            '/projetcs/utilizeja/favoritos.png',
            '/projetcs/utilizeja/perfil.png',
        ],
        description: 'O Utilize Já é um app utilitário criado para simplificar tarefas cotidianas. Desenvolvido como projeto de estudo em desenvolvimento mobile, o aplicativo conta com autenticação com Firebase, sistema de bloco de notas e uma ferramenta integrada para conversão de imagens em PDF.',
        github: 'https://github.com/davimilioli/UtilizeJa',
        category: 'app-mobile',
        features: [
            'Autenticação com Firebase',
            'Conversor de imagem para PDF',
            'Consulta de CEP',
            'Conversor de Unidades (medidas de peso, volume, distancia, etc.)',
            'Bloco de Notas',
            'Lista de Tarefas',
        ],
        technologies: ['TypeScript', 'Angular', 'Sass'],
    },
    {
        id: 3,
        name: 'Lista de Tarefas',
        description: 'Projeto Full Stack desenvolvido como estudo de caso, utilizando Angular no front-end e Node.js com Express no back-end. Embora o desenvolvimento de novas features tenha sido encerrado para priorizar o aprofundamento em outras frentes da stack, a aplicação permanece totalmente funcional, servindo como demonstração prática de manipulação de estados e reatividade no framework.',
        github: 'https://github.com/davimilioli/to-do-list',
        category: 'app-web',
        features: [
            'Criar novas tarefas',
            'Editar tarefas existentes',
            'Exclusão de tarefas',
            'Marcar/desmarcar como concluídas',
            'Filtros: Todos, Ativos e Concluídos',
            'Limpar todas as tarefas concluídas',
            'Feedback via notificações',
        ],
        technologies: ['TypeScript', 'Angular', 'Sass', 'NodeJs'],
    },
    {
        id: 4,
        name: 'Wallet',
        img: ['/projetcs/wallet.gif'],
        description: 'Wallet é um mini projeto de controle financeiro desenvolvido para praticar conceitos modernos de desenvolvimento front-end utilizando React, TypeScript e TailwindCSS.',
        github: 'https://github.com/davimilioli/wallet',
        category: 'website',
        features: [
            'Adicionar nova transação',
            'Editar transação',
            'Excluir transação',
            'Visualizar lista de transações',
            'Ver resumo financeiro',
            'Cálculo automático do saldo',
        ],
        technologies: ['React', 'TypeScript', 'Tailwind'],
    },
    {
        id: 5,
        name: 'Mist - Previsão do Tempo',
        img: ['/projetcs/mist.gif'],
        description: 'Mist é uma aplicação web de previsão do tempo, desenvolvida com Next.js, que permite aos usuários buscar cidades e visualizar as condições meteorológicas atuais, previsões horárias e para os próximos dias.',
        github: 'https://github.com/davimilioli/mist',
        preview: 'https://mist-black.vercel.app/',
        category: 'app-web',
        features: [
            'Busca de Cidades',
            'Clima Atual',
            'Previsão',
            'Dark Mode',
            'Histórico de Cidades',
        ],
        technologies: ['NextJs', 'React', 'Tailwind'],
    },
    {
        id: 6,
        name: 'Paulo & Martins Consultoria',
        img: ['/projetcs/pauloemartins.png'],
        description: 'Site institucional desenvolvido para a Paulo & Martins Consultoria, especializada em assessoria em licitações e contratos públicos. O projeto apresenta as modalidades de atuação e os serviços da empresa com foco em credibilidade e alta performance.',
        preview: 'https://www.pauloemartinsconsultoria.com.br/',
        category: 'website',
        features: [
            'Apresentação de serviços e modalidades de licitação',
            'Seção de perguntas frequentes (FAQ) interativa',
            'Otimização de SEO e performance de carregamento',
            'Estrutura de dados Schema.org (JSON-LD) para melhor ranqueamento',
            'Design responsivo com foco em usabilidade',
        ],
        technologies: ['NextJs', 'React', 'Tailwind', 'TypeScript'],
    },
    {
        id: 7,
        name: 'Framework Multi-Temas White-Label',
        description: 'Migração e reestruturação de uma grande plataforma imobiliária para arquitetura Next.js e TypeScript. A transição foi conduzida com IA usando o MCP do GitHub para compreensão de regras de negócios e movimentação de arquivos, o MCP do Figma (com skills) para criação acelerada de componentes estruturados, e o MCP do Next.js DevTools para otimização e depuração em tempo real.',
        category: 'app-web',
        features: [
            'Desenvolvimento de pacote NPM privado: Arquitetura e manutenção de pacote NPM privado isolando o core de regras de negócios para consumo escalável entre aplicações.',
            'Sistema de temas modular: Arquitetura de sistema de temas modular com suporte a sobrescrita de componentes em tempo de build.',
            'Migração de código com MCP: Mapeamento de regras de negócio legadas e automação de migração de código via MCP integrado ao GitHub.',
            'Design-to-Code acelerado: Criação acelerada de componentes React estruturados utilizando IA com o uso de skills, alimentada por guias de diretrizes e variáveis de design via Figma MCP.',
            'Contextualização de projeto: Mapeamento e estruturação de contexto arquitetural do projeto para guiar e especializar o desenvolvimento assistido por IA.',
            'Depuração avançada: Análise de renderização e depuração de performance utilizando Next.js DevTools MCP.',
        ],
        technologies: ['NextJs', 'React', 'TypeScript', 'Tailwind', 'MCP', 'Figma', 'Antigravity', 'Claude'],
    },
];

export const projects: Project[] = [...projectsData].reverse();

export const categoriesProject: CategoryProject[] = [
    { category: 'all', label: 'Todos' },
    { category: 'website', label: 'Websites' },
    { category: 'app-web', label: 'Aplicações Web' },
    { category: 'app-mobile', label: 'Aplicações Mobile' },
];
