import { useState, useEffect } from 'react'

export default function ThemeSelector () {
  const themes = [
    { name: 'green', color: '#18f417' },
    { name: 'white', color: '#e0f9f8' },
    { name: 'amber', color: '#f9ae56' },
    { name: 'blue', color: '#38c5eb' }
  ]

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem('terminal-theme') || 'green'
  )

  useEffect(() => {
    // Aplica o tema no elemento <html> ou <body>
    document.documentElement.setAttribute('data-theme', currentTheme)
    localStorage.setItem('terminal-theme', currentTheme)
  }, [currentTheme])

  return (
    <div className='flex gap-4 p-4 border border-fallout/30 bg-terminal-bg'>
      {themes.map(t => (
        <button
          key={t.name}
          onClick={() => setCurrentTheme(t.name)}
          className={`w-8 h-8 border-2 transition-all ${
            currentTheme === t.name
              ? 'border-fallout scale-110'
              : 'border-transparent'
          }`}
          style={{ backgroundColor: t.color }}
          title={`Terminal ${t.name}`}
        />
      ))}
    </div>
  )
}
