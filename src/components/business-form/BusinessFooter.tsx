
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { TiktokIcon } from "../icons/TiktokIcon";

interface BusinessFooterProps {
  onContinue: () => void;
  isValid: boolean;
}

export const BusinessFooter: React.FC<BusinessFooterProps> = ({
  onContinue,
  isValid,
}) => {
  return (
    <footer className="bg-[rgba(244,247,255,1)] flex w-full flex-col items-center font-normal p-6">
      <button
        onClick={onContinue}
        disabled={!isValid}
        className={`self-stretch border w-full max-w-[400px] gap-2.5 text-base text-[#465aea] whitespace-nowrap px-8 py-4 rounded-lg border-solid ${
          isValid
            ? "bg-[#465aea] text-white border-[#465aea] cursor-pointer"
            : "bg-[rgba(216,220,247,1)] border-[rgba(216,220,247,1)] cursor-not-allowed"
        }`}
      >
        Continue
      </button>

      <div className="flex w-full max-w-[400px] flex-col items-stretch text-xs text-[#1e2b86] justify-center mt-6">
        <div className="self-center">Thitny.com</div>
        
        <div className="flex justify-center mt-3 space-x-4">
          <a href="https://www.facebook.com/thitnyapp" target="_blank" rel="noopener noreferrer" className="text-[#465aea] hover:opacity-80 transition-opacity">
            <Facebook size={18} />
          </a>
          <a href="https://www.instagram.com/thitny.app/" target="_blank" rel="noopener noreferrer" className="text-[#465aea] hover:opacity-80 transition-opacity">
            <Instagram size={18} />
          </a>
          <a href="https://x.com/Thitny_App" target="_blank" rel="noopener noreferrer" className="text-[#465aea] hover:opacity-80 transition-opacity">
            <Twitter size={18} />
          </a>
          <a href="https://www.tiktok.com/@thitnyapp" target="_blank" rel="noopener noreferrer" className="text-[#465aea] hover:opacity-80 transition-opacity">
            <TiktokIcon size={18} />
          </a>
        </div>
        
        <div className="flex w-full items-center gap-1 text-center leading-[1.4] justify-center mt-2">
          <div className="text-[rgba(70,90,234,1)] self-stretch my-auto">
            <span className="text-[#1e2b86]">Terms & Conditions</span>
          </div>
          <div className="bg-[rgba(115,103,240,0.3)] self-stretch flex w-2 shrink-0 h-2 my-auto rounded-[200px]" />
          <div className="self-stretch my-auto">Privacy Policy</div>
        </div>
      </div>
    </footer>
  );
};
