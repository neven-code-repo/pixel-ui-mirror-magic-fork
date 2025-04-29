
import React, { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SingleChoiceWithUrlProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const SingleChoiceWithUrl: React.FC<SingleChoiceWithUrlProps> = ({ options, value, onChange }) => {
  // Parse the initial value to extract the selected option and URL
  const [selectedOption, setSelectedOption] = useState<string>(() => {
    return value.includes('|') ? value.split('|')[0] : value;
  });
  
  const [websiteUrl, setWebsiteUrl] = useState<string>(() => {
    return value.includes('|') ? value.split('|')[1] : '';
  });
  
  // Handle option change
  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    if (option === 'Yes' && websiteUrl) {
      onChange(`${option}|${websiteUrl}`);
    } else {
      onChange(option);
    }
  };

  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setWebsiteUrl(url);
    if (selectedOption === 'Yes') {
      onChange(`Yes|${url}`);
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
      <RadioGroup
        value={selectedOption}
        onValueChange={handleOptionChange}
        className="space-y-3"
      >
        {options.map((option, index) => {
          const { emoji, text } = extractEmoji(option);
          return (
            <div key={index}>
              <div 
                className={`flex items-center p-4 rounded-lg border transition-colors ${
                  selectedOption === option ? 
                  'bg-[#F2F5FF] border-[#465aea]' : 
                  'bg-white border-[#E2E8F6] hover:bg-[#F8FAFF]'
                }`}
              >
                <RadioGroupItem value={option} id={`option-${index}`} className="mr-3" />
                <Label htmlFor={`option-${index}`} className="flex items-center text-base text-[#1e2b86] cursor-pointer w-full">
                  {emoji && <span className="text-xl mr-2">{emoji}</span>}
                  {text}
                </Label>
              </div>
              
              {/* Show URL input field if "Yes" is selected */}
              {option === 'Yes' && selectedOption === 'Yes' && (
                <div className="mt-3 ml-8">
                  <Input 
                    type="url"
                    placeholder="Please enter your website URL (e.g., https://example.com)"
                    value={websiteUrl}
                    onChange={handleUrlChange}
                    className="text-[#1e2b86]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
