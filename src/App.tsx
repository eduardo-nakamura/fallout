import { useEffect, useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Terminal = lazy(() => import('./pages/Terminal'))

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <p className="text-blue-500 font-bold animate-pulse">Carregando...</p>
  </div>
)

function App() {
  const [server, setServer] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [prompt, setPrompt] = useState('_');

  const serverNum = () => {
    const newValue = Math.floor(Math.random() * 10) + 1;
    setServer(newValue);
  };

  return (
    <BrowserRouter>
      {/* O Suspense precisa envolver as Rotas */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Terminal />} />
          {/* <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
    // <div className="min-h-screen p-8 relative">

    //   <div className="scanlines"></div>

    //   <header className=" mb-6 pb-2">
    //     <h1 className="text-3xl font-bold tracking-tighter text-center">
    //       ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM<br />copyright 2075-2077 robco industries <br /> -Server {server}-
    //     </h1>
    //   </header>

    //   <main>
    //     <h2 className="border-b-2 pb-2 mb-4">Terminal Name</h2>

    //     <p>{`> ${prompt}`}</p>
    //   </main>
    // </div>
  )
}

export default App
