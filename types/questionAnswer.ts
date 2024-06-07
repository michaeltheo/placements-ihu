import { Message, QuestionType, QuestionnaireType } from "@/types";

export interface Option {
  id: number;
  option_text: string;
}

export interface UserAnswer {
  answer_option_id: number;
  answer_text?: string;
  answer_option_text?: string;
}
export interface AnswerSubmission {
  question_id: number;
  answer_option_ids?: number[];
  answer_text?: string;
}

export interface UserAnswers {
  id: number;
  question_text: string;
  question_type: QuestionType;
  supports_multiple_answers: boolean;
  user_answers: UserAnswer[];
}

export interface Question {
  id: number;
  question_text: string;
  question_type: QuestionType;
  questionnaire_type: QuestionnaireType;
  supports_multiple_answers?: boolean;
  answer_options?: Option[];
}

export interface GetAnswersResponse {
  data?: UserAnswers | [];
  message?: Message;
  error?: string;
}

export interface GetQuestionsResponse {
  data?: Question[];
  message?: Message;
  error?: string;
}

export interface QuestionData {
  questionName: string;
  answersData: Array<{ text: string; count: number }>;
}

export interface QuestionStatisticsResponse {
  data?: Array<{
    question_id: number;
    question_text: string;
    statistics: Array<{
      option_id: number;
      count: number;
      text: string;
    }>;
    free_text_responses_count: number;
    free_text_responses: string[];
    total_responses: number;
  }>;
  message?: Message;
  error?: string;
}
