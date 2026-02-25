import { Component } from 'react'
import { Button } from '../components/button'
import { TypewriterText } from '../components/TypewriterText'
import authorIMG from '../assets/images/naka2.jpg'
export default class About extends Component {
  render () {
    const handleWelcomeComplete = () => {
      console.log('Mensagem de boas-vindas completa!')
      // Aqui você pode, por exemplo, exibir um botão "START"
    }

    return (
      <div>
        <h2 className='text-2xl'>About</h2>
        <p className='text-xl mt-2'>
          <TypewriterText
            text='Welcome, Overseer. Your Vault-Tec systems are online.'
            delay={7} // 70ms entre cada letra
            initialDelay={10} // Meio segundo antes de começar
            onComplete={handleWelcomeComplete}
            className='block mb-4' // Tailwind classes
          />
          {/* <img src={authorIMG} alt='Eduardo Issamu Nakamura' width={180} /> */}
          <div className='relative w-32 h-32 overflow-hidden border border-fallout bg-black'>
            {/* A Imagem original em tons de cinza para melhor efeito */}
            <img
              src={authorIMG}
              alt='Author'
              className='w-full h-full object-cover grayscale'
            />

            {/* O Overlay de cor */}
            <div className='absolute inset-0 bg-fallout mix-blend-multiply opacity-100 pointer-events-none'></div>

            {/* Opcional: Efeito de Scanlines (linhas de TV antiga) */}
            <div className='absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,2px_100%] pointer-events-none'></div>
          </div>
          {/*  */}
        </p>
        <Button to='/'>Back</Button>
      </div>
    )
  }
}
