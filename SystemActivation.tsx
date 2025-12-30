import React, { useEffect, useState } from 'react';

type Props = {
  onComplete: () => void;
};

const SystemActivation: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isActivating, setIsActivating] = useState(false);

  useEffect(() => {
    if (!isActivating) return;

    if (progress >= 100) {
      const done = setTimeout(onComplete, 800);
      return () => clearTimeout(done);
    }

    const timer = setTimeout(() => setProgress((p) => p + 1), 30);
    return () => clearTimeout(timer);
  }, [isActivating, progress, onComplete]);

  return (
    <div className="z-10 text-center animate-in fade-in zoom-in duration-700">
      <p className="text-zinc-500 text-xs tracking-[0.5em] mb-4 uppercase">
        Moduł Startowy
      </p>

      <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-8">
        Inicjacja Energii Sukcesu
      </h2>

      {!isActivating ? (
        <button
          onClick={() => setIsActivating(true)}
          className="group relative px-8 py-4 bg-white text-black rounded-xl font-black text-[0.7rem] uppercase tracking-widest hover:bg-emerald-500 transition-all active:scale-95 overflow-hidden"
        >
          Uruchom Turbinę Relacji
        </button>
      ) : (
        <div className="space-y-6 flex flex-col items-center">
            
            {/* EFEKT TURBINY (CSS SPINNER) */}
            <div className="relative w-32 h-32 my-4">
                {/* Zewnętrzny pierścień */}
                <div className="absolute inset-0 border-4 border-zinc-800/50 rounded-full"></div>
                
                {/* Kręcące się łopatki (zrobione z borderów) */}
                <div className="absolute inset-0 w-full h-full animate-spin duration-[2s] linear">
                   {/* To tworzy efekt ściętej turbiny */}
                    <div className="w-full h-full border-[10px] border-transparent border-t-emerald-500 border-r-emerald-500/20 rounded-full"></div>
                </div>
                
                {/* Środek turbiny z licznikiem */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-zinc-900 border border-emerald-500/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <span className="text-[0.7rem] font-bold text-emerald-500">{progress}%</span>
                </div>
            </div>

          <div>
             <p className="text-emerald-400 font-bold text-sm tracking-widest animate-pulse">ROZRUCH SYSTEMÓW</p>
             <p className="text-zinc-500 text-xs mt-2 uppercase tracking-wider">Generowanie mocy na rok 2026...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemActivation;
