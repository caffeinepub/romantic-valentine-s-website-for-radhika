import { useEffect, useState } from 'react';

interface SmilingEmojiAnimationProps {
  show: boolean;
}

export default function SmilingEmojiAnimation({ show }: SmilingEmojiAnimationProps) {
  const [emojis, setEmojis] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    if (show) {
      // Generate multiple smiling emojis at random positions
      const newEmojis = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 80 + 10, // Random x position between 10% and 90%
        delay: Math.random() * 0.5, // Random delay up to 0.5s
      }));
      setEmojis(newEmojis);

      // Clear emojis after animation completes
      const timer = setTimeout(() => {
        setEmojis([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show || emojis.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute animate-emoji-bounce"
          style={{
            left: `${emoji.x}%`,
            bottom: '-10%',
            animationDelay: `${emoji.delay}s`,
          }}
        >
          <img
            src="/assets/generated/smiling-emoji-transparent.dim_100x100.png"
            alt="Smiling emoji"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          />
        </div>
      ))}
    </div>
  );
}
