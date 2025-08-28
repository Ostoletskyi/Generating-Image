
import React from 'react';
import type { AspectRatio } from '../types';

const RATIOS: AspectRatio[] = ["1:1", "3:4", "4:3", "9:16", "16:9"];
const RATIO_LABELS: Record<AspectRatio, string> = {
  "1:1": "Square",
  "3:4": "Portrait",
  "4:3": "Standard",
  "9:16": "Tall",
  "16:9": "Widescreen"
};

interface AspectRatioSelectorProps {
  selected: AspectRatio;
  onSelect: (ratio: AspectRatio) => void;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-300">Aspect Ratio</label>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {RATIOS.map((ratio) => (
          <button
            key={ratio}
            type="button"
            onClick={() => onSelect(ratio)}
            className={`px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500
              ${selected === ratio 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
          >
            <div>{RATIO_LABELS[ratio]}</div>
            <div className="text-xs text-gray-400">{ratio}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AspectRatioSelector;
