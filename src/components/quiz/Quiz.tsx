
import React from 'react';
import { QuizData } from '@/types/quiz';
import { QuizQuestion } from './QuizQuestion';
import { useQuiz } from '@/context/QuizContext';
import { BusinessHeader } from '../business-form/BusinessHeader';
import { BusinessFooter } from '../business-form/BusinessFooter';
import { BusinessProgress } from '../business-form/BusinessProgress';

interface QuizProps {
  data: QuizData;
}

export const Quiz: React.FC<QuizProps> = ({ data }) => {
  const { currentStep, setCurrentStep, isValidAnswer } = useQuiz();
  const currentQuestion = data.questions[currentStep];

  const handleContinue = () => {
    if (currentStep < data.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Quiz completed!');
      // Handle quiz completion
    }
  };

  const showQuestion = (question: typeof currentQuestion) => {
    if (!question.condition) return true;

    const { depends_on, answer, logic } = question.condition;
    const dependentAnswer = data.questions.find(q => q.id === depends_on)?.variable;
    
    if (!dependentAnswer) return true;

    if (logic === 'none_of') {
      return answer !== dependentAnswer;
    }

    return answer === dependentAnswer;
  };

  if (!currentQuestion || !showQuestion(currentQuestion)) {
    handleContinue();
    return null;
  }

  return (
    <div className="bg-[rgba(244,247,255,1)] max-w-[480px] w-full overflow-hidden mx-auto">
      <BusinessHeader />
      
      <main className="bg-[rgba(244,247,255,1)] flex min-h-[611px] flex-col items-stretch justify-center pl-6 pr-[23px] py-12">
        <BusinessProgress />
        
        <div className="w-full flex-1 mt-12">
          <QuizQuestion question={currentQuestion} />
        </div>
      </main>

      <BusinessFooter 
        onContinue={handleContinue}
        isValid={isValidAnswer(currentQuestion)}
      />
    </div>
  );
};
