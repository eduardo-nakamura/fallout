import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { SUPPORTED_LANGUAGES, type Language, type Dictionary } from '../i18n'
import pt from '../i18n/pt'
import en from '../i18n/en'

// NOVO INÍCIO: LanguageContext — provider e hook
const DICTIONARIES: Record<Language, Dictionary> = { pt, en }

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

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

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
// NOVO FIM: LanguageContext — provider e hook