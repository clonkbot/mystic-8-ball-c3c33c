import { useState, useCallback } from 'react';
import MagicBall from './components/MagicBall';
import StarField from './components/StarField';

const fortunes = [
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful"
];

function App() {
  const [fortune, setFortune] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [question, setQuestion] = useState('');

  const shakeBall = useCallback(() => {
    if (isShaking) return;

    setIsShaking(true);
    setFortune(null);

    setTimeout(() => {
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setFortune(randomFortune);
      setIsShaking(false);
    }, 1500);
  }, [isShaking]);

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0f] relative overflow-hidden flex flex-col">
      {/* Animated star field background */}
      <StarField />

      {/* Mystical gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-cyan-900/10 pointer-events-none" />

      {/* Radial glow behind the ball */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main content */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-4 py-8 md:py-12">
        {/* Title */}
        <header className="text-center mb-6 md:mb-10">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-cyan-200 to-purple-300 tracking-wider mb-2 md:mb-3 animate-shimmer">
            MYSTIC 8
          </h1>
          <p className="font-body text-purple-300/60 text-sm md:text-base tracking-[0.3em] uppercase">
            Peer into the void
          </p>
        </header>

        {/* Question input */}
        <div className="w-full max-w-md mb-6 md:mb-8 px-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask the orb your question..."
            className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 md:py-4 text-purple-100 placeholder-purple-400/40 font-body text-base md:text-lg focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
            onKeyDown={(e) => e.key === 'Enter' && question.trim() && shakeBall()}
          />
        </div>

        {/* The Magic 8 Ball */}
        <MagicBall
          fortune={fortune}
          isShaking={isShaking}
          onShake={shakeBall}
          disabled={!question.trim()}
        />

        {/* Instruction text */}
        <p className="mt-6 md:mt-8 font-body text-purple-400/50 text-xs md:text-sm tracking-wide animate-pulse">
          {question.trim() ? 'Click the orb to reveal your fate' : 'Enter your question above'}
        </p>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-4 md:pb-6 text-center">
        <p className="font-body text-purple-500/40 text-[10px] md:text-xs tracking-wide">
          Requested by @BiggeeSmols · Built by @clonkbot
        </p>
      </footer>
    </div>
  );
}

export default App;
