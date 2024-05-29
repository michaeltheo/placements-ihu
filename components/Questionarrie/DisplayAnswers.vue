<!-- /**
 * UserAnswersDisplay Component
 *
 * Renders a list of questions with their answers in a read-only format. 
 * The component dynamically selects the appropriate sub-component based on the question type.
 *
 * @param {Array<UserAnswers>} questions - An array of questions with their respective answers.
 */ -->
<template>
  <div>
    <template v-for="question in questions" :key="question.id">
      <component
        :is="getQuestionComponent(question)"
        :question="question"
        :options="getOptions(question)"
        :otherOptionId="getOtherOptionId(question)"
        :model-value="getAnswerValue(question)"
        :disabled="true"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import MultipleChoice from "./MultipleChoice.vue";
import FreeText from "./FreeText.vue";
import MultipleChoiceFreeText from "./MultipleChoiceFreeText.vue";
import { UserAnswers, Option, UserAnswer } from "@/types/questionAnswer";
import { QuestionType } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  questions: UserAnswers[];
}>();

/**
 * Get the component to be used for rendering a question based on its type
 * @param {UserAnswers} question - The question object
 * @returns {string|object} - The component to be used for rendering the question
 */
const getQuestionComponent = (question: UserAnswers): string | object => {
  switch (question.question_type) {
    case QuestionType.multiple_choice:
      return MultipleChoice;
    case QuestionType.free_text:
      return FreeText;
    case QuestionType.multiple_choice_with_text:
      return MultipleChoiceFreeText;
    default:
      return "div";
  }
};

/**
 * Extract options from the question's user answers
 * @param {UserAnswers} question - The question object
 * @returns {Option[]} - The options for the question
 */
const getOptions = (question: UserAnswers): Option[] => {
  return question.user_answers.map((answer) => ({
    id: answer.answer_option_id as number,
    option_text: answer.answer_option_text as string,
  }));
};

/**
 * Get the ID for the "other" option
 * @param {UserAnswers} question - The question object
 * @returns {number} - The ID for the "other" option
 */
const getOtherOptionId = (question: UserAnswers): number => {
  const otherOption = question.user_answers.find(
    (answer: UserAnswer) => answer.answer_option_text === "Άλλο",
  );
  return otherOption ? (otherOption.answer_option_id as number) : -1;
};

/**
 * Get the answer value for the question based on its type
 * @param {UserAnswers} question - The question object
 * @returns {any} - The answer value for the question
 */
const getAnswerValue = (question: UserAnswers) => {
  const answers = question.user_answers;
  switch (question.question_type) {
    case QuestionType.multiple_choice:
      return answers.length ? answers[0].answer_option_id : null;
    case QuestionType.free_text:
      return answers.length ? answers[0].answer_text : "";
    case QuestionType.multiple_choice_with_text:
      return {
        options: answers.map((a) => a.answer_option_id) as number[],
        text:
          answers.find((a) => a.answer_option_text === "Άλλο")?.answer_text ||
          "",
      };
    default:
      return null;
  }
};
</script>
