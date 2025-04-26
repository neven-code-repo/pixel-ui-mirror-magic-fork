
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SingleChoiceProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const SingleChoice: React.FC<SingleChoiceProps> = ({ options, value, onChange }) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="space-y-4"
    >
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-3">
          <RadioGroupItem value={option} id={`option-${index}`} />
          <Label htmlFor={`option-${index}`} className="text-base text-[#1e2b86]">
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
