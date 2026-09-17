import React, { useState } from 'react';
import { X, Code2, Copy, Check, Play, Star, BookOpen } from 'lucide-react';
import { PINE_SCRIPTS } from '../data/marketData';

interface PineScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyScript?: () => void;
}

export const PineScriptModal: React.FC<PineScriptModalProps> = ({
  isOpen,
  onClose,
  onApplyScript,
}) => {
  const [selectedScript, setSelectedScript] = useState(PINE_SCRIPTS[0]);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedScript.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunScript = () => {
    setIsRunning(true);
    setConsoleOutput('Compiling Pine Script v5 syntax...');
    setTimeout(() => {
      setConsoleOutput(
        `✓ Compilation Successful!\nIndicator "${selectedScript.title}" added to active chart overlay.\nParameters: fastEMA=20, slowEMA=50, Volatility=2.0.\nReal-time calculations active.`
      );
      setIsRunning(false);
      if (onApplyScript) onApplyScript();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#2a2e39] bg-[#171b26] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Pine Script® Editor & Repository</h2>
              <p className="text-xs text-neutral-400">
                Next-generation quantitative trading logic running natively in your browser
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Script Selection Tabs */}
        <div className="flex items-center space-x-2 px-4 py-2.5 bg-[#0e1117] border-b border-[#2a2e39] overflow-x-auto text-xs">
          {PINE_SCRIPTS.map((script) => (
            <button
              key={script.id}
              onClick={() => {
                setSelectedScript(script);
                setConsoleOutput(null);
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-2 whitespace-nowrap transition-colors cursor-pointer ${
                selectedScript.id === script.id
                  ? 'bg-purple-600/20 text-purple-300 font-semibold border border-purple-500/40'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{script.title}</span>
              <span className="flex items-center space-x-0.5 text-[10px] text-amber-400">
                <Star className="w-2.5 h-2.5 fill-current" />
                <span>{(script.stars / 1000).toFixed(1)}k</span>
              </span>
            </button>
          ))}
        </div>

        {/* Script Description & Code Editor */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 font-mono text-xs">
          <div className="flex items-center justify-between font-sans">
            <div>
              <h3 className="text-sm font-bold text-white">{selectedScript.title}</h3>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">{selectedScript.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1e222d] hover:bg-[#2a2e39] text-neutral-200 transition cursor-pointer text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleRunScript}
                disabled={isRunning}
                className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-semibold transition cursor-pointer text-xs shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'Compiling...' : 'Run on Chart'}</span>
              </button>
            </div>
          </div>

          {/* Syntax Highlighted Code Box */}
          <div className="bg-[#0b0e14] border border-[#2a2e39] rounded-xl p-4 overflow-x-auto text-neutral-300 leading-relaxed">
            <pre className="text-xs">
              {selectedScript.code.split('\n').map((line, idx) => {
                let formatted = line;
                const isComment = line.trim().startsWith('//');
                const isKeyword =
                  line.includes('indicator') ||
                  line.includes('input') ||
                  line.includes('plot') ||
                  line.includes('if');

                return (
                  <div key={idx} className="flex">
                    <span className="w-8 text-neutral-600 select-none text-right pr-3 shrink-0">
                      {idx + 1}
                    </span>
                    <span
                      className={
                        isComment
                          ? 'text-neutral-500 italic'
                          : isKeyword
                          ? 'text-purple-400 font-medium'
                          : 'text-neutral-200'
                      }
                    >
                      {formatted}
                    </span>
                  </div>
                );
              })}
            </pre>
          </div>

          {/* Console output */}
          {consoleOutput && (
            <div className="p-3 bg-[#0e1117] border border-emerald-500/30 rounded-lg text-emerald-400 text-xs whitespace-pre-line animate-in fade-in">
              {consoleOutput}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#171b26] border-t border-[#2a2e39] flex items-center justify-between text-xs text-neutral-400 font-sans">
          <div className="flex items-center space-x-1">
            <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
            <span>Pine Script® v5 Language Reference Documented</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-neutral-300 hover:text-white px-3 py-1 rounded bg-[#2a2e39]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
