
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface MultipleChoiceProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({ options, value, onChange }) => {
  const handleChange = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  // Function to extract emoji from the start of an option if present
  const extractEmoji = (option: string) => {
    const emojiRegex = /^([\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{1F1E0}-\u{1F1FF}✅❓❗🔴🟠🟡🟢🔵🟣🟤⚫⚪🟥🟧🟨🟩🟦🟪🟫⬛⬜💹💲💰💸]+ )/u;
    const match = option.match(emojiRegex);
    
    if (match) {
      return {
        emoji: match[0].trim(),
        text: option.replace(emojiRegex, '').trim()
      };
    }
    
    return {
      emoji: null,
      text: option
    };
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const { emoji, text } = extractEmoji(option);
        return (
          <div 
            key={index} 
            className={`flex items-center p-4 rounded-lg border transition-colors ${
              value.includes(option) ? 
              'bg-[#F2F5FF] border-[#465aea]' : 
              'bg-white border-[#E2E8F6] hover:bg-[#F8FAFF]'
            }`}
          >
            <Checkbox
              id={`option-${index}`}
              checked={value.includes(option)}
              onCheckedChange={() => handleChange(option)}
              className="mr-3"
            />
            <Label htmlFor={`option-${index}`} className="flex items-center text-base text-[#1e2b86] cursor-pointer w-full">
              {emoji && <span className="text-xl mr-2">{emoji}</span>}
              {text}
            </Label>
          </div>
        );
      })}
    </div>
  );
};
