
"use client"

import React, { useState, useEffect } from 'react';
import { generateComprehensiveStudyMaterial, type GenerateStudyMaterialOutput } from '@/ai/flows/generate-comprehensive-study-material-flow';
import { NavBar } from '@/components/mindforge/nav-bar';
import { InputWorkspace } from '@/components/mindforge/input-workspace';
import { OutputDashboard } from '@/components/mindforge/output-dashboard';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { LoadingState } from '@/components/mindforge/loading-state';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateStudyMaterialOutput | null>(null);
  const [showContent, setShowContent] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerate = async (content: string) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generateComprehensiveStudyMaterial({ lessonContent: content });
      setResult(response);
      toast({
        title: "Mastery Forged",
        description: "Your study materials are ready.",
      });
    } catch (error) {
      console.error("Processing failed:", error);
      toast({
        variant: "destructive",
        title: "Forge Failed",
        description: "Could not process content. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <NavBar />
      
      <div className="container max-w-6xl mx-auto flex-1 flex flex-col px-6 py-12 md:py-16">
        {/* Centered Hero Section */}
        <div className="mb-16 text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-headline font-bold text-primary animate-slide-in tracking-tight">
            MindForge AI
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground font-light opacity-0 animate-slide-in [animation-delay:400ms] leading-relaxed">
            Transform your notes, lessons, and study materials into AI-powered flashcards, key concepts, and revision cards in seconds.
          </p>
          <div className="pt-2 opacity-0 animate-slide-in [animation-delay:600ms]">
            <span className="text-sm font-code text-secondary uppercase tracking-[0.2em] font-bold">Learn Less. Remember More.</span>
          </div>
        </div>

        {showContent && (
          <div className="space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Input Section */}
            <section id="workspace">
              <InputWorkspace onGenerate={handleGenerate} isLoading={isLoading} />
            </section>

            {/* Loading or Output */}
            {isLoading ? (
              <LoadingState />
            ) : result ? (
              <section id="results" className="pb-24">
                <OutputDashboard data={result} />
              </section>
            ) : (
              <div className="py-20 text-center">
                <p className="text-muted-foreground text-lg">Paste your content above to start your mastery journey.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Toaster />
    </main>
  );
}
