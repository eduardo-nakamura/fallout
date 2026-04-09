
import { Button } from '../components/button'
import { useLanguage } from '../contexts/useLanguage'

export default function Home () {
  const { t } = useLanguage()

  return (
    <div className='flex flex-col gap-2'>
      <Button to='/terminal'>{t.terminal.title}</Button>
      <Button to='/reign'>{t.reign.title}</Button>
      <Button to='/about'>{t.about.title}</Button>
      <Button to='/options'>{t.options.title}</Button>
    </div>
  )
}
