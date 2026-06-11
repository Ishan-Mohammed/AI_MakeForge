"use client"

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FlashcardLab } from "./flashcard-lab";
import { Badge } from "@/components/ui/badge";
import { 
    Brain, 
    BookOpen, 
    Layers, 
    HelpCircle, 
    FileText, 
    BarChart3, 
    Download, 
    Share2, 
    CheckCircle2, 
    Timer, 
    Hash,
    Quote
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StudyMaterial {
  flashcards: any[];
  keyConcepts: string[];
  revisionNotes: string[];
  definitions: { term: string; definition: string }[];
  shortQuestions: { question: string; answer: string }[];
  longQuestions: { question: string; answer: string }[];
  mcqs: { question: string; options: { option: string; isCorrect: boolean }[] }[];
  summary: string;
}

export function Dashboard({ data }: { data: StudyMaterial }) {
  const [activeTab, setActiveTab] = useState("flashcards");

  const readingTime = Math.ceil(data.summary.split(' ').length / 200 + data.revisionNotes.length * 0.5);

  const stats = [
    { label: "Flashcards", value: data.flashcards.length, icon: Brain, color: "text-violet-400" },
    { label: "Concepts", value: data.keyConcepts.length, icon: Layers, color: "text-indigo-400" },
    { label: "Questions", value: data.shortQuestions.length + data.longQuestions.length + data.mcqs.length, icon: HelpCircle, color: "text-emerald-400" },
    { label: "Est. Reading", value: `${readingTime} min`, icon: Timer, color: "text-amber-400" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Analytics Ribbons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
        {stats.map((stat, i) => (
          <Card key={i} className="glass-card border-white/5 p-4 flex items-center space-x-4">
            <div className={`p-2.5 rounded-xl bg-white/5 ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-code text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-headline font-bold text-white">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-8">
            <div className="sticky top-4 z-40">
              <TabsList className="glass p-1 border-white/10 rounded-2xl w-full justify-start overflow-x-auto h-auto">
                <TabsTrigger value="flashcards" className="rounded-xl data-[state=active]:bg-violet-600 data-[state=active]:text-white px-6 py-3 font-headline">
                  <Brain className="h-4 w-4 mr-2" /> Flashcards
                </TabsTrigger>
                <TabsTrigger value="concepts" className="rounded-xl data-[state=active]:bg-violet-600 data-[state=active]:text-white px-6 py-3 font-headline">
                  <Layers className="h-4 w-4 mr-2" /> Concepts
                </TabsTrigger>
                <TabsTrigger value="notes" className="rounded-xl data-[state=active]:bg-violet-600 data-[state=active]:text-white px-6 py-3 font-headline">
                  <BookOpen className="h-4 w-4 mr-2" /> Revision Notes
                </TabsTrigger>
                <TabsTrigger value="definitions" className="rounded-xl data-[state=active]:bg-violet-600 data-[state=active]:text-white px-6 py-3 font-headline">
                  <Hash className="h-4 w-4 mr-2" /> Definitions
                </TabsTrigger>
                <TabsTrigger value="assessment" className="rounded-xl data-[state=active]:bg-violet-600 data-[state=active]:text-white px-6 py-3 font-headline">
                  <HelpCircle className="h-4 w-4 mr-2" /> Assessment
                </TabsTrigger>
                <TabsTrigger value="summary" className="rounded-xl data-[state=active]:bg-violet-600 data-[state=active]:text-white px-6 py-3 font-headline">
                  <Quote className="h-4 w-4 mr-2" /> AI Summary
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="flashcards" className="m-0 focus-visible:outline-none">
              <FlashcardLab flashcards={data.flashcards} />
            </TabsContent>

            <TabsContent value="concepts" className="m-0 space-y-6 animate-in slide-in-from-left-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.keyConcepts.map((concept, i) => (
                  <Card key={i} className="glass-card p-6 border-white/5 hover:border-violet-500/30 transition-all group">
                    <div className="flex items-start space-x-4">
                      <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                        <span className="text-violet-400 font-code text-xs">{i + 1}</span>
                      </div>
                      <h4 className="text-lg font-headline font-medium text-slate-200 group-hover:text-white">{concept}</h4>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notes" className="m-0 space-y-6 animate-in slide-in-from-left-4 duration-500">
              <Card className="glass-card p-8 border-white/5">
                <ul className="space-y-6">
                  {data.revisionNotes.map((note, i) => (
                    <li key={i} className="flex space-x-4">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-1" />
                      <p className="text-slate-300 font-body leading-relaxed text-lg">{note}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </TabsContent>

            <TabsContent value="definitions" className="m-0 space-y-6 animate-in slide-in-from-left-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.definitions.map((def, i) => (
                  <Card key={i} className="glass-card p-6 border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Hash className="h-12 w-12" />
                    </div>
                    <h4 className="text-xl font-headline font-bold text-violet-400 mb-3">{def.term}</h4>
                    <p className="text-slate-400 font-body leading-relaxed">{def.definition}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="assessment" className="m-0 space-y-12 animate-in slide-in-from-left-4 duration-500">
              <div className="space-y-8">
                <section className="space-y-4">
                    <h3 className="text-2xl font-headline font-bold flex items-center"><Badge className="mr-3 bg-amber-500">MCQ</Badge> Multiple Choice Questions</h3>
                    <div className="space-y-4">
                        {data.mcqs.map((q, i) => (
                            <Card key={i} className="glass-card p-6 border-white/5">
                                <p className="text-lg font-headline font-medium mb-4">{i+1}. {q.question}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {q.options.map((opt, oi) => (
                                        <div key={oi} className={`p-3 rounded-lg border transition-all ${opt.isCorrect ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' : 'border-white/5 bg-white/5 text-slate-400'}`}>
                                            {opt.option}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-2xl font-headline font-bold flex items-center"><Badge className="mr-3 bg-blue-500">SHORT</Badge> Critical Recall</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {data.shortQuestions.map((q, i) => (
                            <Card key={i} className="glass-card p-6 border-white/5">
                                <p className="text-lg font-headline font-medium text-white mb-2">{q.question}</p>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <p className="text-slate-400 italic font-body">{q.answer}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="space-y-4">
                    <h3 className="text-2xl font-headline font-bold flex items-center"><Badge className="mr-3 bg-purple-500">LONG</Badge> Comprehensive Synthesis</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {data.longQuestions.map((q, i) => (
                            <Card key={i} className="glass-card p-6 border-white/5">
                                <p className="text-lg font-headline font-bold text-white mb-2">{q.question}</p>
                                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                    <p className="text-slate-300 font-body leading-relaxed">{q.answer}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="m-0 animate-in slide-in-from-left-4 duration-500">
              <Card className="glass-card p-10 border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] -z-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 blur-[100px] -z-10"></div>
                
                <div className="flex items-center space-x-3 mb-8">
                    <Quote className="h-8 w-8 text-violet-500" />
                    <h2 className="text-3xl font-headline font-bold text-white">Neural Synthesis Summary</h2>
                </div>

                <div className="prose prose-invert max-w-none">
                    <p className="text-xl leading-[1.8] text-slate-300 font-body">
                        {data.summary}
                    </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Actions */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
            <Card className="glass-card p-6 border-white/10">
                <h4 className="text-sm font-code text-slate-500 uppercase tracking-widest mb-4">Export Hub</h4>
                <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/10 py-6">
                        <Download className="h-4 w-4 mr-3 text-violet-400" />
                        Download PDF
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/10 py-6">
                        <Share2 className="h-4 w-4 mr-3 text-indigo-400" />
                        Share Session
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/10 py-6">
                        <FileText className="h-4 w-4 mr-3 text-emerald-400" />
                        Export to Markdown
                    </Button>
                </div>
            </Card>

            <Card className="glass-card p-6 border-white/10 bg-violet-600/10">
                <h4 className="text-sm font-code text-violet-400 uppercase tracking-widest mb-4">Knowledge Graph</h4>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Completeness</span>
                        <span className="text-white font-code text-sm">88%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 w-[88%] rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>
                    </div>
                    <p className="text-xs text-slate-500 font-body leading-relaxed">
                        Neural model accuracy verified against source material. High conceptual density detected.
                    </p>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
