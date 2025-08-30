"use client";

import { useState, useEffect, useRef } from 'react';
import { Mic, Move } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function FloatingAssistant() {
  const [position, setPosition] = useState({ x: 30, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Start as not visible
  const assistantRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Set initial position based on window size and make visible, only on client
    if (typeof window !== 'undefined') {
        setPosition({ x: 30, y: window.innerHeight - 130 });
        setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      setPosition({
        x: e.clientX - offsetRef.current.x,
        y: e.clientY - offsetRef.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (assistantRef.current) {
      setIsDragging(true);
      const rect = assistantRef.current.getBoundingClientRect();
      offsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };
  
  // Simulate speaking and listening states
  useEffect(() => {
    let speakTimeout: NodeJS.Timeout;
    const scheduleSpeak = () => {
      speakTimeout = setTimeout(() => {
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 1500); // Speak for 1.5s
        scheduleSpeak();
      }, Math.random() * 5000 + 3000); // every 3-8 seconds
    }
    scheduleSpeak();
    
    let listenTimeout: NodeJS.Timeout;
    const scheduleListen = () => {
        listenTimeout = setTimeout(() => {
        setIsListening(true);
        setTimeout(() => setIsListening(false), 2000); // Listen for 2s
        scheduleListen();
      }, Math.random() * 8000 + 5000); // every 5-13 seconds
    }
    scheduleListen();

    return () => {
      clearTimeout(speakTimeout);
      clearTimeout(listenTimeout);
    }
  }, []);
  
  if (!isVisible) return null;

  return (
    <div
      ref={assistantRef}
      className="fixed z-50 transition-all"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="relative group">
        <div
          className={cn(
            "w-24 h-24 rounded-full bg-card border-4 flex items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden",
            isListening ? "border-accent [box-shadow:0_0_20px_hsl(var(--accent))]" : "border-primary [box-shadow:0_0_20px_hsl(var(--primary))]",
          )}
        >
          <Image src="https://picsum.photos/100/100" width={96} height={96} alt="Rebecca AI Assistant" data-ai-hint="young chinese lady" className="w-full h-full object-cover"/>
          <div className={cn(
            "absolute bottom-5 w-6 h-1 bg-white rounded-full transition-all duration-100",
            isSpeaking ? "h-4" : "h-1"
          )}
            style={{transitionTimingFunction: 'cubic-bezier(0.8, 0, 0.2, 1)'}}
          />
        </div>
        <div 
          ref={dragHandleRef}
          onMouseDown={handleMouseDown}
          className="absolute -top-2 -right-2 p-2 bg-secondary rounded-full cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Move className="w-4 h-4 text-muted-foreground" />
        </div>
         {isListening && (
          <div className="absolute -top-2 -left-2 p-2 bg-accent/50 rounded-full">
            <Mic className="w-4 h-4 text-accent animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
