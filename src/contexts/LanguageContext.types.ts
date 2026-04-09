import { createContext, useContext } from 'react'
import { type Language, type Dictionary } from '../i18n'

export interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: Dictionary
}

// O Contexto agora vive aqui
export const LanguageContext = createContext<LanguageContextValue | null>(null)

// O Hook agora vive aqui
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}