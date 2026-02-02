import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
  opacity: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate random hearts with varied opacity and size
    const newHearts: Heart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 10,
      size: 30 + Math.random() * 40,
      delay: Math.random() * 8,
      opacity: 0.3 + Math.random() * 0.5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.left}%`,
            bottom: '-100px',
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `${heart.delay}s`,
            animationIterationCount: 'infinite',
            opacity: heart.opacity,
          }}
        >
          <img
            src="/assets/generated/floating-heart-transparent.dim_64x64.png"
            alt=""
            className="drop-shadow-lg"
            style={{
              width: `${heart.size}px`,
              height: `${heart.size}px`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
