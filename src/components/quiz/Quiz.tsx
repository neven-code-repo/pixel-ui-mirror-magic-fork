import React, { useState } from 'react';
import { QuizData } from '@/types/quiz';
import { QuizQuestion } from './QuizQuestion';
import { useQuiz } from '@/context/QuizContext';
import { BusinessHeader } from '../business-form/BusinessHeader';
import { BusinessFooter } from '../business-form/BusinessFooter';
import { BusinessProgress } from '../business-form/BusinessProgress';
import { CompletionScreen } from './CompletionScreen';
import { BusinessCarousel } from './BusinessCarousel';
import { EmailInput } from './QuestionTypes/EmailInput';
import { AnalysisScreen } from './AnalysisScreen';

interface QuizProps {
  data: QuizData;
}

export const Quiz: React.FC<QuizProps> = ({ data }) => {
  const { currentStep, setCurrentStep, answers, isValidAnswer, setAnswer } = useQuiz();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  
  const currentQuestion = data.questions[currentStep];

  const handleContinue = () => {
    if (currentStep < data.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (answers['q28']) {
      setShowAnalysis(true);
    }
  };

  const handleAnalysisComplete = () => {
    setShowAnalysis(false);
    setShowCompletion(true);
  };

  const handleCompletionContinue = () => {
    window.location.href = 'https://app.thitny.com';
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

  const shouldShowCarousel = currentStep === 0;

  if (showAnalysis) {
    return (
      <div className="bg-[rgba(244,247,255,1)] max-w-[480px] w-full overflow-hidden mx-auto flex flex-col min-h-screen">
        <BusinessHeader />
        <AnalysisScreen onComplete={handleAnalysisComplete} />
      </div>
    );
  }

  if (showCompletion) {
    return (
      <div className="bg-[rgba(244,247,255,1)] max-w-[480px] w-full overflow-hidden mx-auto flex flex-col min-h-screen">
        <BusinessHeader />
        <CompletionScreen onContinue={handleCompletionContinue} />
      </div>
    );
  }

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
    <div className="bg-[rgba(244,247,255,1)] max-w-[480px] w-full overflow-hidden mx-auto flex flex-col min-h-screen">
      <BusinessHeader />
      
      <main className="bg-[rgba(244,247,255,1)] flex flex-col flex-grow px-6 py-8 justify-between">
        <div>
          <BusinessProgress progress={progress} />
          
          <div className="w-full mt-8">
            <QuizQuestion question={currentQuestion} />
            {shouldShowCarousel && <BusinessCarousel />}
          </div>
        </div>

        <BusinessFooter 
          onContinue={handleContinue}
          isValid={isValidAnswer(currentQuestion)}
        />
      </main>
    </div>
  );
};
