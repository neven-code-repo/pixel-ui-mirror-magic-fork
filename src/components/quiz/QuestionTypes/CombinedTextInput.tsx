
import React from 'react';
import { BusinessInput } from '@/components/business-form/BusinessInput';

interface CombinedTextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CombinedTextInput: React.FC<CombinedTextInputProps> = ({ value, onChange }) => {
  // Find the last comma in the string to separate business name and location
  const lastCommaIndex = value.lastIndexOf(',');
  
  // If there's a comma, split at the last comma. Otherwise, assume it's all business name
  const businessName = lastCommaIndex !== -1 ? value.substring(0, lastCommaIndex) : value;
  const location = lastCommaIndex !== -1 ? value.substring(lastCommaIndex + 1).trim() : '';

  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBusinessName = e.target.value;
    if (location) {
      onChange(`${newBusinessName},${location}`);
    } else {
      onChange(newBusinessName);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = e.target.value;
    onChange(`${businessName}${newLocation ? ',' : ''}${newLocation}`);
  };

  return (
    <div className="space-y-4">
      <BusinessInput
        label="Business Name"
        placeholder="Happy Pets Grooming"
        name="businessName"
        value={businessName}
        onChange={handleBusinessNameChange}
      />
      <BusinessInput
        label="Location"
        placeholder="Miami, Florida"
        name="location"
        value={location}
        onChange={handleLocationChange}
      />
    </div>
  );
};
