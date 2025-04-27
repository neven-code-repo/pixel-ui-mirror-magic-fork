
import React, { useEffect } from 'react';
import { CompletionScreenProps } from '@/types/quiz';
import { BusinessProgress } from '../business-form/BusinessProgress';

export const CompletionScreen: React.FC<CompletionScreenProps> = ({ onContinue }) => {
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      window.location.href = 'https://app.thitny.com';
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center py-8 px-6">
      <BusinessProgress progress={100} />
      
      <div className="mt-12 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-[#1e2b86] mb-4">
          Congratulations!
        </h2>
        <p className="text-lg text-[#1e2b86] mb-6">
          You've completed the business assessment quiz!
        </p>
        <div className="bg-[#E5DEFF] rounded-lg p-6 mb-8 shadow-sm">
          <p className="text-base text-[#1e2b86]">
            As a gift for completing this quiz, you'll receive a <span className="font-semibold">personalized business audit</span> to help you grow your business online.
          </p>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="self-stretch border w-full max-w-[400px] gap-2.5 text-base text-white whitespace-nowrap px-8 py-4 rounded-lg border-solid bg-[#465aea] border-[#465aea] cursor-pointer mt-8"
      >
        Continue to Thitny
      </button>
    </div>
  );
};
