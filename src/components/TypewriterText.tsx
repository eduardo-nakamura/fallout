import { useState, useEffect, useRef, useCallback } from 'react';

interface TypewriterTextProps {
    text: string;
    delay?: number;
    initialDelay?: number;
    onComplete?: () => void;
    className?: string;
    cursor?: boolean;
    soundEnabled?: boolean; // Opção para ligar/desligar o som
}

export function TypewriterText({
    text,
    delay = 50,
    initialDelay = 0,
    onComplete,
    className,
    cursor = true,
    soundEnabled = true
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false); // Estado para controlar o fim

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playKeySound = useCallback(() => {
        if (!soundEnabled || !audioRef.current || isFinished) return;

        const sound = audioRef.current;
        sound.currentTime = 0;
        sound.volume = 0.005;
        sound.play().catch(() => { });
    }, [soundEnabled, isFinished]);

    useEffect(() => {
        if (soundEnabled) {
            audioRef.current = new Audio('./sounds/ui_hacking_charscroll.wav');
        }
    }, [soundEnabled]);

    // Função para pular a animação
    const skipAnimation = () => {
        if (!isFinished) {
            setDisplayedText(text);
            setCurrentIndex(text.length);
            setIsFinished(true);
            if (onComplete) onComplete();
        }
    };

    
    useEffect(() => {
        // Se já terminou (pelo clique), não faz nada

        if (isFinished) return;

        if (currentIndex === 0) {
            const startTimer = setTimeout(() => {
                setCurrentIndex(1);
            }, initialDelay);
            return () => clearTimeout(startTimer);
        }

        if (currentIndex <= text.length) {
            const typeTimer = setTimeout(() => {
                setDisplayedText(text.substring(0, currentIndex));
                playKeySound();

                if (currentIndex < text.length) {
                    setCurrentIndex(prev => prev + 1);
                } else {
                    setIsFinished(true);
                    if (onComplete) onComplete();
                }
            }, delay);

            return () => clearTimeout(typeTimer);
        }
    }, [currentIndex, text, delay, initialDelay, onComplete, playKeySound, isFinished]);
    
    const isMounted = useRef(true);
    useEffect(() => {
        return () => { isMounted.current = false; };
    }, []);

    return (
        <span
            className={`font-terminal cursor-pointer select-none ${className}`}
            onClick={skipAnimation}
            title="Click to skip"
        >
            {displayedText}
            {!isFinished && <span className="blinking-cursor">{cursor ? '_' : ''}</span>}
        </span>
    );
}