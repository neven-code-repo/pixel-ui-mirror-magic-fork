
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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
  Clock,
  Droplet,
  Wrench,
  Hammer
} from 'lucide-react';

interface SingleChoiceProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const SingleChoice: React.FC<SingleChoiceProps> = ({ options, value, onChange }) => {
  // Function to extract emoji from the start of an option if present
  const extractEmoji = (option: string) => {
    const emojiRegex = /^([\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{1F1E0}-\u{1F1FF}✅❓❗🔴🟠🟡🟢🔵🟣🟤⚫⚪🟥🟧🟨🟩🟦🟪🟫⬛⬜💹💲💰💸🏊💧🔧🛠️🌊📝]+ )/u;
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

  // Function to determine which icon to use based on the option text and its context
  const getIconForOption = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Special case for "local directories" question (q4)
    if (options.includes("✅ Yes") && options.includes("✅ No") && options.includes("💷 Not sure")) {
      if (lowerText.includes('yes')) return <CheckCircle className="mr-2 text-[#22c55e]" size={20} />;
      if (lowerText.includes('no')) return <XCircle className="mr-2 text-[#ef4444]" size={20} />;
      if (lowerText.includes('not sure')) return <HelpCircle className="mr-2 text-[#8E9196]" size={20} />;
    }
    
    // Special case for "social media management" question (q9)
    if (options.includes("I manage everything myself") && 
        options.includes("I have an employee or freelancer who helps") && 
        options.includes("I outsource it to an agency or professional")) {
      if (lowerText.includes('myself')) return <User className="mr-2 text-[#1a73e8]" size={20} />;
      if (lowerText.includes('employee') || lowerText.includes('freelancer')) return <Users className="mr-2 text-[#22c55e]" size={20} />;
      if (lowerText.includes('agency') || lowerText.includes('outsource')) return <Building className="mr-2 text-[#9333ea]" size={20} />;
      if (lowerText.includes('don\'t currently')) return <XCircle className="mr-2 text-[#ef4444]" size={20} />;
    }
    
    // Special case for "hours spent" question (q15)
    if (options.includes("⏱️ Under 1 hour") && 
        options.includes("⏰ 1–3 hours") && 
        options.includes("⌚ 3–5 hours")) {
      // Use only the clock emoji from the text, don't add an icon
      return null;
    }
    
    // Special case for pool business types
    if (lowerText.includes('building pools')) return <Building className="mr-2 text-[#1a73e8]" size={20} />;
    if (lowerText.includes('pool cleaning')) return <Droplet className="mr-2 text-[#22c55e]" size={20} />;
    if (lowerText.includes('pool repair')) return <Wrench className="mr-2 text-[#ef4444]" size={20} />;
    if (lowerText.includes('pool maintenance')) return <Hammer className="mr-2 text-[#9333ea]" size={20} />;
    if (lowerText.includes('water quality')) return <Droplet className="mr-2 text-[#0ea5e9]" size={20} />;
    
    // Default icon mapping
    if (lowerText.includes('yes')) return <CheckCircle className="mr-2 text-[#22c55e]" size={20} />;
    if (lowerText.includes('no')) return <XCircle className="mr-2 text-[#ef4444]" size={20} />;
    if (lowerText.includes('not sure') || lowerText.includes('maybe')) return <HelpCircle className="mr-2 text-[#eab308]" size={20} />;
    if (lowerText.includes('important')) return <AlertCircle className="mr-2 text-[#1a73e8]" size={20} />;
    if (lowerText.includes('business')) return <Building className="mr-2 text-[#1a73e8]" size={20} />;
    if (lowerText.includes('home')) return <Home className="mr-2 text-[#1a73e8]" size={20} />;
    if (lowerText.includes('month') || lowerText.includes('year') || lowerText.includes('day')) return <Calendar className="mr-2 text-[#1a73e8]" size={20} />;
    if (lowerText.includes('client') || lowerText.includes('customer')) return <User className="mr-2 text-[#1a73e8]" size={20} />;
    if (lowerText.includes('team') || lowerText.includes('staff') || lowerText.includes('employees')) return <Users className="mr-2 text-[#1a73e8]" size={20} />;
    if (lowerText.includes('$') || lowerText.includes('money') || lowerText.includes('cost') || lowerText.includes('price')) return <DollarSign className="mr-2 text-[#1a73e8]" size={20} />;
    
    // Default icon for items that don't match any pattern
    return <CheckCircle className="mr-2 text-[#1a73e8]" size={20} />;
  };

  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="space-y-3"
    >
      {options.map((option, index) => {
        const { emoji, text } = extractEmoji(option);
        const icon = emoji ? null : getIconForOption(text);
        
        return (
          <div 
            key={index} 
            className={`flex items-center p-4 rounded-lg border transition-colors ${
              value === option ? 
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
        );
      })}
    </RadioGroup>
  );
};
