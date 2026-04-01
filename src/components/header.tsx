import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { SUPPORTED_LANGUAGES, type Language } from '../i18n'
import ThemeSelector from './ThemeSelector'
import { GearIcon } from '@phosphor-icons/react'

interface HeaderProps {
  server: number
}

// NOVO INÍCIO: mapa de rótulos de idioma
const LANGUAGE_LABELS: Record<Language, string> = {
  pt: 'Português',
  en: 'English',
}
// NOVO FIM: mapa de rótulos de idioma

export default function Header({ server }: HeaderProps) {
  const { t, language, setLanguage } = useLanguage()

  // NOVO INÍCIO: estado do popover de configurações
  const [open, setOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])
  // NOVO FIM: estado do popover de configurações

  return (
    <header className="mb-6 pb-2 relative">
      <div className="flex items-start justify-between gap-2">

        {/* ALTERADO INÍCIO: título usa t.header */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tighter text-center flex-1">
          ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM<br />
          {t.header.copyright}<br />
          -{t.header.server} {server}-
        </h1>
        {/* ALTERADO FIM: título usa t.header */}

        {/* NOVO INÍCIO: botão de configurações */}
        <div ref={popoverRef} className="relative shrink-0">
          <button
            onClick={() => setOpen(v => !v)}
            aria-label={t.header.settingsLabel}
            className="p-1 text-fallout/50 hover:text-fallout transition-colors mt-1"
          >
            {/* Ícone engrenagem SVG inline */}
            <GearIcon size={32} />
          </button>

          {open && (
            <div className="absolute right-0 top-8 z-50 w-64 sm:w-72 border border-fallout/40 bg-terminal-bg p-4 flex flex-col gap-4 shadow-lg">

              {/* Seletor de idioma */}
              <div className="flex flex-col gap-2">
                <p className="text-fallout/60 text-xs uppercase tracking-widest">
                  {t.options.language}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-1 border text-sm font-terminal transition-all ${
                        language === lang
                          ? 'border-fallout text-fallout'
                          : 'border-fallout/30 text-fallout/50 hover:border-fallout/60 hover:text-fallout/80'
                      }`}
                    >
                      {LANGUAGE_LABELS[lang]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seletor de tema */}
              <div className="flex flex-col gap-2">
                <p className="text-fallout/60 text-xs uppercase tracking-widest">
                  Theme
                </p>
                <ThemeSelector />
              </div>

            </div>
          )}
        </div>
        {/* NOVO FIM: botão de configurações */}

      </div>
    </header>
  )
}