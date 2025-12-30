import React, { useState, useEffect } from 'react';
import { AppStep } from './types';
import { CLASS_NAME, SCHOOL_NAME, YEAR, WISH_CATEGORIES, TEACHER_NAME } from './constants';
// Import bezpośredni (pliki luzem w głównym folderze)
import SystemActivation from './SystemActivation';

// --- FUNKCJA GENERUJĄCA ŻYCZENIA (ZINTEGROWANA) ---
async function generatePersonalizedPoem() {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    
    // Jeśli brak klucza, od razu rzucamy błąd, by przejść do treści zapasowej
    if (!apiKey) {
       console.warn("Brak klucza API (VITE_GEMINI_API_KEY). Używam trybu offline.");
       throw new Error("Missing API Key");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            role: "user", 
            parts: [{ 
              text: "Napisz krótkie (4-6 wersów), profesjonalne i szczerze ciepłe życzenia noworoczne 2026 od wychowawcy Wojciecha Borkowego dla klasy 4 Technikum Ochrony Środowiska (Tychy ZS1).\n\n" +
                    "WYTYCZNE:\n" +
                    "1. ZERO patosu. Konkretny, męski styl.\n" +
                    "2. Motyw przewodni: Turbiny wiatrowe jako symbol energii i skuteczności, nie ekologii.\n" +
                    "3. Wartości: Rzetelna wiedza, stabilizacja, zdrowie.\n" +
                    "4. Brak gwiazdek (*), brak markdownu, brak podpisu." 
            }] 
          }]
        })
      }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    return text
      .replace(/\*/g, '')
      .replace(/Z poważaniem.*/is, '')
      .replace(/Wojciech Borkowy.*/is, '')
      .trim();

  } catch (error) {
    console.error("Gemini API Error / Fallback Mode:", error);
    // Treść zapasowa - poprawiona literówka (usunięty przecinek po 'aby')
    return "Na kolejny rok życzę Wam aby\nwasza wiedza i kompetencje stały się napędem,\nktóry jak sprawna turbina, pozwoli Wam realizować każdy ambitny plan.\nNiech zdrowie i wsparcie najbliższych będą stabilnym fundamentem,\na rok 2026 przyniesie konkretne sukcesy, z których będziecie dumni.";
  }
}

// --- GŁÓWNY KOMPONENT ---
const App: React.FC = () => {
  const [step, setStep] = useState(AppStep.INTRO);
  const [poem, setPoem] = useState("");

  useEffect(() => {
    generatePersonalizedPoem().then(setPoem);
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-emerald-500/30 overflow-hidden flex flex-col items-center justify-center relative">
      
      {/* Tło techniczne */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Światła ambientowe */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-900/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-zinc-800/20 blur-[100px] rounded-full"></div>

      {step === AppStep.INTRO && (
        <div className="z-10 text-center animate-in fade-in zoom-in duration-1000">
          {/* NOWY NAGŁÓWEK */}
          <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-6">
            Życzenia na nowy rok od wychowawcy Wojciecha Borkowego
          </p>

          <p className="text-zinc-500 text-xs tracking-[0.5em] mb-4 uppercase">Zespół {CLASS_NAME}</p>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2">
            Kierunek <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-700">{YEAR}</span>
          </h1>
          <div className="h-px w-32 bg-emerald-900 mx-auto my-8"></div>
          
          <button 
            onClick={() => setStep(AppStep.WELCOME)}
            className="px-14 py-5 bg-zinc-900 border border-zinc-800 rounded-2xl text-[0.7rem] font-bold uppercase tracking-[0.4em] hover:bg-emerald-500 hover:text-black transition-all duration-500 shadow-2xl active:scale-95 text-white"
          >
            Dostęp do Wiadomości
          </button>
        </div>
      )}

      {step === AppStep.WELCOME && (
        <div className="z-10 max-w-2xl text-center px-6 animate-in slide-in-from-bottom-10 fade-in duration-700">
          <div className="mb-8 inline-block px-4 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-[0.6rem] tracking-widest text-emerald-500">
            {SCHOOL_NAME}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Specjaliści <br/>
            <span className="text-emerald-500">Ochrony Środowiska</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-10 font-light">
            Kończycie ważny etap. Czas na przełożenie technicznej wiedzy na realne osiągnięcia.
          </p>
          
          <button 
            onClick={() => setStep(AppStep.ACTIVATE)}
            className="px-16 py-7 bg-emerald-600 text-white rounded-3xl font-black text-sm uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all active:scale-95 shadow-xl"
          >
            Generuj Raport {YEAR}
          </button>
        </div>
      )}

      {step === AppStep.ACTIVATE && (
        <SystemActivation onComplete={() => setStep(AppStep.WISHES)} />
      )}

      {step === AppStep.WISHES && (
        <div className="z-10 w-full max-w-4xl px-4 py-8 md:py-12 animate-in zoom-in-95 fade-in duration-1000 flex flex-col items-center">
          
          <div className="w-full bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden mb-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-zinc-800 pb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{TEACHER_NAME}</h3>
                <p className="text-emerald-500 text-xs uppercase tracking-widest">Wychowawca</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-zinc-500 text-xs uppercase tracking-widest">Klasa {CLASS_NAME} • Rok {YEAR}</p>
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <p className="text-xl md:text-2xl leading-relaxed text-zinc-100 font-medium whitespace-pre-line">
                {poem || "Synchronizacja..."}
              </p>
            </div>

            <div className="flex items-center justify-between text-[0.6rem] text-zinc-600 uppercase tracking-widest font-bold">
              <span>Wiadomość zweryfikowana rzetelnie</span>
              <span>{SCHOOL_NAME} | Branża Środowiskowa</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-12">
            {WISH_CATEGORIES.map((cat, i) => (
              <div key={i} className={`p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/40 hover:bg-zinc-800/60 transition-colors group`}>
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-full ${cat.color} flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <h4 className="font-bold text-zinc-200">{cat.title}</h4>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed pl-14">
                  {cat.message}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <p className="text-emerald-500/50 text-[0.6rem] tracking-[0.5em] uppercase mb-4">Status: Gotowość do działania</p>
            <h2 className="text-3xl font-black text-white tracking-tighter">Solidne fundamenty na rok {YEAR}</h2>
          </div>

          <button onClick={() => window.location.reload()} className="relative z-10 px-10 py-4 rounded-xl bg-zinc-950 text-[0.7rem] font-black text-zinc-500 hover:text-emerald-400 transition-all uppercase tracking-[0.3em] border border-zinc-800 active:scale-95">
            Odśwież 🔄
          </button>

        </div>
      )}
    </div>
  );
};

export default App;
