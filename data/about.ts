import { LuBriefcase, LuCodeXml, LuLink } from "react-icons/lu";
import type { AboutInfo } from "../types/About";
import { SlSocialLinkedin } from "react-icons/sl";
import { SiGithub, SiInstagram } from "react-icons/si";

export const aboutInfo: AboutInfo = {
  personalData: {
    role: "Desenvolvedor Web",
    email: "davimilioli2108@gmail.com",
    whatsapp: "(21) 99213-3618",
    bio: "Sou um desenvolvedor web dedicado a transformar ideias em soluções digitais por meio de habilidades técnicas e criatividade. Estou sempre em busca de novos desafios e oportunidades para evoluir profissionalmente e aprimorar meus conhecimentos.",
    socials: [
      { icon: SlSocialLinkedin, name: 'Linkedin', link: 'https://www.linkedin.com/in/davimilioli/' },
      { icon: SiGithub, name: 'Github', link: 'https://github.com/davimilioli' },
      { icon: SiInstagram, name: 'Instagram', link: 'https://www.instagram.com/davimilioli_' }
    ],
  },
  experiences: [
    {
      id: 1,
      period: "2022 — Atualmente",
      title: "Desenvolvedor Web",
      company: "Inforce Tecnologia",
      description: [
        "Desenvolvimento e manutenção de sites e aplicações web utilizando HTML, CSS, SASS, JavaScript, TypeScript, jQuery, PHP, React, Next.js e Node.js.",
        "Atuação na construção de mais de 80 projetos de sites ao longo de 4 anos, applying boas práticas de templating, organização e reutilização de código.",
        "Criação e manutenção de componentes reutilizáveis, contribuindo para a padronização e escalabilidade dos projetos.",
        "Utilização de ferramentas de IA e MCP no processo de desenvolvimento, incluindo criação de skills para automação e padronização de projetos.",
        "Integração entre Front-End e Back-End em projetos PHP, garantindo comunicação eficiente entre as camadas da aplicação.",
        "Otimização de performance e aplicação de boas práticas de SEO, visando melhor desempenho e maior visibilidade nos mecanismos de busca.",
        "Criação e adaptação de layouts no Figma, colaborando com a definição visual e experiência do usuário.",
        "Apoio ao time na avaliação e adoção de novas ferramentas e tecnologias, com foco em melhoria de produtividade e qualidade das entregas."
      ]
    }
  ],

  education: [
    {
      id: 1,
      period: "2022 — 2024",
      title: "Análise e Desenvolvimento de Sistemas",
      company: "UNISUAM - Centro Universiário Augusto Motta",
      description: [
        "Estrutura de Sistemas",
        "Dados",
        "Programação",
        "Probabilidade",
        "Estatística",
        "Sistemas Operacionais",
        "Desenvolvimento de Software para Internet (Front-end)",
        "Infraestrutura e Arquiteturas para Suporte as Aplicações",
        "Gerência de Projetos de Software",
        "Desenvolvimento de Software para Internet (Back-end)",
        "Desenvolvimento de Aplicativos Mobile"
      ]
    }
  ],

  expertise: [
    {
      id: 1,
      icon: LuCodeXml,
      title: "Desenvolvimento Web",
      description: "Experiência no desenvolvimento e manutenção de sites e aplicações web utilizando HTML, CSS, JavaScript, TypeScript e PHP, aplicando boas práticas de organização e performance."
    },
    {
      id: 2,
      icon: LuBriefcase,
      title: "Experiência em Projetos",
      description: "Atuação na construção de mais de 80 projetos de sites ao longo de 4 anos, aplicando boas práticas de templating, organização e reutilização de código."
    },
    {
      id: 3,
      icon: LuLink,
      title: "Integração e Performance",
      description: "Experiência na integração entre Front-End e Back-End, além de otimização de performance e aplicação de boas práticas de SEO para melhorar a visibilidade."
    }
  ]
};
