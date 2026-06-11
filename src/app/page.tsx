
"use client"

import React, { useState, useEffect } from 'react';
import { generateComprehensiveStudyMaterial, type GenerateStudyMaterialOutput } from '@/ai/flows/generate-comprehensive-study-material-flow';
import { NavBar } from '@/components/mindforge/nav-bar';
import { InputWorkspace } from '@/components/mindforge/input-workspace';
import { OutputDashboard } from '@/components/mindforge/output-dashboard';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { LoadingState } from '@/components/mindforge/loading-state';
import { motion } from 'motion/react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateStudyMaterialOutput | null>(null);
  const [showContent, setShowContent] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerate = async (content: string) => {
    setIsLoading(true);
    setLoadingMessage(null);
    setResult(null);

    const maxRetries = 3;
    const delays = [2000, 4000, 8000]; // 2s, 4s, 8s exponential backoff

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          setLoadingMessage("Gemini is experiencing high demand. Retrying...");
          // Wait for exponential backoff duration
          await new Promise((resolve) => setTimeout(resolve, delays[attempt - 1]));
        }

        const response = await generateComprehensiveStudyMaterial({ lessonContent: content });
        if (!response.success) {
          throw new Error(response.details || response.error);
        }
        setResult(response.data);
        toast({
          title: "Mastery Forged",
          description: "Your study materials are ready.",
        });
        setIsLoading(false);
        setLoadingMessage(null);
        return; // Success! Exit flow
      } catch (error) {
        // Log technical details but do not expose raw API errors to users
        console.error(`Attempt ${attempt} of study material generation failed with error:`, error);

        if (attempt === maxRetries) {
          // All retries failed, show a friendly notification to the user
          toast({
            variant: "destructive",
            title: "Forge Failed",
            description: "AI service is currently busy. Please try again in a few moments.",
          });
          setIsLoading(false);
          setLoadingMessage(null);
          return;
        }
      }
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <NavBar />
      
      <div className="container max-w-6xl mx-auto flex-1 flex flex-col px-6 py-12 md:py-16">
        {/* Centered Hero Section */}
        <div className="mb-16 text-center space-y-6 overflow-hidden select-none">
          <motion.h1 
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-headline font-bold text-primary tracking-tight"
          >
            MindForge AI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground font-light leading-relaxed px-4"
          >
            Transform your notes, lessons, and study materials into AI-powered flashcards, key concepts, and revision cards in seconds.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
            className="pt-2"
          >
            <span className="text-sm font-code text-secondary uppercase tracking-[0.2em] font-bold">Learn Less. Remember More.</span>
          </motion.div>
        </div>

        {showContent && (
          <div className="space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Input Section */}
            <section id="workspace">
              <InputWorkspace onGenerate={handleGenerate} isLoading={isLoading} />
            </section>

            {/* Loading or Output */}
            {isLoading ? (
              <LoadingState messageOverride={loadingMessage} />
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
