import { useEffect, useState } from 'react'

function App() {
  const [server, setServer] = useState(() => Math.floor(Math.random() * 10) + 1);

  const serverNum = () => {
    const newValue = Math.floor(Math.random() * 10) + 1;
    setServer(newValue);
  };



  return (
    <div className="min-h-screen p-8 relative">
      {/* Efeito visual de monitor antigo */}
      <div className="scanlines"></div>

      <header className="border-b-2 border-fallout mb-6 pb-2">
        <h1 className="text-3xl font-bold tracking-tighter text-center">
          ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM<br />copyright 2075-2077 robco industries <br /> -Server {server}-

        </h1>
      </header>

      <main>
        <p className="mb-4">Welcome, Overseer.</p>
        {/* Aqui entra sua calculadora ou inventário */}
        <p>{`>`}</p>
      </main>
    </div>
  )
}

export default App
