
import React from 'react';
import { Question } from '@/types/quiz';
import { CombinedTextInput } from './QuestionTypes/CombinedTextInput';
import { SingleChoice } from './QuestionTypes/SingleChoice';
import { MultipleChoice } from './QuestionTypes/MultipleChoice';
import { OpenText } from './QuestionTypes/OpenText';
import { ContactInput } from './QuestionTypes/ContactInput';
import { EmailInput } from './QuestionTypes/EmailInput';
import { SingleChoiceWithUrl } from './QuestionTypes/SingleChoiceWithUrl';
import { useQuiz } from '@/context/QuizContext';
import { QuizTooltip } from './QuizTooltip';

interface QuizQuestionProps {
  question: Question;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({ question }) => {
  const { answers, setAnswer, currentStep } = useQuiz();
  const currentAnswer = answers[question.id] || (question.type === 'multiple_choice' ? [] : '');

  // Determine if we should show a tooltip
  const shouldShowProgressTooltip = currentStep === 4; // Show on 5th question (index 4)
  const shouldShowMilestoneTooltip = currentStep === 9 || currentStep === 14 || currentStep === 19; // 10th, 15th, 20th

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
      case 'single_choice_with_url':
        return (
          <SingleChoiceWithUrl
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
      case 'email_input':
        return (
          <EmailInput
            value={currentAnswer as string}
            onChange={(value) => setAnswer(question.id, value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-6">
      {shouldShowProgressTooltip && <QuizTooltip type="progress" step={5} />}
      {shouldShowMilestoneTooltip && <QuizTooltip type="milestone" step={currentStep + 1} />}
      
      <h2 className="text-xl font-semibold text-[#1e2b86] text-center">
        {question.question_text}
      </h2>
      
      <div className="mt-6">
        {renderQuestionInput()}
      </div>
    </div>
  );
};
