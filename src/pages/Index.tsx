
import React from "react";
import { Quiz } from "@/components/quiz/Quiz";
import { QuizProvider } from "@/context/QuizContext";
import quizData from "@/data/quiz-data.json";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-[rgba(244,247,255,1)] flex items-center justify-center">
      <QuizProvider>
        <Quiz data={quizData} />
      </QuizProvider>
    </div>
  );
};

export default Index;
