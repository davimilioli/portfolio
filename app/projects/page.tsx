import type { Metadata } from 'next';
import ProjectsPageContent from './components/ProjectsPageContent';

export const metadata: Metadata = {
  title: 'Projetos - Davi Milioli',
  description: 'Portfólio de projetos web, mobile e sistemas desenvolvidos por mim.',
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
