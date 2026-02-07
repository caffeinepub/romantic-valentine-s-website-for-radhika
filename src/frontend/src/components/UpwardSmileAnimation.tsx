import { useEffect, useState } from 'react';

interface UpwardSmileAnimationProps {
  show: boolean;
}

interface Smile {
  id: number;
  x: number;
  delay: number;
}

/**
 * Celebration animation component that displays multiple smiling emojis
 * rising upward from the bottom of the screen with varied timings and positions
 * when the user clicks "Yes".
 */
export default function UpwardSmileAnimation({ show }: UpwardSmileAnimationProps) {
  const [smiles, setSmiles] = useState<Smile[]>([]);

  useEffect(() => {
    if (show) {
      // Generate multiple smiling emojis at random positions
      const newSmiles = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i, // Unique ID to avoid conflicts on retrigger
        x: Math.random() * 90 + 5, // Random x position between 5% and 95%
        delay: Math.random() * 0.8, // Random delay up to 0.8s
      }));
      setSmiles(newSmiles);

      // Clear smiles after animation completes
      const timer = setTimeout(() => {
        setSmiles([]);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show || smiles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {smiles.map((smile) => (
        <div
          key={smile.id}
          className="absolute animate-smile-rise"
          style={{
            left: `${smile.x}%`,
            bottom: '-10%',
            animationDelay: `${smile.delay}s`,
          }}
        >
          <img
            src="/assets/generated/smiling-emoji-transparent.dim_100x100.png"
            alt="Smiling emoji"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
          />
        </div>
      ))}
    </div>
  );
}
