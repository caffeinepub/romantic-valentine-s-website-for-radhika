import { useState, useEffect } from 'react';
import FloatingHearts from '@/components/FloatingHearts';
import ValentineCard from '@/components/ValentineCard';
import CelebrationHearts from '@/components/CelebrationHearts';
import SmilingEmojiAnimation from '@/components/SmilingEmojiAnimation';
import UpwardSmileAnimation from '@/components/UpwardSmileAnimation';
import MakeYourOwnCTA from '@/components/MakeYourOwnCTA';
import WishlinkToolPage from '@/pages/WishlinkToolPage';
import { getRecipientNameFromURL, getDefaultName, hasRecipientNameParamInURL } from '@/utils/personalization';
import { isToolRoute, navigateToMainExperience } from '@/utils/routing';

function App() {
  const [showCard, setShowCard] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [recipientName, setRecipientName] = useState<string>(getDefaultName());
  const [isPersonalizedLink, setIsPersonalizedLink] = useState<boolean>(false);
  
  // Initialize route immediately based on current URL
  const [currentRoute, setCurrentRoute] = useState<'valentine' | 'tool'>(() => {
    return isToolRoute() ? 'tool' : 'valentine';
  });

  useEffect(() => {
    // Get recipient name from URL
    const nameFromURL = getRecipientNameFromURL();
    setRecipientName(nameFromURL);

    // Check if this is a personalized link
    setIsPersonalizedLink(hasRecipientNameParamInURL());

    // Update document title
    document.title = `Romantic Valentine's Website for ${nameFromURL}`;

    // Fade in the card after a short delay (only for valentine route)
    if (currentRoute === 'valentine') {
      const timer = setTimeout(() => {
        setShowCard(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentRoute]);

  // Robust routing that handles hash, pathname, and admin tokens
  useEffect(() => {
    const updateRoute = () => {
      const newRoute = isToolRoute() ? 'tool' : 'valentine';
      setCurrentRoute(newRoute);
      
      // Update recipient name when route changes (in case URL params changed)
      const nameFromURL = getRecipientNameFromURL();
      setRecipientName(nameFromURL);
      
      // Check if this is a personalized link
      setIsPersonalizedLink(hasRecipientNameParamInURL());
      
      // Update document title
      document.title = `Romantic Valentine's Website for ${nameFromURL}`;
    };

    // Listen for hash changes
    window.addEventListener('hashchange', updateRoute);
    
    // Listen for history navigation (back/forward buttons)
    window.addEventListener('popstate', updateRoute);
    
    return () => {
      window.removeEventListener('hashchange', updateRoute);
      window.removeEventListener('popstate', updateRoute);
    };
  }, []);

  const handleYesClick = () => {
    setShowCelebration(true);
  };

  const handleBackFromTool = () => {
    navigateToMainExperience();
  };

  // Show tool page
  if (currentRoute === 'tool') {
    return <WishlinkToolPage onBack={handleBackFromTool} />;
  }

  // Show main Valentine experience
  return (
    <div className="min-h-screen w-full overflow-y-auto overflow-x-hidden flex flex-col">
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
      <UpwardSmileAnimation show={showCelebration} />

      {/* Make your own CTA - only visible on non-personalized main Valentine experience */}
      {!isPersonalizedLink && <MakeYourOwnCTA />}

      {/* Main scrollable content container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 py-12 sm:py-16 md:py-20">
        <div
          className={`transition-all duration-1000 transform w-full ${
            showCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <ValentineCard 
            onYesClick={handleYesClick} 
            showCelebration={showCelebration}
            recipientName={recipientName}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
