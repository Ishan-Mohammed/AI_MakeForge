"use client"

import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Sparkles, X, Paperclip, ChevronRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface StudyWorkspaceProps {
  onGenerate: (content: string) => void;
  isLoading: boolean;
}

export function StudyWorkspace({ onGenerate, isLoading }: StudyWorkspaceProps) {
  const [content, setContent] = useState("");
  const charLimit = 5000;

  return (
    <div className="flex flex-col h-full p-6 border-r border-white/[0.05] bg-background/30 custom-scrollbar overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-headline font-bold mb-2">Workspace</h2>
        <p className="text-sm text-slate-500">Upload documents or paste lecture notes to synthesize study material.</p>
      </div>

      <div className="flex-1 flex flex-col space-y-6">
        <div className="relative group flex-1 min-h-[300px]">
          <Textarea 
            placeholder="Drop your knowledge here... (Paste notes, articles, or transcripts)"
            className="h-full bg-white/[0.02] border-white/[0.05] focus:border-teal-500/50 focus:ring-teal-500/20 transition-all resize-none text-base leading-relaxed p-6 rounded-2xl placeholder:text-slate-700"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="absolute bottom-4 right-4 flex items-center space-x-4">
             <div className="text-[10px] font-code text-slate-600 uppercase tracking-widest">
              {content.length} / {charLimit} CHR
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border border-dashed border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-white/[0.02] hover:border-teal-500/30 transition-all cursor-pointer group">
            <Upload className="h-5 w-5 text-slate-500 group-hover:text-teal-400 mb-2 transition-colors" />
            <span className="text-xs text-slate-500 group-hover:text-slate-300">Upload PDF/DOCX</span>
          </div>
          <div className="border border-dashed border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-white/[0.02] hover:border-teal-500/30 transition-all cursor-pointer group">
            <Paperclip className="h-5 w-5 text-slate-500 group-hover:text-teal-400 mb-2 transition-colors" />
            <span className="text-xs text-slate-500 group-hover:text-slate-300">Reference URL</span>
          </div>
        </div>

        <Button 
          onClick={() => onGenerate(content)}
          disabled={isLoading || content.length < 50}
          className="h-14 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-headline text-lg group shadow-lg shadow-teal-500/10"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Forging Mastery...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Forge Study Material</span>
              <ChevronRight className="h-4 w-4 opacity-50 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </Button>
      </div>

      <div className="mt-8 pt-8 border-t border-white/[0.05]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-code text-slate-600 uppercase tracking-widest">Recently Synthesized</h3>
          <Button variant="ghost" size="sm" className="text-[10px] text-teal-500 uppercase tracking-widest">Clear All</Button>
        </div>
        <div className="space-y-2">
          {[1, 2].map(i => (
            <div key={i} className="flex items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.03] group hover:border-white/10 cursor-pointer transition-all">
              <FileText className="h-4 w-4 text-slate-500 mr-3" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-300 truncate">Quantum Mechanics Lecture {i}</p>
                <p className="text-[10px] text-slate-600">2.4k characters • 2 days ago</p>
              </div>
              <X className="h-3 w-3 text-slate-700 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
