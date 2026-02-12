import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout' // 1. Importe o Layout

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Options = lazy(() => import('./pages/Options'))

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <p className="text-blue-500 font-bold animate-pulse">Carregando...</p>
  </div>
)

function App() {
  const [server, setServer] = useState(() => Math.floor(Math.random() * 10) + 1);
  // const [prompt, setPrompt] = useState('_');

  // const serverNum = () => {
  //   const newValue = Math.floor(Math.random() * 10) + 1;
  //   setServer(newValue);
  // };

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* 2. Defina a rota pai que usa o Layout */}
          <Route path="/" element={<Layout server={server} />}>

            {/* 3. As rotas filhas substituem o <Outlet /> no Layout */}
            <Route index element={<Home />} />

            <Route path="about" element={<About />} />
            <Route path="options" element={<Options />} />

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>


  )
}

export default App
