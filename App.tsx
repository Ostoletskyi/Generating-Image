
import React, { useState, useCallback } from 'react';
import type { AspectRatio } from './types';
import { generateImage } from './services/geminiService';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import AspectRatioSelector from './components/AspectRatioSelector';
import GenerateButton from './components/GenerateButton';
import ImageDisplay from './components/ImageDisplay';
import { WandSparklesIcon } from './components/Icon';

const initialPrompt = `A stunning young woman, top model look.
Perfect white teeth, full lips, dazzling smile.
Hairstyle: sleek bob cut, glossy straight black hair with silver streaks, fringe above the eyes.
Cinematic, photorealistic, ultra-detailed portrait, sharp focus, neutral background, studio lighting, fashion photography style.`;

function App() {
  const [prompt, setPrompt] = useState<string>(initialPrompt);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('3:4');

  const handleGenerateClick = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImage(prompt, aspectRatio);
      setGeneratedImage(imageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate image. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Control Panel */}
          <div className="flex flex-col space-y-6 bg-gray-800/50 rounded-2xl p-6 shadow-2xl ring-1 ring-white/10">
            <div className="flex items-center space-x-3">
              <WandSparklesIcon className="w-8 h-8 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">Create Your Portrait</h2>
            </div>
            <PromptInput value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <AspectRatioSelector selected={aspectRatio} onSelect={setAspectRatio} />
            <GenerateButton onClick={handleGenerateClick} isLoading={isLoading} />
          </div>

          {/* Image Display */}
          <div className="flex items-center justify-center bg-gray-800/50 rounded-2xl p-6 shadow-2xl ring-1 ring-white/10 min-h-[400px] lg:min-h-0">
            <ImageDisplay
              image={generatedImage}
              isLoading={isLoading}
              error={error}
              aspectRatio={aspectRatio}
            />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Google Gemini API</p>
      </footer>
    </div>
  );
}

export default App;
