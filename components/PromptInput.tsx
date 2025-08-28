
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="prompt" className="text-sm font-medium text-gray-300">
        Prompt
      </label>
      <textarea
        id="prompt"
        value={value}
        onChange={onChange}
        placeholder="Describe the portrait you want to create..."
        rows={8}
        className="w-full bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none shadow-inner"
      />
    </div>
  );
};

export default PromptInput;
