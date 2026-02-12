interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';    
}

export function Button({
    variant = 'default',
    size = 'md',
    className,
    children,
    ...props
}: ButtonProps) {

    // Base de estilos que todos os botões compartilham
    const baseStyles = "uppercase font-terminal transition-all active:scale-95 disabled:opacity-50 cursor-pointer";

    // Variações de cores (usando suas cores do @theme)
    const variants = {
        default: "border-2 border-fallout text-fallout hover:bg-fallout hover:text-terminal-bg shadow-[0_0_10px_rgba(24,244,23,0.3)]",
        danger: "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white shadow-[0_0_10px_rgba(220,38,38,0.3)]",
        ghost: "text-fallout/60 hover:text-fallout border-none bg-transparent"
    };

    // Variações de tamanho
    const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-6 py-2 text-base",
        lg: "px-10 py-4 text-xl font-bold"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {/* O prefixo [ ] dá o toque de terminal clássico */}
            {variant !== 'ghost' ? `[ ${children} ]` : children}
        </button>
    );
}