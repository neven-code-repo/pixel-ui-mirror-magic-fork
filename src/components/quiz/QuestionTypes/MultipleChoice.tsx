
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

  return (
    <div className="space-y-4">
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-3">
          <Checkbox
            id={`option-${index}`}
            checked={value.includes(option)}
            onCheckedChange={() => handleChange(option)}
          />
          <Label htmlFor={`option-${index}`} className="text-base text-[#1e2b86]">
            {option}
          </Label>
        </div>
      ))}
    </div>
  );
};
