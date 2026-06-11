"use client"

import React from 'react';
import { Brain, Settings, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function NavBar() {
  const [isDark, setIsDark] = React.useState(false);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="h-16 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50 px-6">
      <div className="container max-w-6xl mx-auto h-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-primary">
            MindForge
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleDark}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}