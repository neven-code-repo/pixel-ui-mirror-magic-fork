
import React from "react";

interface BusinessProgressProps {
  progress?: number;
  title?: string;
}

export const BusinessProgress: React.FC<BusinessProgressProps> = ({ 
  progress = 0, 
  title = "Basic Business Information & Motivation" 
}) => {
  return (
    <div className="self-center flex max-w-full w-[342px] flex-col items-stretch text-base text-[rgba(70,90,234,1)] font-normal text-center justify-center">
      <div className="w-full h-1 bg-[#E2E8F6] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#465AEA]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-4">
        <span
          style={{
            fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
            fontWeight: 500,
            lineHeight: "19px",
            color: "rgba(70,90,234,1)",
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
};
