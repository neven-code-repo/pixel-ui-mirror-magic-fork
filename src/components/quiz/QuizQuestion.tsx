
import React from 'react';
import { Question } from '@/types/quiz';
import { CombinedTextInput } from './QuestionTypes/CombinedTextInput';
import { SingleChoice } from './QuestionTypes/SingleChoice';
import { MultipleChoice } from './QuestionTypes/MultipleChoice';
import { OpenText } from './QuestionTypes/OpenText';
import { ContactInput } from './QuestionTypes/ContactInput';
import { useQuiz } from '@/context/QuizContext';

interface QuizQuestionProps {
  question: Question;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({ question }) => {
  const { answers, setAnswer } = useQuiz();
  const currentAnswer = answers[question.id] || (question.type === 'multiple_choice' ? [] : '');

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'combined_text':
        return (
          <CombinedTextInput
            value={currentAnswer as string}
            onChange={(value) => setAnswer(question.id, value)}
          />
        );
      case 'single_choice':
        return (
          <SingleChoice
            options={question.options || []}
            value={currentAnswer as string}
            onChange={(value) => setAnswer(question.id, value)}
          />
        );
      case 'multiple_choice':
        return (
          <MultipleChoice
            options={question.options || []}
            value={currentAnswer as string[]}
            onChange={(value) => setAnswer(question.id, value)}
          />
        );
      case 'open_text':
        return (
          <OpenText
            value={currentAnswer as string}
            onChange={(value) => setAnswer(question.id, value)}
          />
        );
      case 'contact_input':
        return (
          <ContactInput
            value={currentAnswer as string}
            onChange={(value) => setAnswer(question.id, value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-8">
      <h2 className="text-xl font-semibold text-[#1e2b86] text-center">
        {question.question_text}
      </h2>
      {renderQuestionInput()}
    </div>
  );
};
