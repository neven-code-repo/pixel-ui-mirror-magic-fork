import React, { createContext, useContext, useState } from 'react';
import { Question, QuizAnswers } from '@/types/quiz';

interface QuizContextType {
  currentStep: number;
  answers: QuizAnswers;
  setCurrentStep: (step: number) => void;
  setAnswer: (questionId: string, answer: string | string[]) => void;
  isValidAnswer: (question: Question) => boolean;
  submitQuizAnswers: (email: string) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const setAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const isValidAnswer = (question: Question): boolean => {
    if (!answers[question.id]) return false;
    
    if (question.type === 'combined_text') {
      const answer = answers[question.id] as string;
      return answer.includes(',') && answer.split(',').every(part => part.trim().length > 0);
    }
    
    if (question.type === 'multiple_choice') {
      return (answers[question.id] as string[]).length > 0;
    }
    
    return (answers[question.id] as string).trim().length > 0;
  };

  const submitQuizAnswers = async (email: string) => {
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_qkkexhr',
          template_id: 'template_8po8lyj',
          user_id: 'user_k5C9TjhZ8KJ9Y5Q2X',
          template_params: {
            to_email: 'bojan.milekic@gmail.com',
            subject: 'New business finished quiz',
            user_email: email,
            quiz_data: JSON.stringify(answers),
          },
        }),
      });

      if (!response.ok) {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        currentStep,
        answers,
        setCurrentStep,
        setAnswer,
        isValidAnswer,
        submitQuizAnswers,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
