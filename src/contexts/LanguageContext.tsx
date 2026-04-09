import { useState, type ReactNode } from 'react'
import { SUPPORTED_LANGUAGES, type Language, type Dictionary } from '../i18n'
import pt from '../i18n/pt'
import en from '../i18n/en'
// Importamos o objeto do contexto do arquivo de tipos
import { LanguageContext } from './LanguageContext.types'

const DICTIONARIES: Record<Language, Dictionary> = { pt, en }

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('terminal-language')
    return SUPPORTED_LANGUAGES.includes(saved as Language) ? (saved as Language) : 'pt'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('terminal-language', lang)
  }

  const t = DICTIONARIES[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}