import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, Link2 } from 'lucide-react';
import { buildToolSpecialAccessLinkURL } from '@/utils/routing';

/**
 * Admin-gated UI control that displays a copy button for the tool special access link
 * when the URL contains a caffeineAdminToken hash fragment.
 */
export default function AdminToolLinkCopyControl() {
  const [hasAdminToken, setHasAdminToken] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if the current URL hash contains caffeineAdminToken
    const checkAdminToken = () => {
      const { hash } = window.location;
      setHasAdminToken(hash.includes('caffeineAdminToken='));
    };

    // Check on mount
    checkAdminToken();

    // Listen for hash changes
    window.addEventListener('hashchange', checkAdminToken);

    return () => {
      window.removeEventListener('hashchange', checkAdminToken);
    };
  }, []);

  const handleCopy = async () => {
    try {
      const toolLink = buildToolSpecialAccessLinkURL();
      await navigator.clipboard.writeText(toolLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy tool link:', err);
    }
  };

  // Don't render anything if no admin token is present
  if (!hasAdminToken) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleCopy}
        variant="outline"
        className="bg-white/95 dark:bg-black/80 backdrop-blur-sm border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 py-5 px-5 text-sm touch-manipulation"
      >
        {copied ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="mr-2 h-4 w-4" />
            Copy Tool Link
          </>
        )}
      </Button>
    </div>
  );
}
