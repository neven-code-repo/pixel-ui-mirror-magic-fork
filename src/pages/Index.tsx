
import React from "react";
import { Quiz } from "@/components/quiz/Quiz";
import { QuizProvider } from "@/context/QuizContext";
import quizData from "@/data/quiz-data.json";
import { QuizData } from "@/types/quiz";

const Index: React.FC = () => {
  // Cast quizData to QuizData type to ensure compatibility
  const typedQuizData = quizData as unknown as QuizData;
  
  return (
    <div className="min-h-screen bg-[rgba(244,247,255,1)] flex flex-col items-center justify-center">
      <QuizProvider>
        <Quiz data={typedQuizData} />
      </QuizProvider>
    </div>
  );
};

export default Index;
