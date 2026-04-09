import { Button } from '../components/button'
import authorIMG from '../assets/images/naka2.jpg'
import { useLanguage } from '../contexts/useLanguage'
import { TypewriterText } from '../components/TypewriterText'

export default function About () {
  const { t } = useLanguage()

  return (
    <div className='flex flex-col'>
      <section className='border-b border-fallout/30 pb-4 pt-4'>
        <h1 className='text-3xl'>{t.about.title}</h1>
        <TypewriterText
          className='text-xl'
          key={t.about.version}
          text={t.about.version}
          delay={15}
        />
        <br />
        <br />
        <TypewriterText
          className='text-xl'
          key={t.about.description}
          text={t.about.description}
          delay={15}
        />
      </section>

      <section className='border-b border-fallout/30 pb-4 pt-4'>
        <section className='flex gap-8 mt-4'>
          <div className='relative w-64 h-64 overflow-hidden border border-fallout bg-black'>
            <img
              src={authorIMG}
              alt='Author'
              className='w-full h-full object-cover grayscale'
            />
            <div className='absolute inset-0 bg-fallout mix-blend-multiply opacity-100 pointer-events-none'></div>
            <div className='absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-size-[100%_2px,2px_100%] pointer-events-none'></div>
          </div>
          <div>
            <h2 className='text-fallout text-2xl'>
              {t.about.sections.dev.label}
            </h2>
            <TypewriterText
              className='text-xl'
              key={t.about.sections.dev.content}
              text={t.about.sections.dev.content}
              delay={15}
            />
            <br />
            <br />
            <h2 className='text-fallout text-2xl'>
              {t.about.sections.tech.label}
            </h2>
            <TypewriterText
              className='text-xl'
              key={'content'}
              text={t.about.sections.tech.content}
              delay={15}
            />
          </div>
        </section>
      </section>

      <section className='bg-fallout/5 p-3 border-l-2 border-fallout/20'>
        <h2 className='text-fallout/80 text-xs'>
          {t.about.sections.legal.label}
        </h2>
        <TypewriterText
        
          key={'legal'}
          text={t.about.sections.legal.content}
          delay={15}
        />
      </section>
      {/* 

  

        <div className='bg-fallout/5 p-3 border-l-2 border-fallout/20'>
          
          <p className='text-fallout/50 text-[10px] leading-tight italic'>
            {t.about.sections.legal.content}
          </p>
        </div>
      </section> */}

      <Button to='/'>Back</Button>
    </div>
  )
}
