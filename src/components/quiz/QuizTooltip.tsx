
import React from 'react';

interface QuizTooltipProps {
  type: 'milestone' | 'progress';
  step: number;
}

export const QuizTooltip: React.FC<QuizTooltipProps> = ({ type, step }) => {
  // Different tooltip contents based on step and type
  const getTooltipContent = () => {
    if (type === 'progress' && step === 5) {
      return {
        icon: '🏆',
        title: 'Achievement Unlocked!',
        message: 'Congratulations! 90% of business owners don\'t reach the 5th question. You\'re already ahead of the curve!'
      };
    } else if (type === 'milestone' && step === 10) {
      return {
        icon: '💪',
        title: 'Keep Going!',
        message: 'We know running a business is tough - and we admire your dedication to improving your online presence!'
      };
    } else if (type === 'milestone' && step === 15) {
      return {
        icon: '⭐',
        title: 'You\'re a Star!',
        message: 'Your commitment to growing your business online is impressive. Keep up the great work!'
      };
    } else if (type === 'milestone' && step === 20) {
      return {
        icon: '🚀',
        title: 'Almost There!',
        message: 'Your determination sets you apart from other business owners. We're excited to help you succeed!'
      };
    }
    
    return null;
  };

  const content = getTooltipContent();
  
  if (!content) return null;
  
  return (
    <div className="bg-[#E5DEFF] rounded-lg p-4 mb-6 shadow-sm animate-fade-in">
      <div className="flex items-center">
        <div className="text-3xl mr-3">{content.icon}</div>
        <div>
          <h3 className="font-bold text-[#1e2b86]">{content.title}</h3>
          <p className="text-sm text-[#1e2b86]">{content.message}</p>
        </div>
      </div>
    </div>
  );
};
