
import React from 'react';
import type { AspectRatio } from '../types';
import { ImageIcon, AlertTriangleIcon, LoaderIcon } from './Icon';

interface ImageDisplayProps {
  image: string | null;
  isLoading: boolean;
  error: string | null;
  aspectRatio: AspectRatio;
}

const getAspectRatioClass = (ratio: AspectRatio) => {
  switch (ratio) {
    case '1:1': return 'aspect-square';
    case '3:4': return 'aspect-[3/4]';
    case '4:3': return 'aspect-[4/3]';
    case '9:16': return 'aspect-[9/16]';
    case '16:9': return 'aspect-video';
    default: return 'aspect-square';
  }
};

const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, isLoading, error, aspectRatio }) => {
  const containerClasses = `w-full max-w-full rounded-lg bg-gray-900/50 flex items-center justify-center relative overflow-hidden transition-all duration-300 ${getAspectRatioClass(aspectRatio)}`;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <LoaderIcon className="w-12 h-12 animate-spin text-indigo-400" />
          <p className="mt-4 text-lg font-medium">Generating your portrait...</p>
          <p className="text-sm text-gray-500">This may take a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-red-400 p-4">
          <AlertTriangleIcon className="w-12 h-12" />
          <p className="mt-4 font-semibold">Generation Failed</p>
          <p className="text-sm text-red-500 mt-1">{error}</p>
        </div>
      );
    }

    if (image) {
      return (
        <img
          src={image}
          alt="Generated portrait"
          className="object-contain w-full h-full animate-fade-in"
        />
      );
    }

    return (
      <div className="flex flex-col items-center justify-center text-gray-500">
        <ImageIcon className="w-16 h-16" />
        <p className="mt-4 text-lg">Your generated image will appear here</p>
      </div>
    );
  };
  
  return <div className={containerClasses}>{renderContent()}</div>;
};

export default ImageDisplay;
