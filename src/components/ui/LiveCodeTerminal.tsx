"use client";

import { useEffect, useState, useRef } from "react";

interface LiveCodeTerminalProps {
  codeLines: string[];
  title: string;
  lang: string;
  positionClass: string;
  glowColor?: "cyan" | "purple";
  opacity?: number;
  scale?: number;
  transformStyle?: string;
  blurClass?: string;
  typingSpeed?: number;
  holdTime?: number;
}

const SCRAMBLE_CHARS = "01<>/\\{}[];:!@#$%^*()_+-=";

export default function LiveCodeTerminal({
  codeLines,
  title,
  lang,
  positionClass,
  glowColor = "cyan",
  opacity = 0.8,
  scale = 1,
  transformStyle = "perspective(1000px) rotateX(20deg) rotateY(-10deg) rotateZ(5deg)",
  blurClass = "blur-none",
  typingSpeed = 30,
  holdTime = 4000,
}: LiveCodeTerminalProps) {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [scrambleTick, setScrambleTick] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineIdx >= codeLines.length) {
      // Finished all lines, hold then reset
      const resetTimeout = setTimeout(() => {
        setTypedLines([]);
        setCurrentLineText("");
        setLineIdx(0);
        setCharIdx(0);
      }, holdTime);
      return () => clearTimeout(resetTimeout);
    }

    const currentLine = codeLines[lineIdx];

    if (charIdx < currentLine.length) {
      const typeTimeout = setTimeout(() => {
        // Scramble effect: for the current character, show a random character 2-3 times before locking it
        if (scrambleTick < 2 && Math.random() < 0.4) {
          const randomChar = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          setCurrentLineText((prev) => {
            const base = prev.slice(0, charIdx);
            return base + randomChar;
          });
          setScrambleTick((t) => t + 1);
        } else {
          // Lock current character
          setCurrentLineText((prev) => {
            const base = prev.slice(0, charIdx);
            return base + currentLine[charIdx];
          });
          setCharIdx((c) => c + 1);
          setScrambleTick(0);
        }
      }, typingSpeed);

      return () => clearTimeout(typeTimeout);
    } else {
      // Completed line typing, commit to typedLines and advance index
      const lineTimeout = setTimeout(() => {
        setTypedLines((prev) => [...prev, currentLine]);
        setCurrentLineText("");
        setLineIdx((l) => l + 1);
        setCharIdx(0);
        setScrambleTick(0);
      }, 500);

      return () => clearTimeout(lineTimeout);
    }
  }, [charIdx, lineIdx, scrambleTick, codeLines, typingSpeed, holdTime]);

  // Syntax highlighting simple helper
  const renderLine = (line: string, index: number) => {
    // Keywords split
    const parts = line.split(/(\s+|=|\{|\}|\(|\)|\[|\]|\.|,|:|'|")/g);
    return (
      <div key={index} className="truncate select-none">
        {parts.map((part, i) => {
          let colorClass = "text-gray-300";
          
          if (glowColor === "cyan") {
            if (/^(const|let|var|function|return|import|export|from|class|def|import|as|from|async|await)$/.test(part)) {
              colorClass = "text-cyan-300 font-bold";
            } else if (/^(true|false|null|undefined|\d+)$/.test(part)) {
              colorClass = "text-amber-300";
            } else if (/^[A-Z][a-zA-Z0-9_]*$/.test(part)) {
              colorClass = "text-teal-300";
            } else if (/^['"].*['"]$/.test(part) || part.startsWith("'") || part.startsWith('"')) {
              colorClass = "text-emerald-300";
            } else if (/^[a-zA-Z0-9_]+\(/.test(part) || /^[a-zA-Z0-9_]+$/.test(part)) {
              colorClass = "text-cyan-100";
            }
          } else {
            // purple glow
            if (/^(const|let|var|function|return|import|export|from|class|def|import|as|from|async|await)$/.test(part)) {
              colorClass = "text-violet-300 font-bold";
            } else if (/^(true|false|null|undefined|\d+)$/.test(part)) {
              colorClass = "text-fuchsia-300";
            } else if (/^[A-Z][a-zA-Z0-9_]*$/.test(part)) {
              colorClass = "text-pink-300";
            } else if (/^['"].*['"]$/.test(part) || part.startsWith("'") || part.startsWith('"')) {
              colorClass = "text-purple-300";
            } else if (/^[a-zA-Z0-9_]+\(/.test(part) || /^[a-zA-Z0-9_]+$/.test(part)) {
              colorClass = "text-violet-100";
            }
          }
          return <span key={i} className={colorClass}>{part}</span>;
        })}
      </div>
    );
  };

  const glowAnimClass = glowColor === "cyan" ? "animate-pulse-glow-cyan" : "animate-pulse-glow-purple";
  const borderClass = glowColor === "cyan" ? "border-cyan-500/10" : "border-violet-500/10";
  const textClass = glowColor === "cyan" ? "text-cyan-400" : "text-violet-400";
  const bgClass = "bg-black/65 backdrop-blur-lg";

  return (
    <div
      ref={containerRef}
      className={`absolute ${positionClass} z-[2] w-80 rounded-xl border ${borderClass} ${bgClass} p-4 font-mono text-[10px] shadow-2xl transition-all duration-700 pointer-events-none ${blurClass} ${glowAnimClass}`}
      style={{
        opacity: opacity,
        transform: transformStyle,
        transformOrigin: "center center",
        scale: scale,
      }}
    >
      {/* Terminal Title Bar */}
      <div className="flex justify-between items-center text-[7px] text-gray-500 font-semibold uppercase tracking-widest mb-3 pb-2 border-b border-white/5 select-none">
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${glowColor === 'cyan' ? 'bg-cyan-400' : 'bg-violet-400'} animate-pulse`} />
          <span className="text-gray-400">{title}</span>
        </span>
        <span className="font-light">{lang}</span>
      </div>

      {/* Code Text Body */}
      <div className="space-y-1.5 overflow-hidden h-[125px] flex flex-col justify-start">
        {typedLines.map((line, idx) => renderLine(line, idx))}
        {lineIdx < codeLines.length && (
          <div className="flex items-center gap-0.5">
            {renderLine(currentLineText, lineIdx)}
            <span className={`w-1 h-3 ${glowColor === 'cyan' ? 'bg-cyan-300 shadow-[0_0_8px_#06b6d4]' : 'bg-violet-400 shadow-[0_0_8px_#d946ef]'} animate-pulse`} />
          </div>
        )}
      </div>
    </div>
  );
}
