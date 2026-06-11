
"use client"

import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Sparkles, FileText, X, Loader2 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface InputWorkspaceProps {
  onGenerate: (content: string) => void;
  isLoading: boolean;
}

export function InputWorkspace({ onGenerate, isLoading }: InputWorkspaceProps) {
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const charLimit = 12000;
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      toast({ title: "File Attached", description: `${file.name} ready for synthesis.` });
    }
  };

  return (
    <Card className="study-card p-0 overflow-hidden border-2 border-primary/5 shadow-2xl bg-white max-w-5xl mx-auto transition-transform duration-300">
      <div className="p-6 md:p-8 space-y-4 md:space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="border-primary/20 text-primary font-code uppercase px-3 py-1 bg-primary/5 select-none">
            Source Ingest
          </Badge>
          <span className="text-xs font-code text-muted-foreground uppercase tracking-widest select-none">
            {content.length} / {charLimit} Characters
          </span>
        </div>

        <Textarea 
          placeholder="Paste your lecture notes, textbook passages, or research content here to start the synthesis..."
          className="min-h-[190px] bg-transparent border-none focus-visible:ring-0 text-xl leading-relaxed resize-none p-0 placeholder:text-muted-foreground/30 font-body text-primary transition-all duration-200"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {fileName && (
          <div className="flex items-center space-x-3 bg-secondary/5 border border-secondary/20 rounded-2xl px-5 py-3 w-fit animate-in zoom-in-95 duration-200">
            <FileText className="h-5 w-5 text-secondary" />
            <span className="text-sm font-bold text-secondary">{fileName}</span>
            <button onClick={() => setFileName(null)} className="hover:text-destructive active:scale-95 transition-all ml-2">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="px-6 py-4 md:px-8 md:py-6 bg-muted/30 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6 w-full md:w-auto justify-center md:justify-start">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.docx,.txt"
            onChange={handleFileUpload}
          />
          <label 
            htmlFor="file-upload" 
            className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-white border-2 border-primary/10 hover:border-secondary/50 hover:bg-secondary/5 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm font-bold text-primary group"
          >
            <Upload className="h-4 w-4 text-primary/50 group-hover:text-secondary transition-colors" />
            <span>Attach Source</span>
          </label>
        </div>

        <Button 
          size="lg"
          onClick={() => onGenerate(content)}
          disabled={isLoading || content.length < 50}
          className="bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] text-primary-foreground px-10 py-6 rounded-3xl shadow-xl shadow-primary/20 h-auto text-lg font-headline font-bold group transition-all duration-200 w-full md:w-auto"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-3">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Forging Knowledge...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-3">
              <Sparkles className="h-5 w-5 transition-transform group-hover:scale-125 group-hover:rotate-12" />
              <span>Forge Study Material</span>
            </div>
          )}
        </Button>
      </div>
    </Card>
  );
}
