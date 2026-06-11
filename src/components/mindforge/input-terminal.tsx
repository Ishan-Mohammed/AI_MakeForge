"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, X, Sparkles, Send } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InputTerminalProps {
  onGenerate: (content: string) => void;
  isLoading: boolean;
}

export function InputTerminal({ onGenerate, isLoading }: InputTerminalProps) {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  const charCount = text.length;
  const maxChars = 10000;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // In a real app we'd parse the file content here.
      // For this demo, we'll just mock it or assume the user also pastes text.
    }
  };

  const handleSubmit = () => {
    if (text.trim().length > 10) {
      onGenerate(text);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <Card className="relative glass-card overflow-hidden rounded-2xl border-white/5">
          <div className="p-1 bg-gradient-to-r from-white/5 to-transparent border-b border-white/5 flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
              </div>
              <span className="text-xs font-code text-slate-500 uppercase tracking-widest ml-4">Neural_Ingest_v1.0</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="font-code text-[10px] bg-violet-500/5 text-violet-400 border-violet-500/20">
                {charCount} / {maxChars} CHR
              </Badge>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <Textarea
              placeholder="Paste your lecture notes, article text, or study material here to begin the synthesis process..."
              className="min-h-[300px] bg-transparent border-none focus-visible:ring-0 text-lg font-body leading-relaxed resize-none placeholder:text-slate-600 p-0"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {fileName && (
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 animate-in zoom-in-95 duration-200">
                <FileText className="h-4 w-4 text-violet-400" />
                <span className="text-sm text-slate-300 font-code truncate max-w-[200px]">{fileName}</span>
                <button onClick={() => setFileName(null)} className="hover:text-red-400 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="p-4 bg-white/[0.02] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
              />
              <label 
                htmlFor="file-upload" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer text-sm font-medium"
              >
                <Upload className="h-4 w-4 text-slate-400" />
                <span>Upload Source</span>
              </label>
            </div>

            <Button 
              size="lg"
              disabled={isLoading || text.trim().length < 10}
              onClick={handleSubmit}
              className="bg-violet-600 hover:bg-violet-500 text-white border-none px-8 py-6 rounded-xl shadow-lg shadow-violet-500/20 group transition-all duration-300"
            >
              {isLoading ? (
                "Processing Neural Pathways..."
              ) : (
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  <span className="font-headline font-semibold text-lg">Forge Study Material</span>
                  <Send className="h-4 w-4 ml-1 opacity-50" />
                </div>
              )}
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="flex justify-center space-x-12 pt-8 text-slate-500">
        <div className="flex items-center space-x-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
          <div className="p-2 rounded-full bg-white/5"><FileText className="h-4 w-4" /></div>
          <span className="text-xs uppercase tracking-wider font-code">PDF Supported</span>
        </div>
        <div className="flex items-center space-x-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
          <div className="p-2 rounded-full bg-white/5"><FileText className="h-4 w-4" /></div>
          <span className="text-xs uppercase tracking-wider font-code">MD Supported</span>
        </div>
        <div className="flex items-center space-x-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
          <div className="p-2 rounded-full bg-white/5"><FileText className="h-4 w-4" /></div>
          <span className="text-xs uppercase tracking-wider font-code">Neural API Active</span>
        </div>
      </div>
    </div>
  );
}
