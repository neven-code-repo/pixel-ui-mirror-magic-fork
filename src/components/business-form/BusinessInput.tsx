import React from "react";

interface BusinessInputProps {
  label: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BusinessInput: React.FC<BusinessInputProps> = ({
  label,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="flex w-full flex-col items-stretch justify-center">
      <label
        htmlFor={name}
        className="bg-[rgba(0,0,0,0)] w-[108px] max-w-full text-sm font-medium py-[5px]"
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="self-stretch bg-white border min-h-14 w-full text-base font-normal leading-none mt-2 px-4 py-[18px] rounded-md border-[rgba(70,90,234,0.5)] border-solid"
      />
    </div>
  );
};
