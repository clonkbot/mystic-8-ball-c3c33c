import { useRef, useEffect } from 'react';

interface MagicBallProps {
  fortune: string | null;
  isShaking: boolean;
  onShake: () => void;
  disabled: boolean;
}

export default function MagicBall({ fortune, isShaking, onShake, disabled }: MagicBallProps) {
  const ballRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isShaking && ballRef.current) {
      ballRef.current.style.animation = 'shake 0.5s ease-in-out 3';
    } else if (ballRef.current) {
      ballRef.current.style.animation = '';
    }
  }, [isShaking]);

  return (
    <button
      ref={ballRef}
      onClick={onShake}
      disabled={disabled || isShaking}
      className={`relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full cursor-pointer transition-all duration-300 group focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/50 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
      }`}
      aria-label="Shake the magic 8 ball"
    >
      {/* Outer glow on hover */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 to-cyan-500/40 blur-xl transition-opacity duration-500 ${disabled ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`} />

      {/* Main ball body - glossy black sphere */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 via-black to-gray-900 shadow-2xl">
        {/* Highlight reflection */}
        <div className="absolute top-4 left-6 sm:top-6 sm:left-8 w-16 h-12 sm:w-20 sm:h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-md transform -rotate-45" />

        {/* Secondary reflection */}
        <div className="absolute top-8 left-10 sm:top-12 sm:left-14 w-6 h-4 sm:w-8 sm:h-6 bg-white/30 rounded-full blur-sm transform -rotate-45" />

        {/* Inner sphere shadow */}
        <div className="absolute inset-4 sm:inset-6 rounded-full bg-gradient-to-br from-transparent via-transparent to-black/50" />
      </div>

      {/* The "8" on top - visible when no fortune */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${fortune || isShaking ? 'opacity-0' : 'opacity-100'}`}>
        <span className="font-display text-5xl sm:text-6xl md:text-7xl text-white/20 select-none">8</span>
      </div>

      {/* Inner mystical window */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
        {/* Blue liquid background */}
        <div className={`absolute inset-0 rounded-full overflow-hidden ${isShaking ? 'animate-liquid-shake' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-950 to-indigo-950">
            {/* Swirling liquid effect */}
            <div className={`absolute inset-0 bg-gradient-conic from-blue-800/50 via-indigo-900/30 to-blue-800/50 ${isShaking ? 'animate-spin' : ''}`} style={{ animationDuration: '1s' }} />
          </div>

          {/* Inner shadow for depth */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] rounded-full" />
        </div>

        {/* Triangle with fortune text */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${fortune ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          {/* Triangle shape */}
          <div className="relative">
            <svg viewBox="0 0 100 87" className="w-14 h-12 sm:w-16 sm:h-14 md:w-20 md:h-16">
              <defs>
                <linearGradient id="triangleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e1b4b" />
                  <stop offset="100%" stopColor="#0f0a1e" />
                </linearGradient>
              </defs>
              <polygon
                points="50,0 100,87 0,87"
                fill="url(#triangleGrad)"
                stroke="rgba(139, 92, 246, 0.3)"
                strokeWidth="1"
              />
            </svg>

            {/* Fortune text */}
            <div className="absolute inset-0 flex items-center justify-center pt-3 sm:pt-4">
              <span className="font-body text-[8px] sm:text-[9px] md:text-[10px] text-cyan-200 text-center leading-tight px-1 uppercase tracking-wide max-w-[50px] sm:max-w-[60px] md:max-w-[70px]">
                {fortune}
              </span>
            </div>
          </div>
        </div>

        {/* Shaking indicator */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isShaking ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-cyan-400/50 animate-ping" />
        </div>
      </div>

      {/* Bottom rim reflection */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-4 sm:h-6 bg-gradient-to-t from-white/5 to-transparent rounded-full blur-sm" />

      {/* CSS Keyframes via style tag */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          25% { transform: rotate(-10deg) translateX(-5px); }
          50% { transform: rotate(10deg) translateX(5px); }
          75% { transform: rotate(-5deg) translateX(-3px); }
        }

        @keyframes liquid-shake {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-3px) rotate(2deg); }
          50% { transform: translateY(2px) rotate(-2deg); }
          75% { transform: translateY(-2px) rotate(1deg); }
        }

        .animate-liquid-shake {
          animation: liquid-shake 0.3s ease-in-out infinite;
        }

        .bg-gradient-conic {
          background: conic-gradient(from 0deg, var(--tw-gradient-stops));
        }
      `}</style>
    </button>
  );
}
