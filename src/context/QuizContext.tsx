
import React, { createContext, useContext, useState } from 'react';
import { QuizAnswers } from '@/types/quiz';

interface QuizContextProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  answers: QuizAnswers;
  setAnswer: (questionId: string, value: string | string[]) => void;
  isValidAnswer: (question: any) => boolean;
  quizStartTime: string;
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  // Store the timestamp when the quiz starts
  const [quizStartTime] = useState<string>(() => new Date().getTime().toString());

  const setAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Check if the current question has a valid answer
  const isValidAnswer = (question: any) => {
    const answer = answers[question.id];

    if (question.type === 'multiple_choice') {
      return Array.isArray(answer) && answer.length > 0;
    } else if (question.type === 'contact_input' || question.type === 'email_input') {
      // For contact/email inputs, check if there's any value
      return Boolean(answer);
    } else if (question.type === 'open_text') {
      // For open text, can be empty
      return true;
    } else if (question.type === 'single_choice_with_url') {
      // For "Yes" option, check if URL is provided
      if (typeof answer === 'string' && answer.startsWith('Yes|')) {
        return answer.split('|')[1].trim() !== '';
      }
      return Boolean(answer);
    }
    
    // For all other types, just check if there's a value
    return Boolean(answer);
  };

  return (
    <QuizContext.Provider value={{ 
      currentStep, 
      setCurrentStep, 
      answers, 
      setAnswer,
      isValidAnswer,
      quizStartTime
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  
  return context;
};
