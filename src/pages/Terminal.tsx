import { useState, useEffect } from 'react'

import { Button } from '../components/button'
import { TypewriterText } from '../components/TypewriterText'
// import terminal3 from '../data/fo3.json'
import terminal3 from '../data/fo3entries.json'
import terminal4 from '../data/fo4entries.json'
import terminalNV from '../data/fonventries.json'
import terminal76 from '../data/fo76entries.json'
import { TerminalInput } from '../components/TerminalInput'

export default function Terminal () {
  const [currentView, setCurrentView] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [displayTitle, setDisplayTitle] = useState<string>('')
  const [selectedTerminal, setSelectedTerminal] = useState<string>('')
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const filteredList = currentView.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectTerminal = (game: string[]) => {
    setCurrentView(game)
    setIsSelected(true)
    setDisplayTitle('')
    setContent('')
  }

  const handleEntryClick = (entry: string) => {
    const urlTitle = encodeURIComponent(entry.replaceAll(' ', '_'))
    setSelectedTerminal(urlTitle)
    setDisplayTitle(entry)
    setContent('')
    setLoading(true)
   window.scrollTo(0, 0);
  }

  const handleBack = () => {
    setIsSelected(false)
    setDisplayTitle('')
  }

  useEffect(() => {
    if (!selectedTerminal) return // Don't fetch if nothing is selected

    const fetchTerminal = async () => {
      const cachedData = localStorage.getItem(`terminal-${selectedTerminal}`)
      if (cachedData) {
        console.log('Loading from Vault-Tec Cache...')
        setContent(cachedData) // No need to JSON.parse if it's just a string
        setLoading(false)
        return
      }

      setLoading(true) // Reset loading state for new fetch
      setError('')
      try {
        const url = `https://fallout.fandom.com/api.php?action=parse&page=${encodeURIComponent(
          selectedTerminal.replaceAll(' ', '_')
        )}&prop=wikitext&format=json&origin=*`
        const response = await fetch(url)
        const data = await response.json()

        if (data.parse && data.parse.wikitext) {
          console.log('Saving to Vault-Tec Cache...')
          const cleanContent = data.parse.wikitext['*']
            .split('[[Category:Fallout 3 terminal entries')[0]
            .replace(/{{Transcript\|text=/g, '')
            .replace(/{{Small\|[\s\S]*?}}/g, '')
            .replace(/<nowiki>(.*?)<\/nowiki>/g, '$1')
            .replace(/'''/g, '')
            .replace(/''/g, '')
            .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
            .replace(/''}}/g, '')
            .replace(/}}/g, '')
            .trim()
            .replace(/"/g, '\\"')
          localStorage.setItem(`terminal-${selectedTerminal}`, cleanContent)

          setContent(cleanContent)
        } else {
          setError('DATA CORRUPTED: TERMINAL NOT FOUND')
        }
      } catch (err) {
        console.log(err)
        setError('CONNECTION ERROR: LINK TO MAINframe LOST')
      } finally {
        setLoading(false)
      }
    }

    fetchTerminal()
  }, [selectedTerminal])

  return (
  <main className='grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto'>
    
    {/* 1. SELEÇÃO DE JOGO (Overlay ou Full Width) */}
    {!isSelected && (
      <section className='flex flex-col gap-2 col-span-2'>
        <h2 className="text-fallout text-center mb-4 italic">SYSTEM READY. SELECT DATABASE:</h2>
        <Button onClick={() => selectTerminal(terminal3)}>Fallout 3</Button>
        <Button onClick={() => selectTerminal(terminalNV)}>New Vegas</Button>
        <Button onClick={() => selectTerminal(terminal4)}>Fallout 4</Button>
        <Button onClick={() => selectTerminal(terminal76)}>Fallout 76</Button>
        <Button to='/' >BACK</Button>
      </section>
    )}

    {isSelected && (
      <>
        {/* 2. COLUNA DA ESQUERDA: LISTA DE TERMINAIS */}
        {/* Mobile: Esconde se houver um título selecionado | Desktop: Sempre visível */}
        <section className={`flex flex-col ${displayTitle ? 'hidden md:flex' : 'flex'} overflow-y-scroll h-[70vh]`}>
          <TerminalInput
            prefix='FILTER > '
            className='border p-2'
            onCommand={(cmd) => console.log(cmd)}
            onChange={val => setSearchTerm(val)}
          />
          
          <div className="flex flex-col flex-1  pr-2 custom-scrollbar">
            {filteredList.map((item, index) => (
              <Button
                variant={displayTitle === item ? 'default' : 'ghost'}
                className="justify-start text-left"
                key={index}
                onClick={() => handleEntryClick(item)}
              >
                {item}
              </Button>
            ))}
          </div>

          <Button onClick={handleBack} className='mt-4'>[ List of Games ]</Button>
        </section>

        {/* 3. COLUNA DA DIREITA: CONTEÚDO */}
        
        <section className={`flex flex-col ${!displayTitle ? 'hidden md:flex' : 'flex'} overflow-y-scroll h-[70vh]`}>
          
          
          {displayTitle && (
            <Button 
              onClick={() => setDisplayTitle('')} 
              className="md:hidden mb-4 self-start"
              variant="ghost"
            >
              ← BACK TO LIST
            </Button>
          )}

          <div className="flex-1 border-l-0 md:border-l border-fallout/20 md:pl-8">
            {loading ? (
              <div className="animate-pulse text-fallout">DECRYPTING DATA...</div>
            ) : error ? (
              <div className="text-red-500 border border-red-500 p-4 font-bold">{error}</div>
            ) : displayTitle ? (
              <article className="flex flex-col gap-4">
                <h3 className='text-2xl border-b border-fallout pb-2 uppercase text-fallout shadow-fallout'>
                  {/* <TypewriterText key={displayTitle} text={displayTitle} /> */}
                  {displayTitle}
                </h3>
                <div className='text-lg md:text-xl whitespace-pre-wrap leading-relaxed'>
                  <TypewriterText key={content} text={content} delay={15} />
                </div>
              </article>
            ) : (
              <div className="hidden md:flex items-center justify-center h-full border-2 border-dashed border-fallout/10 text-fallout/30 italic">
                NO TERMINAL SELECTED
              </div>
            )}
          </div>
        </section>
      </>
    )}
  </main>
)
}
