
import React, { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  AlertCircle,
  Building,
  Home,
  User,
  Users,
  Calendar,
  DollarSign,
  Globe
} from 'lucide-react';

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

  // Function to determine which icon to use based on the option text
  const getIconForOption = (text: string) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText === 'yes') return <CheckCircle className="mr-2 text-[#22c55e]" size={20} />;
    if (lowerText === 'no') return <XCircle className="mr-2 text-[#ef4444]" size={20} />;
    if (lowerText.includes('not sure') || lowerText.includes('maybe')) return <HelpCircle className="mr-2 text-[#eab308]" size={20} />;
    if (lowerText.includes('website')) return <Globe className="mr-2 text-[#1a73e8]" size={20} />;
    
    // Default icon for items that don't match any pattern
    return <CheckCircle className="mr-2 text-[#1a73e8]" size={20} />;
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
          const icon = emoji ? null : getIconForOption(text);
          
          return (
            <div key={index}>
              <div 
                className={`flex items-center p-4 rounded-lg border transition-colors ${
                  selectedOption === option ? 
                  'bg-[#e3f0ff] border-[#1a73e8]' : 
                  'bg-white border-[#c7dcf7] hover:bg-[#f2f8ff]'
                }`}
              >
                <RadioGroupItem value={option} id={`option-${index}`} className="mr-3" />
                <Label htmlFor={`option-${index}`} className="flex items-center text-base text-[#1a4b8a] cursor-pointer w-full">
                  {emoji ? <span className="text-xl mr-2">{emoji}</span> : icon}
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
                    className="text-[#1a4b8a]"
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
