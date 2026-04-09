import { useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext.types'
import Header from './header'
import Footer from './footer'

// 1. Sorteamos apenas o ÍNDICE fora do componente (roda uma vez no load)
// Usamos um número fixo baseado no tamanho da sua lista (ex: 5 nomes)
const RANDOM_INDEX = Math.floor(Math.random() * 5);

export default function Layout({ server }: { server: number }) {
  const { t } = useLanguage();

  // 2. Pegamos o nome traduzido usando o índice estável
  // O useMemo garante que, se o idioma mudar, ele pegue o nome certo na nova língua
  const protagonistName = useMemo(() => {
    const names = t.layout.protagonistNames;
    // Fallback caso a lista mude de tamanho entre idiomas
    return names[RANDOM_INDEX] || names[0];
  }, [t.layout.protagonistNames]);

  return (
    <div className='min-h-screen p-8 relative'>
      <div className='scanlines'></div>
      <Header server={server} />
      <main>
        <h2 className='border-b-2 pb-2 mb-4 text-xl uppercase'>
          {t.layout.welcome}, {protagonistName}
        </h2>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}