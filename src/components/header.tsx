
interface HeaderProps {
  server: number;
}
export default function header({ server }: HeaderProps) {

    return (
        <header className=" mb-6 pb-2">
            <h1 className="text-3xl font-bold tracking-tighter text-center">
                ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM<br />copyright 2075-2077 robco industries <br /> -Server {server}-
            </h1>
        </header>
    )
}
