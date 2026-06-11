
"use client"

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Brain, 
  Layers, 
  FileText, 
  Copy, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  ListChecks
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface StudyData {
  flashcards: { question: string; answer: string }[];
  keyConcepts: { concept: string; explanation: string }[];
  revisionCards: { title: string; points: string[] }[];
}

export function OutputDashboard({ data }: { data: StudyData }) {
  const [fcIndex, setFcIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    let content = "MindForge AI Study Package\n\n";
    content += "--- FLASHCARDS ---\n";
    data.flashcards.forEach((f, i) => content += `Q${i+1}: ${f.question}\nA${i+1}: ${f.answer}\n\n`);
    content += "--- KEY CONCEPTS ---\n";
    data.keyConcepts.forEach(c => content += `${c.concept}: ${c.explanation}\n\n`);
    content += "--- REVISION CARDS ---\n";
    data.revisionCards.forEach(r => content += `${r.title}\n${r.points.map(p => `- ${p}`).join('\n')}\n\n`);

    navigator.clipboard.writeText(content);
    toast({ title: "Copied to Clipboard", description: "All materials copied for easy pasting." });
  };

  const handleDownloadTxt = () => {
    let content = "MindForge AI Study Package\n\n";
    content += "--- FLASHCARDS ---\n";
    data.flashcards.forEach((f, i) => content += `Q${i+1}: ${f.question}\nA${i+1}: ${f.answer}\n\n`);
    content += "--- KEY CONCEPTS ---\n";
    data.keyConcepts.forEach(c => content += `${c.concept}: ${c.explanation}\n\n`);
    content += "--- REVISION CARDS ---\n";
    data.revisionCards.forEach(r => content += `${r.title}\n${r.points.map(p => `- ${p}`).join('\n')}\n\n`);

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mindforge-study-${Date.now()}.txt`;
    link.click();
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mindforge-study-${Date.now()}.json`;
    link.click();
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-primary/10 pb-8">
        <div>
          <h2 className="text-4xl font-headline font-bold tracking-tight text-primary">Study Studio</h2>
          <p className="text-muted-foreground mt-1">Your AI-synthesized material is organized and ready for review.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" onClick={handleCopy} className="rounded-xl border-primary/20 hover:bg-primary/5 px-4 h-10">
            <Copy className="h-4 w-4 mr-2" /> Copy All
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadTxt} className="rounded-xl border-primary/20 hover:bg-primary/5 px-4 h-10">
            <Download className="h-4 w-4 mr-2" /> .TXT
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadJson} className="rounded-xl border-primary/20 hover:bg-primary/5 px-4 h-10">
            <Download className="h-4 w-4 mr-2" /> .JSON
          </Button>
        </div>
      </div>

      <Tabs defaultValue="flashcards" className="w-full">
        <TabsList className="bg-muted/50 p-1 border border-border rounded-2xl w-full justify-start h-auto mb-10 overflow-x-auto flex-nowrap">
          <TabsTrigger value="flashcards" className="rounded-xl py-3 px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-headline font-bold shrink-0">
            <Brain className="h-4 w-4 mr-2" /> Flashcards
          </TabsTrigger>
          <TabsTrigger value="concepts" className="rounded-xl py-3 px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-headline font-bold shrink-0">
            <Layers className="h-4 w-4 mr-2" /> Key Concepts
          </TabsTrigger>
          <TabsTrigger value="revision" className="rounded-xl py-3 px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-headline font-bold shrink-0">
            <ListChecks className="h-4 w-4 mr-2" /> Revision Cards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flashcards" className="focus-visible:outline-none">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="border-primary/20 text-primary font-code px-3 py-1 bg-primary/5">
                CARD {fcIndex + 1} / {data.flashcards.length}
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => setIsFlipped(!isFlipped)} className="text-primary hover:bg-primary/5">
                <RotateCcw className="h-4 w-4 mr-2" /> Flip Card
              </Button>
            </div>

            <div className="relative h-[400px] w-full perspective-1000">
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className={`relative h-full w-full transition-all duration-700 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
              >
                {/* Front */}
                <Card className="absolute inset-0 bg-white border-2 border-primary/10 p-10 flex flex-col items-center justify-center text-center backface-hidden rounded-3xl shadow-xl hover:border-primary/30 transition-all">
                  <span className="text-primary/50 text-xs font-code tracking-widest mb-6 uppercase">Question</span>
                  <h3 className="text-3xl font-headline font-bold leading-tight text-primary">
                    {data.flashcards[fcIndex].question}
                  </h3>
                  <div className="mt-12 text-muted-foreground text-[10px] font-code uppercase tracking-widest animate-pulse">
                    Click to reveal answer
                  </div>
                </Card>

                {/* Back */}
                <Card className="absolute inset-0 bg-primary/5 border-2 border-primary/30 p-10 flex flex-col items-center justify-center text-center rotate-y-180 backface-hidden rounded-3xl shadow-xl">
                  <span className="text-primary/50 text-xs font-code tracking-widest mb-6 uppercase">Answer</span>
                  <p className="text-2xl leading-relaxed text-foreground font-medium">
                    {data.flashcards[fcIndex].answer}
                  </p>
                </Card>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-6">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-14 w-14 rounded-full border-primary/20 hover:bg-primary/5 shadow-sm"
                onClick={() => { setIsFlipped(false); setFcIndex(prev => (prev - 1 + data.flashcards.length) % data.flashcards.length); }}
              >
                <ChevronLeft className="h-8 w-8 text-primary" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-14 w-14 rounded-full border-primary/20 hover:bg-primary/5 shadow-sm"
                onClick={() => { setIsFlipped(false); setFcIndex(prev => (prev + 1) % data.flashcards.length); }}
              >
                <ChevronRight className="h-8 w-8 text-primary" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="concepts" className="focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.keyConcepts.map((c, i) => (
              <Card key={i} className="study-card border-primary/5 hover:border-secondary/50 group bg-white shadow-md p-6">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 text-primary font-bold">
                  {i + 1}
                </div>
                <h4 className="text-xl font-headline font-bold text-primary mb-3">{c.concept}</h4>
                <p className="text-muted-foreground leading-relaxed">{c.explanation}</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="revision" className="focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.revisionCards.map((r, i) => (
              <Card key={i} className="study-card bg-white border-2 border-primary/5 shadow-lg p-8 rounded-3xl">
                <div className="flex items-center space-x-3 mb-6">
                  <Badge className="bg-secondary text-secondary-foreground border-none px-3 py-1 font-bold uppercase tracking-wider text-[10px]">REVISION</Badge>
                  <h3 className="text-2xl font-headline font-bold text-primary">{r.title}</h3>
                </div>
                <ul className="space-y-5">
                  {r.points.map((p, pi) => (
                    <li key={pi} className="flex items-start space-x-4 text-foreground/80 group">
                      <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-secondary/20 transition-colors">
                        <CheckCircle2 className="h-4 w-4 text-secondary" />
                      </div>
                      <span className="leading-relaxed text-lg">{p}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
