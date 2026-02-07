import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, Check, Heart, ArrowLeft, Link2 } from 'lucide-react';
import { buildShareableURL, normalizeRecipientName } from '@/utils/personalization';
import { buildToolSpecialAccessLinkURL } from '@/utils/routing';
import { Separator } from '@/components/ui/separator';
import FloatingHearts from '@/components/FloatingHearts';

interface WishlinkToolPageProps {
  onBack: () => void;
}

export default function WishlinkToolPage({ onBack }: WishlinkToolPageProps) {
  const [recipientName, setRecipientName] = useState('');
  const [copied, setCopied] = useState(false);
  const [toolLinkCopied, setToolLinkCopied] = useState(false);

  const generatedURL = recipientName.trim() 
    ? buildShareableURL(recipientName) 
    : '';

  const toolAccessLink = buildToolSpecialAccessLinkURL();

  const handleCopy = async () => {
    if (!generatedURL) return;
    
    try {
      await navigator.clipboard.writeText(generatedURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyToolLink = async () => {
    try {
      await navigator.clipboard.writeText(toolAccessLink);
      setToolLinkCopied(true);
      setTimeout(() => setToolLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy tool link:', err);
    }
  };

  const normalizedName = normalizeRecipientName(recipientName);

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

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 py-12 sm:py-16 md:py-20">
        <Card className="w-full max-w-2xl mx-auto bg-white/95 dark:bg-black/50 backdrop-blur-xl shadow-2xl border-2 border-rose-200 dark:border-rose-800">
          <CardHeader className="space-y-3 sm:space-y-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="w-fit -ml-2 text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-rose-500 fill-rose-500" />
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Create Your Valentine Link
              </CardTitle>
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-rose-500 fill-rose-500" />
            </div>
            
            <CardDescription className="text-center text-base sm:text-lg text-gray-600 dark:text-gray-400 px-2">
              Personalize this Valentine's experience for your special someone! 💕
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 sm:space-y-8 p-6 sm:p-8">
            {/* Tool Access Link Section */}
            <div className="space-y-3 sm:space-y-4 p-4 sm:p-5 bg-purple-50 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-800 rounded-lg">
              <div className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <Label 
                  htmlFor="tool-access-link" 
                  className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300"
                >
                  Tool Page Access Link
                </Label>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share this link to give others direct access to this tool page:
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Input
                  id="tool-access-link"
                  type="text"
                  value={toolAccessLink}
                  readOnly
                  className="flex-1 text-sm sm:text-base py-4 sm:py-5 px-3 sm:px-4 bg-white dark:bg-gray-900 border-2 border-purple-300 dark:border-purple-700 rounded-lg font-mono"
                />
                <Button
                  onClick={handleCopyToolLink}
                  variant="outline"
                  className="border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 font-semibold py-4 sm:py-5 px-4 sm:px-6 text-base touch-manipulation w-full sm:w-auto"
                >
                  {toolLinkCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Name input section */}
            <div className="space-y-3 sm:space-y-4">
              <Label 
                htmlFor="recipient-name" 
                className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300"
              >
                Enter their name:
              </Label>
              <Input
                id="recipient-name"
                type="text"
                placeholder="e.g., Sarah, Alex, Jamie..."
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full text-base sm:text-lg py-5 sm:py-6 px-4 sm:px-5 border-2 border-rose-200 dark:border-rose-800 focus:border-rose-400 dark:focus:border-rose-600 rounded-lg"
                maxLength={50}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This name will replace "Her Name" throughout the Valentine's message.
              </p>
            </div>

            {/* Generated URL section */}
            {generatedURL && (
              <div className="space-y-3 sm:space-y-4 animate-scale-in">
                <Label 
                  htmlFor="generated-url" 
                  className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300"
                >
                  Your personalized link:
                </Label>
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Input
                    id="generated-url"
                    type="text"
                    value={generatedURL}
                    readOnly
                    className="flex-1 text-sm sm:text-base py-5 sm:py-6 px-4 sm:px-5 bg-gray-50 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-lg font-mono"
                  />
                  <Button
                    onClick={handleCopy}
                    className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 py-5 sm:py-6 px-6 sm:px-8 text-base sm:text-lg touch-manipulation w-full sm:w-auto"
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-5 w-5" />
                        Copy Link
                      </>
                    )}
                  </Button>
                </div>

                {/* Preview section */}
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-200 dark:border-rose-800 rounded-lg">
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3">
                    <strong className="text-gray-800 dark:text-gray-200">Preview:</strong> When someone opens this link, they'll see:
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent text-center py-2">
                    {normalizedName}
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center mt-2">
                    Will you be my Valentine?
                  </p>
                </div>

                {/* Instructions */}
                <div className="mt-4 sm:mt-6 space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  <p className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">💡</span>
                    <span>Share this link with your crush via text, email, or social media!</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">💝</span>
                    <span>The entire experience will be personalized with their name.</span>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
