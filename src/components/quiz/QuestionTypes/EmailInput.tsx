
import React from 'react';
import { Input } from '@/components/ui/input';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    // Only fire AddToCart event when email is entered (not removed)
    if (newValue && typeof fbq === 'function') {
      fbq('track', 'AddToCart');
    }
  };
  
  return (
    <div className="space-y-4">
      <Input
        type="email"
        value={value}
        onChange={handleChange}
        placeholder="yourbusiness@gmail.com"
        className="text-[#1e2b86]"
      />
      <div className="bg-[#E5DEFF] rounded-lg p-4 shadow-sm">
        <div className="flex items-center">
          <span className="text-2xl mr-3">🎁</span>
          <p className="text-sm text-[#1e2b86]">
            Please enter email where we can send your <strong>FREE personalized business audit</strong> (valued at $599+ by consulting companies like PwC, Deloitte)
          </p>
        </div>
      </div>
    </div>
  );
};
