// src/hooks/useLanguage.ts (ou na mesma pasta do Context)
import { useContext } from 'react'
import { LanguageContext } from './LanguageContext.types'

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage deve ser usado dentro de um LanguageProvider')
  }
  return ctx
}