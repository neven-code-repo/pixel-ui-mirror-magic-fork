
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface OpenTextProps {
  value: string;
  onChange: (value: string) => void;
}

export const OpenText: React.FC<OpenTextProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer here..."
        className="min-h-[120px] text-[#1e2b86]"
      />
    </div>
  );
};
