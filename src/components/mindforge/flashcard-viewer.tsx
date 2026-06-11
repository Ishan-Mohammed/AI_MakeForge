"use client"

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, Bookmark, Share2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Flashcard {
  question: string;
  answer: string;
}

export function FlashcardViewer({ flashcards }: { flashcards: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (!flashcards.length) return null;

  const current = flashcards[index];

  const next = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prev = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 font-code uppercase">
            Card {index + 1} of {flashcards.length}
          </Badge>
          <div className="flex space-x-1">
            {flashcards.slice(0, 10).map((_, i) => (
              <div key={i} className={`h-1 w-4 rounded-full transition-all ${i === index ? 'bg-teal-500' : 'bg-white/5'}`} />
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-teal-400"><Volume2 className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-teal-400"><Bookmark className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-teal-400"><Share2 className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="relative h-[380px] w-full perspective-1200 group">
        <div 
          onClick={() => setFlipped(!flipped)}
          className={`relative h-full w-full transition-all duration-700 preserve-3d cursor-pointer ${flipped ? 'rotate-y-180' : ''}`}
        >
          {/* Front */}
          <Card className="absolute inset-0 bg-white/[0.03] border-white/10 p-12 flex flex-col items-center justify-center text-center backface-hidden rounded-3xl group-hover:border-teal-500/30 transition-all shadow-2xl">
            <span className="text-[10px] font-code text-teal-500 uppercase tracking-widest mb-6 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">Active Question</span>
            <h3 className="text-2xl md:text-3xl font-headline font-semibold leading-snug">
              {current.question}
            </h3>
            <div className="mt-12 flex flex-col items-center text-slate-500 text-[10px] font-code uppercase tracking-widest">
              <RotateCcw className="h-4 w-4 mb-2 animate-spin-slow" />
              Click to flip
            </div>
          </Card>

          {/* Back */}
          <Card className="absolute inset-0 bg-teal-900/10 border-teal-500/20 p-12 flex flex-col items-center justify-center text-center rotate-y-180 backface-hidden rounded-3xl shadow-2xl">
            <span className="text-[10px] font-code text-emerald-500 uppercase tracking-widest mb-6 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Synthesized Answer</span>
            <p className="text-xl md:text-2xl leading-relaxed text-slate-200">
              {current.answer}
            </p>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-6">
        <Button onClick={prev} variant="outline" className="h-12 w-12 rounded-full border-white/10 bg-white/5 hover:bg-white/10">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button 
          onClick={() => setFlipped(!flipped)} 
          className="bg-white/5 hover:bg-white/10 text-slate-300 font-headline px-8 h-12 rounded-2xl border border-white/10"
        >
          {flipped ? 'Hide Answer' : 'Reveal Answer'}
        </Button>
        <Button onClick={next} variant="outline" className="h-12 w-12 rounded-full border-white/10 bg-white/5 hover:bg-white/10">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}