
import React, { useRef, useEffect } from 'react';
import { LogEntry, LogLevel } from '../types';

interface LogPanelProps {
  logs: LogEntry[];
  onClear: () => void;
  onDownload: () => void;
}

const LogPanel: React.FC<LogPanelProps> = ({ logs, onClear, onDownload }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLevelStyles = (level: LogLevel) => {
    switch (level) {
      case LogLevel.INFO: return 'text-slate-400';
      case LogLevel.WARN: return 'text-amber-400';
      case LogLevel.ERROR: return 'text-rose-400';
      case LogLevel.SUCCESS: return 'text-emerald-400';
      default: return 'text-slate-200';
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-xl flex flex-col h-[400px]">
      <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex justify-between items-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Processing Log
        </span>
        <div className="flex gap-2">
          <button 
            onClick={onDownload}
            className="text-[10px] bg-slate-700 hover:bg-slate-600 text-slate-200 px-2 py-1 rounded transition-colors"
          >
            Download
          </button>
          <button 
            onClick={onClear}
            className="text-[10px] bg-slate-700 hover:bg-slate-600 text-slate-200 px-2 py-1 rounded transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 console-font text-sm leading-relaxed"
      >
        {logs.length === 0 ? (
          <div className="text-slate-600 italic">No logs to display. Select an input folder and start processing.</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="mb-1 flex gap-3">
              <span className="text-slate-600 whitespace-nowrap">
                {log.timestamp.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <span className={`${getLevelStyles(log.level)}`}>
                {log.fileName ? `[${log.fileName}] ` : ''}
                {log.message}
                {log.code ? ` (${log.code})` : ''}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogPanel;
