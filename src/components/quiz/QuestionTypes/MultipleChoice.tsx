
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Facebook, Instagram, Linkedin, Pinterest, Youtube, Bulb } from 'lucide-react';
import { TiktokIcon } from '@/components/icons/TiktokIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface MultipleChoiceProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  questionId?: string;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({ options, value, onChange, questionId }) => {
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

  // Function to get social media icon for specific platforms
  const getSocialIcon = (option: string) => {
    const platform = option.toLowerCase();
    if (platform === 'facebook') {
      return <Facebook className="mr-3 text-[#1877F2]" size={24} />;
    } else if (platform === 'instagram') {
      return <Instagram className="mr-3 text-[#E1306C]" size={24} />;
    } else if (platform === 'linkedin') {
      return <Linkedin className="mr-3 text-[#0077B5]" size={24} />;
    } else if (platform === 'tiktok') {
      return <TiktokIcon className="mr-3 text-black" size={24} />;
    } else if (platform === 'pinterest') {
      return <Pinterest className="mr-3 text-[#E60023]" size={24} />;
    } else if (platform === 'youtube') {
      return <Youtube className="mr-3 text-[#FF0000]" size={24} />;
    } else if (platform.includes('twitter') || platform.includes('x')) {
      // Using the renderIcon prop for Twitter/X icon
      return (
        <svg 
          className="mr-3"
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M17.1761 4H20.3037L14.0516 11.0948L21.5 21H15.3166L10.9847 15.2663L5.95132 21H2.82132L9.47663 13.4452L2.33337 4H8.64468L12.5732 9.19474L17.1761 4ZM16.145 19.4224H17.6761L7.79047 5.52066H6.14626L16.145 19.4224Z" 
            fill="#000000"
          />
        </svg>
      );
    }
    return null;
  };

  // Check if this is the social media question (q6)
  const isSocialMediaQuestion = options.some(opt => 
    ['facebook', 'instagram', 'linkedin', 'tiktok', 'twitter', 'pinterest', 'youtube', 'none'].map(s => s.toLowerCase())
      .includes(opt.toLowerCase())
  );

  // Check if this is the obstacle question (q8)
  const isObstacleQuestion = questionId === 'q8';

  // Check if this is the data collection question (q25)
  const isDataCollectionQuestion = questionId === 'q25';

  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const { emoji, text } = extractEmoji(option);
        const socialIcon = isSocialMediaQuestion ? getSocialIcon(option) : null;
        
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
              {socialIcon ? socialIcon : emoji && <span className="text-xl mr-2">{emoji}</span>}
              {text}
            </Label>
          </div>
        );
      })}

      {isObstacleQuestion && (
        <div className="mt-4 bg-[#EDF7FF] border border-[#C5E0FF] p-3 rounded-md text-sm text-[#1e2b86]">
          <p className="font-medium">Interesting fact: 90% of businesses in your niche are facing similar problems</p>
        </div>
      )}

      {isDataCollectionQuestion && (
        <div className="mt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-flex items-center bg-[#F2F5FF] border border-[#D0D9F2] px-3 py-1.5 rounded-md text-[#1e2b86] cursor-help">
                  <Bulb size={16} className="mr-2 text-[#465aea]" />
                  <span className="text-sm">Business tip</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white border border-[#E2E8F6] p-3 max-w-xs shadow-lg">
                <p className="text-sm text-[#1e2b86]">In current business environment, proper business data collect, process and action is must-have</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      <p className="text-sm text-gray-500 italic mt-2">*multiple answers possible</p>
    </div>
  );
};
