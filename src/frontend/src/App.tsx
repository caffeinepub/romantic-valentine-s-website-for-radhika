import { useState, useEffect } from 'react';
import FloatingHearts from '@/components/FloatingHearts';
import ValentineCard from '@/components/ValentineCard';
import CelebrationHearts from '@/components/CelebrationHearts';
import SmilingEmojiAnimation from '@/components/SmilingEmojiAnimation';

function App() {
  const [showCard, setShowCard] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Fade in the card after a short delay
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleYesClick = () => {
    setShowCelebration(true);
  };

  return (
    <div className="min-h-screen w-full overflow-y-auto overflow-x-hidden">
      {/* Romantic gradient background - fixed */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: 'url(/assets/generated/romantic-gradient-bg.dim_1920x1080.png)',
        }}
      />

      {/* Floating hearts animation - fixed */}
      <FloatingHearts />

      {/* Celebration effects - fixed */}
      {showCelebration && <CelebrationHearts />}
      <SmilingEmojiAnimation show={showCelebration} />

      {/* Main scrollable content container */}
      <main className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 py-12 sm:py-16 md:py-20">
        <div
          className={`transition-all duration-1000 transform w-full ${
            showCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <ValentineCard onYesClick={handleYesClick} showCelebration={showCelebration} />
        </div>
      </main>
    </div>
  );
}

export default App;
