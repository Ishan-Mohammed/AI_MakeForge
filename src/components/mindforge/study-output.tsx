"use client"

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FlashcardViewer } from "./flashcard-viewer";
import { KnowledgeMap } from "./knowledge-map";
import { 
    Brain, 
    Layers, 
    BookOpen, 
    Hash, 
    HelpCircle, 
    Quote,
    Download,
    CheckCircle2,
    Lightbulb,
    FileText
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StudyOutputProps {
  data: any | null;
  isLoading: boolean;
}

export function StudyOutput({ data, isLoading }: StudyOutputProps) {
  const [activeTab, setActiveTab] = useState("flashcards");

  if (isLoading) {
    return (
      <div className="h-full flex flex-col p-12 bg-background/50 animate-in fade-in duration-700">
        <div className="mb-12 space-y-2">
            <h2 className="text-3xl font-headline font-bold">Forging Knowledge...</h2>
            <p className="text-slate-500">Extracting entities and building your interactive knowledge map.</p>
        </div>
        <div className="flex-1 max-w-4xl w-full mx-auto">
            <KnowledgeMap />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-background/50">
        <div className="max-w-md space-y-6">
            <div className="h-24 w-24 bg-teal-500/5 rounded-3xl flex items-center justify-center mx-auto border border-teal-500/10">
                <Lightbulb className="h-10 w-10 text-teal-600 animate-pulse" />
            </div>
            <h2 className="text-3xl font-headline font-bold text-white">Your Studio Awaits</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
                Paste your content in the left panel to begin. Our AI will synthesize flashcards, notes, and assessments instantly.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="bg-white/5 border-white/5 text-slate-500">Flashcards</Badge>
                <Badge variant="outline" className="bg-white/5 border-white/5 text-slate-500">Concepts</Badge>
                <Badge variant="outline" className="bg-white/5 border-white/5 text-slate-500">MCQs</Badge>
                <Badge variant="outline" className="bg-white/5 border-white/5 text-slate-500">AI Summary</Badge>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-8 bg-background/50 overflow-y-auto custom-scrollbar animate-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-headline font-bold tracking-tight">Study Dashboard</h2>
          <p className="text-slate-500 text-sm mt-1">Generated from your source material • High Density Detected</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-xl border-white/10 hover:bg-white/5 h-10 px-4">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button className="rounded-xl bg-teal-600 hover:bg-teal-500 text-white h-10 px-6">
            Start Quiz
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col space-y-8">
        <TabsList className="bg-white/[0.03] p-1 border border-white/[0.05] rounded-2xl w-full justify-start overflow-x-auto h-auto">
          <TabsTrigger value="flashcards" className="rounded-xl data-[state=active]:bg-teal-600 data-[state=active]:text-white px-6 py-2.5 font-headline">
            <Brain className="h-4 w-4 mr-2" /> Flashcards
          </TabsTrigger>
          <TabsTrigger value="concepts" className="rounded-xl data-[state=active]:bg-teal-600 data-[state=active]:text-white px-6 py-2.5 font-headline">
            <Layers className="h-4 w-4 mr-2" /> Concepts
          </TabsTrigger>
          <TabsTrigger value="notes" className="rounded-xl data-[state=active]:bg-teal-600 data-[state=active]:text-white px-6 py-2.5 font-headline">
            <BookOpen className="h-4 w-4 mr-2" /> Notes
          </TabsTrigger>
          <TabsTrigger value="definitions" className="rounded-xl data-[state=active]:bg-teal-600 data-[state=active]:text-white px-6 py-2.5 font-headline">
            <Hash className="h-4 w-4 mr-2" /> Glossary
          </TabsTrigger>
          <TabsTrigger value="assessment" className="rounded-xl data-[state=active]:bg-teal-600 data-[state=active]:text-white px-6 py-2.5 font-headline">
            <HelpCircle className="h-4 w-4 mr-2" /> Quiz
          </TabsTrigger>
          <TabsTrigger value="summary" className="rounded-xl data-[state=active]:bg-teal-600 data-[state=active]:text-white px-6 py-2.5 font-headline">
            <Quote className="h-4 w-4 mr-2" /> Summary
          </TabsTrigger>
        </TabsList>

        <div className="flex-1">
          <TabsContent value="flashcards" className="m-0 focus-visible:outline-none">
            <FlashcardViewer flashcards={data.flashcards} />
          </TabsContent>

          <TabsContent value="concepts" className="m-0 grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.keyConcepts.map((concept: string, i: number) => (
              <Card key={i} className="bg-white/[0.02] border-white/5 p-6 hover:border-teal-500/30 transition-all group rounded-2xl">
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0 border border-teal-500/20">
                    <span className="text-teal-400 font-code text-xs">{i + 1}</span>
                  </div>
                  <h4 className="text-lg font-headline font-medium text-slate-300 group-hover:text-white transition-colors">{concept}</h4>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="notes" className="m-0 animate-in slide-in-from-bottom-4 duration-500">
            <Card className="bg-white/[0.02] border-white/5 p-10 rounded-3xl">
              <ul className="space-y-6">
                {data.revisionNotes.map((note: string, i: number) => (
                  <li key={i} className="flex space-x-4">
                    <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0 mt-1" />
                    <p className="text-slate-300 font-body leading-relaxed text-lg">{note}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="definitions" className="m-0 grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.definitions.map((def: any, i: number) => (
              <Card key={i} className="bg-white/[0.02] border-white/5 p-6 rounded-2xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Hash className="h-16 w-16" />
                </div>
                <h4 className="text-xl font-headline font-bold text-teal-400 mb-3">{def.term}</h4>
                <p className="text-slate-400 font-body leading-relaxed text-sm">{def.definition}</p>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="assessment" className="m-0 space-y-12">
            <section className="space-y-6">
                <div className="flex items-center space-x-3">
                    <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 font-code">QUIZ_MODE</Badge>
                    <h3 className="text-xl font-headline font-bold">Concept Check</h3>
                </div>
                <div className="space-y-4">
                    {data.mcqs.map((q: any, i: number) => (
                        <Card key={i} className="bg-white/[0.02] border-white/5 p-8 rounded-3xl">
                            <p className="text-lg font-headline font-medium mb-6">{i+1}. {q.question}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {q.options.map((opt: any, oi: number) => (
                                    <Button key={oi} variant="outline" className="h-auto py-4 px-6 justify-start text-left border-white/10 hover:bg-white/5 rounded-2xl whitespace-normal">
                                        {opt.option}
                                    </Button>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
          </TabsContent>

          <TabsContent value="summary" className="m-0">
            <Card className="bg-white/[0.02] border-white/5 p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600/5 blur-[100px] -z-10"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/5 blur-[100px] -z-10"></div>
              
              <div className="flex items-center space-x-4 mb-10">
                  <div className="h-12 w-12 bg-teal-500/10 rounded-2xl flex items-center justify-center border border-teal-500/20">
                    <FileText className="h-6 w-6 text-teal-500" />
                  </div>
                  <h2 className="text-3xl font-headline font-bold">Executive Synthesis</h2>
              </div>

              <div className="prose prose-invert max-w-none">
                  <p className="text-xl leading-[1.8] text-slate-300 font-body">
                      {data.summary}
                  </p>
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
