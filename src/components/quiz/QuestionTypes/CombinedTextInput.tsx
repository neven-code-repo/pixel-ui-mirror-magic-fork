
import React from 'react';
import { BusinessInput } from '@/components/business-form/BusinessInput';

interface CombinedTextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CombinedTextInput: React.FC<CombinedTextInputProps> = ({ value, onChange }) => {
  // Split the value into business name and location parts
  const parts = value.split(',');
  
  // The business name is the first part
  const businessName = parts[0] || '';
  
  // The location is everything after the first comma
  const location = parts.length > 1 ? parts.slice(1).join(',').trim() : '';

  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBusinessName = e.target.value;
    onChange(`${newBusinessName}${location ? ',' : ''}${location}`);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Fix: correctly handle spaces and allow commas in location field
    const newLocation = e.target.value;
    // Only add comma if there's content in the business name
    const separator = businessName ? ',' : '';
    onChange(`${businessName}${separator}${newLocation}`);
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
