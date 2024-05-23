export interface Option {
  id: number;
  option_text: string;
}

export interface Question {
  id: number;
  question_text: string;
  question_type: string;
  supports_multiple_answers?: boolean;
  answer_options?: Option[];
}
