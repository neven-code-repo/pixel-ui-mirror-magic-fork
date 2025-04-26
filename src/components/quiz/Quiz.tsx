
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
  const { currentStep, setCurrentStep, answers, isValidAnswer } = useQuiz();
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
    const dependentAnswer = answers[depends_on];
    
    if (!dependentAnswer) return false;

    if (logic === "none_of:None") {
      return (dependentAnswer as string[]).indexOf("None") === -1;
    }

    if (logic === "hide_if_selected") {
      if (Array.isArray(dependentAnswer)) {
        return !dependentAnswer.includes(answer || "");
      }
      return dependentAnswer !== answer;
    }

    if (Array.isArray(dependentAnswer)) {
      return dependentAnswer.includes(answer || "");
    }
    
    return dependentAnswer === answer;
  };

  if (!currentQuestion || !showQuestion(currentQuestion)) {
    if (currentStep < data.questions.length - 1) {
      setCurrentStep(currentStep + 1);
      return null;
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      return null;
    }
  }

  const progress = Math.round(((currentStep + 1) / data.questions.length) * 100);

  return (
    <div className="bg-[rgba(244,247,255,1)] max-w-[480px] w-full overflow-hidden mx-auto">
      <BusinessHeader />
      
      <main className="bg-[rgba(244,247,255,1)] flex min-h-[611px] flex-col items-stretch justify-center pl-6 pr-[23px] py-12">
        <BusinessProgress progress={progress} title={data.metadata.description} />
        
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
