
import React from "react";

interface BusinessProgressProps {
  progress?: number;
}

export const BusinessProgress: React.FC<BusinessProgressProps> = ({ 
  progress = 0
}) => {
  return (
    <div className="self-center flex max-w-full w-[342px] flex-col items-stretch text-base text-[rgba(70,90,234,1)] font-normal text-center justify-center">
      <div className="w-full h-1 bg-[#E2E8F6] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#465AEA]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
