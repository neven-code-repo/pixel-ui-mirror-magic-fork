
import React from "react";
import { useQuiz } from "@/context/QuizContext";

export const BusinessHeader: React.FC = () => {
  const { currentStep, setCurrentStep } = useQuiz();

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <nav className="bg-white flex items-center overflow-hidden text-xs font-medium whitespace-nowrap justify-center px-6 py-2">
      <div className="self-stretch flex min-w-60 w-full max-w-[1200px] items-center gap-9 justify-between flex-1 shrink basis-[0%] my-auto">
        <button
          className="rounded bg-gray-100 border self-stretch flex items-center gap-1 text-[#1e2b86] justify-center w-[78px] my-auto px-3 py-2 border-[rgba(226,232,246,0.7)] border-solid"
          onClick={handleBack}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb46b2bac58dac6216876295a6986ff8c85edae0?placeholderIfAbsent=true"
            alt="Back"
            className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
          />
          <span className="self-stretch my-auto">Back</span>
        </button>

        <a href="https://app.thitny.com" className="self-stretch my-auto">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cbfa1b5a7690d400fe92066bab1120b6fa5581c5?placeholderIfAbsent=true"
            alt="Logo"
            className="aspect-[2.33] object-contain w-[114px]"
          />
        </a>

        <div className="w-[78px]" /> {/* Spacer for layout balance */}
      </div>
    </nav>
  );
};
