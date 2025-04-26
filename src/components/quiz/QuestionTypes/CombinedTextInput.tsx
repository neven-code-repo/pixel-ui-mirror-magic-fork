
import React from 'react';
import { BusinessInput } from '@/components/business-form/BusinessInput';

interface CombinedTextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CombinedTextInput: React.FC<CombinedTextInputProps> = ({ value, onChange }) => {
  const [businessName, location] = value.split(',').map(s => s.trim());

  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(`${e.target.value},${location || ''}`);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(`${businessName || ''},${e.target.value}`);
  };

  return (
    <div className="space-y-4">
      <BusinessInput
        label="Business Name"
        placeholder="Happy Pets Grooming"
        name="businessName"
        value={businessName || ''}
        onChange={handleBusinessNameChange}
      />
      <BusinessInput
        label="Location"
        placeholder="Denver"
        name="location"
        value={location || ''}
        onChange={handleLocationChange}
      />
    </div>
  );
};
