import React, { useState, useEffect, useRef } from 'react';

interface TerminalInputProps {
  prefix?: string; // Ex: "> " ou "C:\>"
  onCommand: (command: string) => void;
  onChange?: (value: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export function TerminalInput({
  prefix = "> ",
  onCommand,
  onChange,
  className,
  autoFocus = true
}: TerminalInputProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Garante que o input esteja sempre focado, como um terminal real
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onCommand(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex items-center ${className}`}>
      <span className="font-terminal mr-2">{prefix}</span>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (onChange) onChange(e.target.value); // Dispara o filtro em tempo real
          }}
          className="absolute inset-0 opacity-0 cursor-default" // Esconde o input real
          autoComplete="off"
          spellCheck="false"
        />
        {/* Renderização visual do texto + cursor simulado */}
        <div className="font-terminal break-all flex items-center border-fallout">
          {inputValue}
          <span className="blink-effect bg-green-500 w-2 h-5 ml-1 inline-block" />
        </div>
      </div>
    </form>
  );
}