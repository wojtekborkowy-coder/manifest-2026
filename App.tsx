import React, { useState, useEffect } from 'react';
import { AppStep } from './types';
import { CLASS_NAME, SCHOOL_NAME, YEAR, WISH_CATEGORIES, TEACHER_NAME } from './constants';
import SystemActivation from './components/SystemActivation';
import { generatePersonalizedPoem } from './geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.INTRO);
  const [poem, setPoem] = useState<string>("");

  useEffect(() => {
    generatePersonalizedPoem().then(setPoem);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-emerald-500/30 flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans">
      
      {/* Tło techniczne */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

      {/* Światła ambientowe */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-zinc-900/20 rounded-full blur-[140px] animate-pulse delay-700"></div>
      </div>

      {step === AppStep.INTRO && (
        <div className="text-center space-y-12 z-10 animate-in fade-in duration-1000 slide-in-from-bottom-8">
          <div className="space-y-6">
            <h2 className="text-xs md:text-sm font-bold tracking-[0.9em] text-zinc-600 uppercase">Zespół {CLASS_NAME}</h2>
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">
              Kierunek <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-200">
                {YEAR}
              </span>
            </h1>
            <div className="h-[2px] w-12 bg-emerald-500/40 mx-auto mt-10"></div>
          </div>
          <button 
            onClick={() => setStep(AppStep.WELCOME)}
            className="px-14 py-5 bg-zinc-900 border border-zinc-800 rounded-2xl text-[0.7rem] font-bold uppercase tracking-[0.4em] hover:bg-emerald-500 hover:text-black transition-all duration-500 shadow-2xl active:scale-95 text-white"
          >
            Dostęp do Wiadomości
          </button>
        </div>
      )}

      {step === AppStep.WELCOME && (
        <div className="text-center space-y-12 max-w-3xl z-10 animate-in fade-in zoom-in duration-700">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-zinc-900/80 border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[0.6rem] font-black text-zinc-400 uppercase tracking-[0.4em]">{SCHOOL_NAME}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight uppercase italic text-white px-4">
              Specjaliści <br/>
              <span className="text-emerald-500">Ochrony Środowiska</span>
            </h1>
            
            <p className="text-zinc-500 font-medium max-w-md mx-auto leading-relaxed text-sm pt-4 border-t border-zinc-900/50">
              Kończycie ważny etap. Czas na przełożenie technicznej wiedzy na realne osiągnięcia.
            </p>
          </div>
          
          <button 
              onClick={() => setStep(AppStep.ACTIVATE)}
              className="px-16 py-7 bg-emerald-600 text-white rounded-3xl font-black text-sm uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all active:scale-95 shadow-xl"
          >
              Generuj Raport {YEAR}
          </button>
        </div>
      )}

      {step === AppStep.ACTIVATE && <SystemActivation onComplete={() => setStep(AppStep.WISHES)} />}

      {step === AppStep.WISHES && (
        <div className="max-w-6xl w-full py-8 z-10 space-y-16 animate-in slide-in-from-bottom-12 duration-1000 h-full overflow-y-auto no-scrollbar pb-32 px-4">
          <header className="text-center space-y-6 relative py-12">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] opacity-[0.03] select-none pointer-events-none animate-spin-slow">🌍</div>
            <h2 className="text-6xl md:text-9xl font-black italic text-white tracking-tighter uppercase leading-none">
              Przesłanie
            </h2>
            <div className="flex items-center justify-center gap-6 text-emerald-500 text-[0.7rem] font-black uppercase tracking-[0.6em]">
              <span>Kompetencje</span>
              <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
              <span>Wartości</span>
              <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
              <span>Konkret</span>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-8 bg-zinc-900/40 backdrop-blur-3xl border border-zinc-800/50 p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                <div className="absolute -bottom-10 -right-10 text-[18rem] opacity-[0.01] pointer-events-none">🌍</div>
                
                <div className="space-y-14 relative z-10">
                    <div className="flex items-center gap-8">
                        <div className="w-24 h-24 rounded-[2rem] bg-zinc-800 border border-zinc-700 overflow-hidden p-1 shadow-2xl">
                            <img src="https://picsum.photos/seed/tech/200/200" alt={TEACHER_NAME} className="w-full h-full object-cover rounded-[1.8rem] grayscale group-hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <div>
                          <p className="text-[0.65rem] font-black text-emerald-500 uppercase tracking-[0.3em] mb-1.5">{TEACHER_NAME}</p>
                          <p className="text-3xl font-black text-white italic tracking-tighter uppercase">Wychowawca</p>
                          <p className="text-[0.55rem] text-zinc-500 font-mono tracking-widest uppercase mt-1">Klasa {CLASS_NAME} • Rok {YEAR}</p>
                        </div>
                    </div>
                    
                    <div className="relative">
                      <p className="text-2xl md:text-4xl font-bold leading-[1.2] text-zinc-100 italic tracking-tight whitespace-pre-line border-l-[4px] border-emerald-500 pl-12 py-1">
                          {poem || "Synchronizacja..."}
                      </p>
                    </div>
                </div>
                
                <div className="pt-14 border-t border-zinc-800/30 mt-14 flex items-center justify-between opacity-70 group-hover:opacity-100 transition-opacity">
                    <div className="flex flex-col">
                      <span className="text-[0.6rem] text-zinc-500 font-black uppercase tracking-[0.3em]">Wiadomość zweryfikowana rzetelnie</span>
                      <span className="text-[0.55rem] text-emerald-500/60 font-mono mt-1.5">{SCHOOL_NAME} | Branża Środowiskowa</span>
                    </div>
                    <span className="text-4xl opacity-20 group-hover:opacity-100 transition-all">🌍</span>
                </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-1 gap-4">
                {WISH_CATEGORIES.map((cat, i) => (
                    <div key={i} className="bg-zinc-900/50 border border-zinc-800/50 p-8 rounded-[2rem] hover:border-emerald-500/40 transition-all group">
                        <div className="flex items-center gap-5 mb-4">
                            <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{cat.icon}</span>
                            <h3 className="text-[0.7rem] font-black text-white uppercase tracking-wider italic">{cat.title}</h3>
                        </div>
                        <p className="text-[0.75rem] text-zinc-400 leading-relaxed font-medium">
                            {cat.message}
                        </p>
                    </div>
                ))}
            </div>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/10 p-12 rounded-[3rem] flex items-center justify-between flex-wrap gap-10 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-3">
                <span className="text-[0.65rem] font-black text-emerald-400 uppercase tracking-[0.6em] block">Status: Gotowość do działania</span>
                <p className="text-zinc-200 text-2xl font-black uppercase italic tracking-tighter">Solidne fundamenty na rok {YEAR}</p>
              </div>
              <button onClick={() => window.location.reload()} className="relative z-10 px-10 py-4 rounded-xl bg-zinc-950 text-[0.7rem] font-black text-zinc-500 hover:text-emerald-400 transition-all uppercase tracking-[0.3em] border border-zinc-800 active:scale-95">
                Odśwież 🔄
              </button>
          </div>

          <footer className="text-center opacity-40 pt-12">
            <p className="text-[0.6rem] font-black uppercase tracking-[1.5em] text-zinc-600 mb-3">{SCHOOL_NAME} • {CLASS_NAME}</p>
            <p className="text-[0.5rem] font-mono text-zinc-800 tracking-[0.4em] uppercase">Rzetelność • Wiedza • Przyszłość</p>
          </footer>
        </div>
      )}
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;