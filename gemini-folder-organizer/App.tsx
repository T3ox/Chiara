
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Folder,
  Play,
  CircleStop,
  FolderPlus,
  CheckCircle,
  AlertTriangle,
  Search,
  ChevronRight
} from 'lucide-react';
import { LogEntry, LogLevel, ProcessingStats, FolderStructure, ErrorCodes } from './types';
import { SUPPORTED_EXTENSIONS, TRUNCATION_LIMITS } from './constants';
import LogPanel from './components/LogPanel';
import { FileExtractor } from './services/fileExtractor';
import { GeminiService } from './services/gemini';

const App: React.FC = () => {
  const [folders, setFolders] = useState<FolderStructure>({
    inputHandle: null,
    resultHandle: null,
    availableFolders: []
  });
  const [stats, setStats] = useState<ProcessingStats>({
    total: 0,
    done: 0,
    failed: 0,
    currentFile: null
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const stopRequested = useRef(false);
  const gemini = useRef(new GeminiService());

  const addLog = useCallback((message: string, level: LogLevel = LogLevel.INFO, fileName?: string, code?: string) => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      level,
      message,
      fileName,
      code
    };
    setLogs(prev => [...prev, newLog]);
  }, []);

  const handlePickInput = async () => {
    try {
      const handle = await (window as any).showDirectoryPicker({ mode: 'readwrite' });
      setFolders(prev => ({ ...prev, inputHandle: handle }));
      addLog(`Input folder selected: ${handle.name}`, LogLevel.SUCCESS);
    } catch (e) {
      addLog('Folder selection cancelled', LogLevel.WARN);
    }
  };

  const handlePickResult = async () => {
    try {
      const handle = await (window as any).showDirectoryPicker({ mode: 'readwrite' });
      // Auto-create "DaRevisionare"
      await handle.getDirectoryHandle('DaRevisionare', { create: true });

      const subfolders: string[] = [];
      for await (const entry of handle.values()) {
        if (entry.kind === 'directory') {
          subfolders.push(entry.name);
        }
      }

      setFolders(prev => ({
        ...prev,
        resultHandle: handle,
        availableFolders: subfolders
      }));
      addLog(`Result folder selected: ${handle.name}. Found ${subfolders.length} subfolders.`, LogLevel.SUCCESS);
    } catch (e) {
      addLog('Result folder selection failed', LogLevel.ERROR);
    }
  };

  const processFile = async (fileHandle: FileSystemFileHandle, stopSignal: React.MutableRefObject<boolean>) => {
    const file = await fileHandle.getFile();
    const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const type = SUPPORTED_EXTENSIONS[ext];

    if (!type) {
      return { success: false, code: ErrorCodes.UNSUP, reason: `Extension ${ext} not supported` };
    }

    addLog(`Analyzing...`, LogLevel.INFO, file.name);

    try {
      let content: { text?: string; imageData?: string; pdfData?: string } = {};

      if (type === 'pdf') {
        const pages = await FileExtractor.getPdfPageCount(file);
        if (pages > TRUNCATION_LIMITS.PDF_MAX_PAGES_FULL || file.size > TRUNCATION_LIMITS.PDF_MAX_BYTES_FULL) {
          addLog(`PDF too large, using first page only`, LogLevel.WARN, file.name);
          content.imageData = await FileExtractor.getPdfThumbnail(file);
        } else {
          const buffer = await file.arrayBuffer();
          const base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
          content.pdfData = base64;
        }
      } else if (type === 'docx') {
        const isLarge = file.size > TRUNCATION_LIMITS.DOCX_MAX_BYTES_FULL;
        content.text = await FileExtractor.extractTextFromDocx(file, isLarge);
      } else if (type === 'excel') {
        content.text = await FileExtractor.extractTextFromXlsx(file);
      } else if (type === 'images') {
        content.imageData = await FileExtractor.resizeImage(file);
      }

      if (!content.text && !content.imageData && !content.pdfData) {
        return { success: false, code: ErrorCodes.EMPTY, reason: 'Could not extract content' };
      }

      // Gemini Call with manual retry for 429
      let rawResult = '';
      let attempts = 0;
      const delays = [2000, 5000, 10000];

      while (attempts < 4) {
        try {
          rawResult = await gemini.current.classifyFile(type as any, content, file.name, folders.availableFolders);
          break;
        } catch (err: any) {
          const isRetryable =
            err.message?.includes('429') ||
            err.message?.includes('503') ||
            err.message?.includes('timeout') ||
            err.message?.includes('fetch failed');

          if (isRetryable && attempts < 3) {
            addLog(`Transient error (${err.message?.slice(0, 20)}...), retrying in ${delays[attempts] / 1000}s...`, LogLevel.WARN, file.name);
            await new Promise(r => setTimeout(r, delays[attempts]));
            attempts++;
          } else {
            throw err;
          }
        }
      }

      // Parse Result: "NewName___Folder"
      if (!rawResult.includes('___')) {
        addLog(`Bad format from AI, attempting repair...`, LogLevel.WARN, file.name);
        rawResult = await gemini.current.repairOutput(rawResult, folders.availableFolders);
      }

      const [newName, targetFolder] = rawResult.split('___').map(s => s.trim());

      if (!newName || !targetFolder || !folders.availableFolders.includes(targetFolder)) {
        return { success: false, code: ErrorCodes.BADOUT, reason: `AI returned invalid folder: ${targetFolder}` };
      }

      // Late stop check before mutation
      if (stopSignal.current) {
        return { success: false, code: ErrorCodes.STOPPED, reason: 'Stop requested by user' };
      }

      // Move File (Copy then Delete)
      const targetDirHandle = await folders.resultHandle!.getDirectoryHandle(targetFolder);
      const newFileHandle = await targetDirHandle.getFileHandle(`${newName}${ext}`, { create: true });
      const writable = await (newFileHandle as any).createWritable();
      await writable.write(await file.arrayBuffer());
      await writable.close();

      await (folders.inputHandle as any).removeEntry(file.name);

      return { success: true, target: `${targetFolder}/${newName}${ext}` };

    } catch (e: any) {
      console.error(e);
      return { success: false, code: ErrorCodes.API, reason: e.message || 'API Error' };
    }
  };

  const startRun = async () => {
    if (!folders.inputHandle || !folders.resultHandle) {
      addLog('Please select both Input and Result folders first', LogLevel.ERROR);
      return;
    }

    setIsProcessing(true);
    stopRequested.current = false;

    // Scan files
    const filesToProcess: FileSystemFileHandle[] = [];
    for await (const entry of folders.inputHandle.values()) {
      if (entry.kind === 'file') {
        filesToProcess.push(entry as FileSystemFileHandle);
      }
    }

    setStats({ total: filesToProcess.length, done: 0, failed: 0, currentFile: null });
    addLog(`Starting run: ${filesToProcess.length} files found.`, LogLevel.INFO);

    for (const fileHandle of filesToProcess) {
      if (stopRequested.current) {
        addLog('Stop requested by user.', LogLevel.WARN);
        break;
      }

      setStats(prev => ({ ...prev, currentFile: fileHandle.name }));

      const result = await processFile(fileHandle, stopRequested);

      if (result.success) {
        addLog(`Success! Moved to ${result.target}`, LogLevel.SUCCESS, fileHandle.name);
        setStats(prev => ({ ...prev, done: prev.done + 1 }));
      } else {
        const errorCode = (result as any).code || 'E_CRASH';
        addLog(`Failed: ${result.reason}`, LogLevel.ERROR, fileHandle.name, errorCode);

        // Quarantine logic
        try {
          const file = await fileHandle.getFile();
          const failName = `FAILED__${errorCode}__${file.name}`;
          const revDir = await folders.resultHandle.getDirectoryHandle('DaRevisionare');
          const newFile = await revDir.getFileHandle(failName, { create: true });
          const writable = await (newFile as any).createWritable();
          await writable.write(await file.arrayBuffer());
          await writable.close();
          await (folders.inputHandle as any).removeEntry(file.name);
          addLog(`Quarantined to DaRevisionare`, LogLevel.WARN, fileHandle.name);
        } catch (moveErr) {
          addLog(`Quarantine failed: ${moveErr}`, LogLevel.ERROR, fileHandle.name);
        }

        setStats(prev => ({ ...prev, failed: prev.failed + 1 }));
      }
    }

    setIsProcessing(false);
    setStats(prev => ({ ...prev, currentFile: null }));
    addLog('Run completed.', LogLevel.SUCCESS);
  };

  const stopRun = () => {
    stopRequested.current = true;
  };

  const clearLogs = () => setLogs([]);
  const downloadLogs = () => {
    const text = logs.map(l => `[${l.timestamp.toISOString()}] ${l.level.toUpperCase()} ${l.fileName ? `(${l.fileName})` : ''} ${l.message}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `organizer-log-${new Date().getTime()}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <header className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
            <FolderPlus size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Folder Organizer</h1>
            <p className="text-slate-500 text-sm">Automated local file classification</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-semibold text-slate-600 uppercase">Gemini Powered</span>
        </div>
      </header>

      {/* Main Control Area */}
      <div className="w-full grid md:grid-cols-3 gap-6">
        {/* Sidebar Controls */}
        <div className="space-y-4">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-4 bg-indigo-600 rounded-full"></span>
              Setup
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Input Source</label>
                <button
                  onClick={handlePickInput}
                  disabled={isProcessing}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${folders.inputHandle
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-indigo-300'
                    }`}
                >
                  <Folder size={18} />
                  <span className="text-sm font-medium truncate">
                    {folders.inputHandle ? folders.inputHandle.name : 'Choose folder...'}
                  </span>
                  {folders.inputHandle && <CheckCircle size={16} className="ml-auto" />}
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Result Destination</label>
                <button
                  onClick={handlePickResult}
                  disabled={isProcessing}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${folders.resultHandle
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-indigo-300'
                    }`}
                >
                  <FolderPlus size={18} />
                  <span className="text-sm font-medium truncate">
                    {folders.resultHandle ? folders.resultHandle.name : 'Choose folder...'}
                  </span>
                  {folders.resultHandle && <CheckCircle size={16} className="ml-auto" />}
                </button>
              </div>

              {folders.resultHandle && (
                <div className="pt-2">
                  <p className="text-[10px] text-slate-400 font-medium uppercase mb-2">Available Categories</p>
                  <div className="flex flex-wrap gap-1.5">
                    {folders.availableFolders.map(f => (
                      <span key={f} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium border border-slate-200">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 flex gap-3">
              {!isProcessing ? (
                <button
                  onClick={startRun}
                  disabled={!folders.inputHandle || !folders.resultHandle}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                >
                  <Play size={18} />
                  Start Run
                </button>
              ) : (
                <button
                  onClick={stopRun}
                  className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2"
                >
                  <CircleStop size={18} />
                  Stop Run
                </button>
              )}
            </div>
          </section>

          {/* Key Indicators */}
          <section className="bg-slate-800 p-6 rounded-2xl shadow-xl text-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Progress Stats</span>
              <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-indigo-300 font-bold">LIVE</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stats.done}<span className="text-slate-500 text-lg">/{stats.total}</span></p>
                <p className="text-[10px] text-slate-400 font-medium uppercase">Processed</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-rose-400">{stats.failed}</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase">Quarantined</p>
              </div>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${stats.total > 0 ? (stats.done / stats.total) * 100 : 0}%` }}
              ></div>
            </div>
          </section>
        </div>

        {/* Console / Output Area */}
        <div className="md:col-span-2 space-y-4">
          {stats.currentFile && (
            <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center animate-pulse">
                <Search size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Processing now</p>
                <p className="text-sm font-semibold text-slate-700 truncate">{stats.currentFile}</p>
              </div>
              <div className="text-indigo-200">
                <ChevronRight size={20} className="animate-bounce-x" />
              </div>
            </div>
          )}

          <LogPanel
            logs={logs}
            onClear={clearLogs}
            onDownload={downloadLogs}
          />
        </div>
      </div>

      <footer className="w-full text-center text-slate-400 text-xs font-medium py-8 border-t border-slate-200">
        &copy; {new Date().getFullYear()} Senior AI Folder Organizer &bull; Powered by Gemini 2.0 Flash &bull; 100% Local Logic
      </footer>

      <style>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;
