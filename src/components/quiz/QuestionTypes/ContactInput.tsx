
import React from 'react';
import { BusinessInput } from '@/components/business-form/BusinessInput';

interface ContactInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ContactInput: React.FC<ContactInputProps> = ({ value, onChange }) => {
  return (
    <BusinessInput
      label="Contact Information"
      placeholder="Enter your email or phone number"
      name="contact"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
