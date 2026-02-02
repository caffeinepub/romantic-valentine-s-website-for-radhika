import { useEffect, useState } from 'react';

interface CelebrationHeart {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
}

export default function CelebrationHearts() {
  const [hearts, setHearts] = useState<CelebrationHeart[]>([]);

  useEffect(() => {
    // Generate hearts that rise from the bottom
    const newHearts: CelebrationHeart[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 3 + Math.random() * 2,
      size: 40 + Math.random() * 30,
      delay: Math.random() * 2,
    }));
    setHearts(newHearts);

    // Remove hearts after animation completes
    const timer = setTimeout(() => {
      setHearts([]);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[12]">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-celebration-rise"
          style={{
            left: `${heart.left}%`,
            bottom: '-100px',
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `${heart.delay}s`,
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
