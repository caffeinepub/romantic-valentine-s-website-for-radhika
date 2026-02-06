import { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getDefaultName } from '@/utils/personalization';

interface ValentineCardProps {
  onYesClick: () => void;
  showCelebration: boolean;
  recipientName?: string;
}

export default function ValentineCard({ onYesClick, showCelebration, recipientName = getDefaultName() }: ValentineCardProps) {
  const [showResponse, setShowResponse] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonMoving, setIsNoButtonMoving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const noMessages = [
    "No",
    "Really?",
    "You Sure?",
    "No Escape!",
    "You can't escape love 💘",
    "Love always wins 💕",
    "Keep trying 🤭",
    "Seriously? 🤨",
    "Still no? Really? 😂",
    "Nope, not happening 🙅",
    "Try again!"
  ];

  useEffect(() => {
    // Initialize button position to center
    if (containerRef.current && noButtonRef.current && !isNoButtonMoving) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = noButtonRef.current.getBoundingClientRect();
      
      // Center the button initially
      setNoButtonPosition({
        x: (containerRect.width - buttonRect.width) / 2,
        y: 0
      });
    }
  }, [isNoButtonMoving]);

  const handleNoClick = () => {
    setNoClickCount((prev) => (prev + 1) % noMessages.length);
    setIsNoButtonMoving(true);

    // Calculate new random position
    if (containerRef.current && noButtonRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = noButtonRef.current.getBoundingClientRect();
      
      // Calculate safe boundaries
      const padding = 20;
      const maxX = containerRect.width - buttonRect.width - padding;
      const maxY = containerRect.height - buttonRect.height - padding;
      const minX = padding;
      const minY = -100;
      
      // Generate random position
      const newX = Math.random() * (maxX - minX) + minX;
      const newY = Math.random() * (maxY - minY) + minY;
      
      setNoButtonPosition({ x: newX, y: newY });
    }
  };

  const handleYesClickInternal = () => {
    setShowResponse(true);
    onYesClick();
  };

  if (showResponse) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-white/95 dark:bg-black/50 backdrop-blur-xl shadow-2xl border-2 border-rose-200 dark:border-rose-800 animate-scale-in">
        <CardContent className="p-6 sm:p-10 md:p-14 text-center space-y-6 sm:space-y-8 md:space-y-10">
          <div className="flex justify-center">
            <div className="relative">
              {showCelebration ? (
                <img 
                  src="/assets/kissing-couple.dim_800x600.png" 
                  alt="Kissing couple" 
                  className="w-56 h-42 sm:w-72 sm:h-54 md:w-80 md:h-60 object-cover rounded-lg shadow-2xl animate-scale-in"
                />
              ) : (
                <>
                  <Heart className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 text-rose-500 fill-rose-500 animate-heartbeat" />
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-glow">
              Yay! 💕
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl text-rose-600 dark:text-rose-400 font-semibold">
              I knew you'd say yes!
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-lg mx-auto leading-relaxed px-4 break-words">
              You've made me the happiest person alive, {recipientName}. 
              This Valentine's Day is going to be absolutely magical with you! ✨
            </p>
          </div>

          <div className="pt-6 sm:pt-8">
            <div className="inline-block px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full shadow-lg">
              <p className="text-white font-semibold text-lg sm:text-xl md:text-2xl">
                Can't wait to celebrate with you! 🎉
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/95 dark:bg-black/50 backdrop-blur-xl shadow-2xl border-2 border-rose-200 dark:border-rose-800 relative overflow-visible">
      {/* Decorative border image */}
      <div className="absolute top-0 left-0 right-0 h-20 sm:h-24 md:h-28 opacity-50">
        <img 
          src="/assets/generated/romantic-border-transparent.dim_800x200.png" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="p-6 sm:p-10 md:p-14 text-center space-y-6 sm:space-y-8 md:space-y-10 relative z-10">
        {/* Header with recipient name centered between pink hearts */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          <img 
            src="/assets/generated/pink-heart-left.dim_80x80.png" 
            alt="" 
            className="h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 animate-pulse flex-shrink-0"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-glow break-words max-w-full px-2">
            {recipientName}
          </h1>
          <img 
            src="/assets/generated/pink-heart-left.dim_80x80.png" 
            alt="" 
            className="h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 animate-pulse flex-shrink-0"
            style={{ animationDelay: '0.5s' }}
          />
        </div>

        {/* Main question */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 py-6 sm:py-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 leading-tight px-2">
            Will you be my Valentine?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-md mx-auto px-4 leading-relaxed">
            I promise to make this Valentine's Day unforgettable, filled with love, laughter, and endless joy! 💖
          </p>
        </div>

        {/* Interactive buttons container */}
        <div 
          ref={containerRef}
          className="relative pt-6 sm:pt-8 min-h-[160px] sm:min-h-[180px] md:min-h-[200px]"
        >
          {/* Yes button - static position */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <Button
              onClick={handleYesClickInternal}
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-6 sm:px-10 sm:py-7 md:px-12 md:py-8 text-lg sm:text-xl md:text-2xl touch-manipulation"
            >
              <Heart className="mr-2 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 fill-white" />
              Yes! Of course! 💕
            </Button>
          </div>

          {/* No button - dynamic position */}
          <div className="relative w-full h-28 sm:h-32 md:h-36">
            <Button
              ref={noButtonRef}
              onClick={handleNoClick}
              variant="outline"
              className="absolute border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 ease-out px-8 py-6 sm:px-10 sm:py-7 md:px-12 md:py-8 text-lg sm:text-xl md:text-2xl whitespace-nowrap touch-manipulation"
              style={{
                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                left: isNoButtonMoving ? 0 : '50%',
                top: 0,
                marginLeft: isNoButtonMoving ? 0 : '-50%',
              }}
            >
              {noMessages[noClickCount]}
            </Button>
          </div>
        </div>

        {/* Romantic quote - repositioned lower for cleaner and more elegant appearance */}
        <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-4">
          <p className="text-base sm:text-lg md:text-xl text-pink-400 dark:text-pink-300 italic font-medium max-w-lg mx-auto px-4 leading-relaxed">
            "Every moment with you feels like a dream come true..."
          </p>
          
          {/* Three decorative stars below the quote */}
          <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-5 md:mt-6">
            <span 
              className="text-2xl sm:text-3xl md:text-4xl text-pink-400 dark:text-pink-300 animate-shimmer"
              style={{ animationDelay: '0s' }}
            >
              ✨
            </span>
            <span 
              className="text-2xl sm:text-3xl md:text-4xl text-pink-400 dark:text-pink-300 animate-shimmer"
              style={{ animationDelay: '0.3s' }}
            >
              ✨
            </span>
            <span 
              className="text-2xl sm:text-3xl md:text-4xl text-pink-400 dark:text-pink-300 animate-shimmer"
              style={{ animationDelay: '0.6s' }}
            >
              ✨
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
