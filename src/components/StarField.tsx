import { useMemo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function StarField() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.id % 3 === 0 ? 'rgba(168, 85, 247, 0.6)' :
                            star.id % 3 === 1 ? 'rgba(34, 211, 238, 0.5)' :
                            'rgba(255, 255, 255, 0.5)',
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            boxShadow: `0 0 ${star.size * 2}px ${
              star.id % 3 === 0 ? 'rgba(168, 85, 247, 0.4)' :
              star.id % 3 === 1 ? 'rgba(34, 211, 238, 0.3)' :
              'rgba(255, 255, 255, 0.3)'
            }`,
          }}
        />
      ))}

      {/* Larger mystical orbs floating slowly */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full animate-float opacity-20"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + (i % 3) * 30}%`,
            width: `${40 + i * 10}px`,
            height: `${40 + i * 10}px`,
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? 'rgba(168, 85, 247, 0.3)' : 'rgba(34, 211, 238, 0.2)'
            } 0%, transparent 70%)`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${8 + i * 2}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
