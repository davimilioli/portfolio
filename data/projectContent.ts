import type { MDXContent } from 'mdx/types';
import UnycallContent from '@/conteudos/unycall.mdx';
import UtilizeJaContent from '@/conteudos/utilizeja.mdx';
import ListaDeTarefasContent from '@/conteudos/lista-de-tarefas.mdx';
import WalletContent from '@/conteudos/wallet.mdx';
import MistContent from '@/conteudos/mist-previsao-do-tempo.mdx';
import PauloMartinsContent from '@/conteudos/paulo-martins-consultoria.mdx';
import FrameworkContent from '@/conteudos/framework-multi-temas-white-label.mdx';

export const projectContent: Record<number, MDXContent> = {
    1: UnycallContent,
    2: UtilizeJaContent,
    3: ListaDeTarefasContent,
    4: WalletContent,
    5: MistContent,
    6: PauloMartinsContent,
    7: FrameworkContent,
};
