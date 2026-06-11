"use client"

import React, { useEffect, useState } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  label: string;
}

interface Connection {
  from: number;
  to: number;
}

const CONCEPTS = [
  "Core Thesis", "Statistical Analysis", "Methodology", "Conclusion", 
  "Hypothesis", "Sample Size", "Historical Context", "Theoretical Framework",
  "Practical Application", "Case Study", "Key Definition", "System Architecture"
];

export function KnowledgeMap() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (nodes.length < 10) {
        const newNode: Node = {
          id: nodes.length,
          x: 20 + Math.random() * 60,
          y: 20 + Math.random() * 60,
          label: CONCEPTS[nodes.length % CONCEPTS.length]
        };
        setNodes(prev => [...prev, newNode]);
        
        if (nodes.length > 0) {
          const fromIdx = Math.floor(Math.random() * nodes.length);
          setConnections(prev => [...prev, { from: nodes[fromIdx].id, to: newNode.id }]);
        }
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [nodes]);

  return (
    <div className="relative w-full h-full min-h-[300px] overflow-hidden bg-teal-950/20 rounded-2xl border border-white/[0.05]">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map((conn, i) => {
          const from = nodes.find(n => n.id === conn.from);
          const to = nodes.find(n => n.id === conn.to);
          if (!from || !to) return null;
          return (
            <line
              key={i}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke="rgba(20, 184, 166, 0.2)"
              strokeWidth="1"
              className="animate-pulse"
            />
          );
        })}
      </svg>
      
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute knowledge-node flex flex-col items-center transition-all duration-1000 ease-out"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className="h-2 w-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
          <span className="mt-2 text-[10px] font-code text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-500/20 whitespace-nowrap">
            {node.label}
          </span>
        </div>
      ))}

      <div className="absolute bottom-6 left-6 flex items-center space-x-3">
        <div className="flex space-x-1">
          <div className="h-1 w-1 bg-teal-500 rounded-full animate-bounce" />
          <div className="h-1 w-1 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="h-1 w-1 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
        <span className="text-xs font-code text-teal-500 uppercase tracking-widest">Synthesizing_Knowledge_Graph</span>
      </div>
    </div>
  );
}
