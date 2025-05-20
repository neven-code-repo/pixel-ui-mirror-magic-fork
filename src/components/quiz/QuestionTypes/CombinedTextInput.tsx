
import React from 'react';
import { BusinessInput } from '@/components/business-form/BusinessInput';

interface CombinedTextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CombinedTextInput: React.FC<CombinedTextInputProps> = ({ value, onChange }) => {
  // Split the value into business name and location parts using only the first comma
  const firstCommaIndex = value.indexOf(',');
  
  // The business name is everything before the first comma (if exists)
  const businessName = firstCommaIndex >= 0 ? value.substring(0, firstCommaIndex) : value;
  
  // The location is everything after the first comma (if exists)
  // Don't trim the location to preserve spaces and special characters
  const location = firstCommaIndex >= 0 ? value.substring(firstCommaIndex + 1) : '';

  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBusinessName = e.target.value;
    // Don't add space after comma to prevent automatic trimming
    const separator = newBusinessName && location ? ',' : '';
    onChange(`${newBusinessName}${separator}${location ? location : ''}`);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = e.target.value;
    // Don't add space after comma to prevent automatic trimming
    const separator = businessName && newLocation ? ',' : '';
    onChange(`${businessName}${separator}${newLocation}`);
  };

  return (
    <div className="space-y-4">
      <BusinessInput
        label="Business Name"
        placeholder="Happy Pool Service"
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
