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
        <div className="space-y-3">
          <p className="text-emerald-400 font-bold">Synchronizacja: {progress}%</p>
          <p className="text-zinc-400 text-sm">Generowanie mocy sukcesu na rok 2026...</p>
        </div>
      )}
    </div>
  );
};

export default SystemActivation;
