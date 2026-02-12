import { Outlet } from 'react-router-dom'
import Header from './header'
// import Footer from './footer'

interface LayoutProps {
  server: number;
}
export default function layout({ server }: LayoutProps) {

    return (
        <div className="min-h-screen p-8 relative">

            <div className="scanlines"></div>
            <Header server={server} />


            <main>
                <h2 className="border-b-2 pb-2 mb-4">Terminal Name</h2>
                <Outlet />
                <p>{`>`} &#9632;</p>
            </main>
        </div>
    )
}
