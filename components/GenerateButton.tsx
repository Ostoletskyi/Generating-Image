
import React from 'react';
import { LoaderIcon } from './Icon';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full flex items-center justify-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-all duration-300 shadow-lg text-lg"
    >
      {isLoading ? (
        <>
          <LoaderIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          Generating...
        </>
      ) : (
        'Generate Image'
      )}
    </button>
  );
};

export default GenerateButton;
