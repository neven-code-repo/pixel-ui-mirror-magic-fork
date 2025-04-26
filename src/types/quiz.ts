
export type QuestionType = 'combined_text' | 'single_choice' | 'multiple_choice' | 'open_text' | 'contact_input';

export interface Question {
  id: string;
  question_text: string;
  type: QuestionType;
  options?: string[];
  variables?: string[];
  variable?: string;
  internal_note?: string;
  condition?: {
    depends_on: string;
    answer?: string;
    logic?: string;
  };
}

export interface QuizData {
  questions: Question[];
  metadata: {
    version: string;
    description: string;
    conditional_logic: {
      question: string;
      depends_on: string;
      answer?: string;
      logic?: string;
    }[];
  };
}

export type QuizAnswers = {
  [key: string]: string | string[];
};
