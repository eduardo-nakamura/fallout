import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
    text: string;           // O texto completo a ser digitado
    delay?: number;         // Atraso entre cada letra (em ms)
    initialDelay?: number;  // Atraso inicial antes de começar a digitar
    onComplete?: () => void; // Função a ser chamada quando o texto terminar
    className?: string;     // Classes Tailwind adicionais
}

export function TypewriterText({
    text,
    delay = 50,
    initialDelay = 0,
    onComplete,
    className
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Atraso inicial antes de começar a digitar
        const initialTimer = setTimeout(() => {
            if (currentIndex < text.length) {
                const typeTimer = setTimeout(() => {
                    setDisplayedText(text.substring(0, currentIndex + 1));
                    setCurrentIndex(prevIndex => prevIndex + 1);
                }, delay);
                return () => clearTimeout(typeTimer); // Limpa o timer ao desmontar
            } else {
                // Quando o texto termina, chama a função onComplete
                if (onComplete) {
                    onComplete();
                }
            }
        }, initialDelay);

        return () => clearTimeout(initialTimer); // Limpa o timer inicial
    }, [currentIndex, text, delay, initialDelay, onComplete]);

    return (
        <span className={`typewriter ${className}`}>
            {displayedText}
            {/* Opcional: Adicionar um cursor piscante no final */}
            {currentIndex < text.length && <span className="blinking-cursor">_</span>}
        </span>
    );
}