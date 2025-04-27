
import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';

interface AnalysisScreenProps {
  onComplete: () => void;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ onComplete }) => {
  const [visibleItems, setVisibleItems] = useState<number>(0);
  const analysisSteps = [
    'Checking business trends',
    'Analyzing positive business practices in your category',
    'Researching competition landscape'
  ];

  useEffect(() => {
    const showNextItem = () => {
      setVisibleItems(prev => {
        if (prev < analysisSteps.length) {
          return prev + 1;
        }
        return prev;
      });
    };

    const interval = setInterval(showNextItem, 2000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onComplete();
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center py-8 px-6">
      <div className="text-center mb-8">
        <Loader className="animate-spin mx-auto mb-6 text-[#465aea]" size={40} />
        <h2 className="text-2xl font-bold text-[#1e2b86] mb-4">
          Hold on, our system is performing detailed analysis about your business
        </h2>
        <p className="text-[#1e2b86] opacity-80 mb-8">
          We need a few more inputs from you to create a 20+ page detailed PDF business audit
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">
        {analysisSteps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 transition-all duration-500 ${
              index < visibleItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-[#465aea]" />
            <p className="text-[#1e2b86]">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
