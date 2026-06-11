"use client"

import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles, Brain, Cpu, BookOpen, Layers } from 'lucide-react';

const messages = [
  { text: "Analyzing lesson content...", icon: Sparkles },
  { text: "Extracting key concepts...", icon: Brain },
  { text: "Generating neural flashcards...", icon: Cpu },
  { text: "Preparing revision notes...", icon: BookOpen },
  { text: "Building study material ecosystem...", icon: Layers },
];

export function LoadingOverlay({ active }: { active: boolean }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  const MessageIcon = messages[currentIdx].icon;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0A0F]/90 backdrop-blur-xl transition-all duration-500">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-violet-500/20 blur-[100px] animate-pulse rounded-full"></div>
        <div className="relative flex items-center justify-center">
          <Loader2 className="h-16 w-16 text-violet-500 animate-spin" />
        </div>
      </div>
      
      <div className="text-center space-y-4 max-w-md px-6">
        <div className="flex items-center justify-center space-x-3 text-violet-400">
          <MessageIcon className="h-6 w-6 animate-bounce" />
          <h3 className="text-2xl font-headline font-semibold tracking-tight text-white">
            {messages[currentIdx].text}
          </h3>
        </div>
        <p className="text-slate-400 text-sm animate-pulse">
          Our neural engine is synthesizing your knowledge profile. This typically takes a few moments...
        </p>
      </div>

      <div className="mt-12 flex gap-2">
        {messages.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-500 ${i === currentIdx ? 'w-8 bg-violet-500' : 'w-2 bg-white/10'}`}
          />
        ))}
      </div>
    </div>
  );
}
