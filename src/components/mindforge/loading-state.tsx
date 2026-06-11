
"use client"

import React, { useState, useEffect } from 'react';
import { Loader2, Brain, Sparkles, BookOpen, Layers } from 'lucide-react';

const steps = [
  { text: "Reading content...", icon: BookOpen },
  { text: "Extracting concepts...", icon: Layers },
  { text: "Generating flashcards...", icon: Brain },
  { text: "Creating revision cards...", icon: Sparkles },
];

export function LoadingState({ messageOverride }: { messageOverride?: string | null }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (messageOverride) return;
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [messageOverride]);

  const StepIcon = messageOverride ? Sparkles : steps[idx].icon;

  return (
    <div className="py-20 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/10 blur-3xl animate-pulse rounded-full"></div>
        <div className="relative flex items-center justify-center h-24 w-24">
            <Loader2 className="absolute h-24 w-24 text-primary/20 animate-spin" strokeWidth={1} />
            <StepIcon className="h-10 w-10 text-primary animate-bounce" />
        </div>
      </div>
      <div className="text-center space-y-3">
        <h3 className="text-3xl font-headline font-bold text-primary tracking-tight">
          {messageOverride || steps[idx].text}
        </h3>
        <p className="text-muted-foreground text-lg">
          {messageOverride ? "Please hold on while we re-establish communication." : "Our neural engine is forging your study material."}
        </p>
      </div>
      
      {!messageOverride && (
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? 'w-10 bg-primary' : 'w-2 bg-primary/10'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
