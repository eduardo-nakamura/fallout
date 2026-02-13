import React, { useState, useEffect, useRef, useCallback } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  initialDelay?: number;
  onComplete?: () => void;
  className?: string;
  soundEnabled?: boolean; // Opção para ligar/desligar o som
}

export function TypewriterText({
    text,
    delay = 50,
    initialDelay = 0,
    onComplete,
    className,
    soundEnabled = true
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // 1. Estabilizamos o playKeySound com useCallback
    const playKeySound = useCallback(() => {
        if (!soundEnabled || !audioRef.current) return;

        const soundClone = audioRef.current.cloneNode() as HTMLAudioElement;
        soundClone.volume = 0.01;
        soundClone.play().catch(() => { });
        soundClone.onended = () => soundClone.remove();
    }, [soundEnabled]);

    // Inicializa o áudio uma única vez
    useEffect(() => {
        if (soundEnabled) {
            audioRef.current = new Audio('/sounds/ui_hacking_charscroll.wav');
        }
    }, [soundEnabled]);

    useEffect(() => {
        // Lógica de Delay Inicial
        if (currentIndex === 0) {
            const startTimer = setTimeout(() => {
                setCurrentIndex(1);
            }, initialDelay);
            return () => clearTimeout(startTimer);
        }

        // Lógica de Digitação
        if (currentIndex <= text.length) {
            const typeTimer = setTimeout(() => {
                setDisplayedText(text.substring(0, currentIndex));
                playKeySound(); // Agora é uma dependência segura

                if (currentIndex < text.length) {
                    setCurrentIndex(prev => prev + 1);
                } else if (onComplete) {
                    onComplete(); // Agora é uma dependência segura
                }
            }, delay);

            return () => clearTimeout(typeTimer);
        }
    // 2. Adicionamos as dependências que o ESLint exigiu
    }, [currentIndex, text, delay, initialDelay, onComplete, playKeySound]);

    return (
        <span className={`font-terminal ${className}`}>
            {displayedText}
            <span className="blinking-cursor">_</span>
        </span>
    );
}