export interface User {
  first_name: string;
  last_name: string;
  role: string;
  AM: string;
  id: number;
  isAdmin: boolean;
}

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

export interface ErrorResponse {
  error: string;
}
