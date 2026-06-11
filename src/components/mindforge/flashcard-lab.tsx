"use client"

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Copy, Check } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Flashcard {
  question: string;
  answer: string;
}

export function FlashcardLab({ flashcards }: { flashcards: Flashcard[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!flashcards.length) return null;

  const current = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleCopy = () => {
    const text = `Q: ${current.question}\nA: ${current.answer}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 py-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-2">
        <Badge variant="outline" className="bg-violet-500/5 text-violet-400 border-violet-500/20 px-3 py-1 font-code">
          CARD {currentIndex + 1} / {flashcards.length}
        </Badge>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopy}
            className="text-slate-400 hover:text-white hover:bg-white/5"
          >
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsFlipped(!isFlipped)}
            className="text-slate-400 hover:text-white hover:bg-white/5"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative h-[400px] w-full perspective-1000">
        <div 
          className={`relative h-full w-full transition-all duration-700 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <Card className="absolute inset-0 h-full w-full glass-card p-12 flex flex-col items-center justify-center text-center backface-hidden border-white/10 hover:border-violet-500/50 transition-colors">
            <span className="text-violet-400 text-xs font-code tracking-[0.2em] mb-6">QUESTION</span>
            <h3 className="text-2xl md:text-3xl font-headline font-semibold leading-tight text-white">
              {current.question}
            </h3>
            <div className="mt-auto pt-8 flex flex-col items-center">
                <span className="text-slate-500 text-xs uppercase tracking-widest font-code animate-pulse">Tap to reveal answer</span>
            </div>
          </Card>

          {/* Back */}
          <Card className="absolute inset-0 h-full w-full glass-card p-12 flex flex-col items-center justify-center text-center rotate-y-180 backface-hidden border-violet-500/30 bg-violet-950/10">
            <span className="text-indigo-400 text-xs font-code tracking-[0.2em] mb-6">ANSWER</span>
            <p className="text-xl md:text-2xl font-body leading-relaxed text-slate-200">
              {current.answer}
            </p>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-6">
        <Button 
          variant="outline" 
          size="lg"
          onClick={handlePrev}
          className="h-14 w-14 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="flex space-x-2">
            {flashcards.map((_, i) => (
                <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-violet-500' : 'w-1.5 bg-white/10'}`} 
                />
            ))}
        </div>

        <Button 
          variant="outline" 
          size="lg"
          onClick={handleNext}
          className="h-14 w-14 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}