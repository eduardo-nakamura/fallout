import { useNavigate } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    to?: string;
}

export function Button({
    variant = 'default',
    size = 'lg',
    className,
    children,
    to,
    onClick,
    ...props
}: ButtonProps) {
    const navigate = useNavigate();

    const playSound = (src: string) => {
        const audio = new Audio(src);
        audio.volume = 0.15; // Volume sutil para não ser irritante
        audio.play().catch(() => { }); // Catch vazio para evitar erros de permissão do navegador
    };
    const handleMouseEnter = () => {
        playSound('/sounds/ui_menu_focus.wav'); // Certifique-se de ter este arquivo em public/sounds/
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        playSound('/sounds/ui_hacking_charenter_01.wav'); // Certifique-se de ter este arquivo em public/sounds/

        // Executa a função onClick original se ela existir
        if (onClick) onClick(e);

        // Se houver uma rota 'to', navega após um micro-atraso para o som iniciar
        if (to) {
            setTimeout(() => navigate(to), 50);
        }
    };
    // Base de estilos que todos os botões compartilham
    const baseStyles = "uppercase font-terminal transition-all active:scale-95 disabled:opacity-50 cursor-pointer";

    // Variações de cores (usando suas cores do @theme)
    const variants = {
        default: "text-left border-0 border-fallout text-fallout hover:bg-fallout hover:text-terminal-bg hover:shadow-[0_0_10px_rgba(24,244,23,0.3)]",
        danger: "text-left border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white shadow-[0_0_10px_rgba(220,38,38,0.3)]",
        ghost: "text-left text-fallout/60 hover:text-fallout border-none bg-transparent"
    };

    // Variações de tamanho
    const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-6 py-2 text-base",
        lg: "px-2 py-4 text-xl font-bold"
    };

    return (
        <button
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {/* O prefixo [ ] dá o toque de terminal clássico */}
            {variant !== 'ghost' ? `>  ${children}` : children}
        </button>
    );
}