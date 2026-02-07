import { Button } from '@/components/ui/button';
import { navigateToTool } from '@/utils/routing';

/**
 * A small, non-intrusive CTA component that displays "Make your own 🔗😁"
 * and navigates to the wishlink tool page when clicked.
 */
export default function MakeYourOwnCTA() {
  const handleClick = () => {
    navigateToTool();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleClick}
        className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 py-5 px-6 text-base touch-manipulation"
      >
        Make your own 🔗😁
      </Button>
    </div>
  );
}
