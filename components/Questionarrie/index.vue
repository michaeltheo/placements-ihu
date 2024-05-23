<!-- eslint-disable vue/attribute-hyphenation -->
<!--
  /**
   * DynamicQuestionnaire Component
   *
   * Renders a dynamic form based on the question type provided.
   * Supports multiple-choice, free-text, and multiple-choice-with-free-text questions.
   *
   * @param {Array<Object>} questions - An array of question objects.
   * @param {number} question.id - Unique identifier of the question.
   * @param {string} question.question_text - The question text to be displayed.
   * @param {string} question.question_type - The type of the question.
   * @param {boolean} question.supports_multiple_answers - Indicates if multiple answers are allowed.
   * @param {Array<Object>} question.answer_options - An array of options available for selection.
   */
-->
<template>
  <div data-aos="zoom-in">
    <form @submit.prevent="submit">
      <template v-for="question in questions" :key="question.id">
        <div data-aos="zoom-in-down" class="my-5">
          <component
            :is="getQuestionComponent(question)"
            v-model="answers[question.id]"
            :question="question"
            :options="question.answer_options || []"
            :otherOptionId="getOtherOptionId(question)"
          />
        </div>
      </template>
      <v-container>
        <v-row align="center" justify="center">
          <v-btn size="large" type="submit" :disabled="!isFormValid"
            >Submit</v-btn
          >
        </v-row>
      </v-container>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import MultipleChoice from "./MultipleChoice.vue";
import FreeText from "./FreeText.vue";
import MultipleChoiceFreeText from "./MultipleChoiceFreeText.vue";
import { TestQuestions } from "@/constants/questions";
import { log } from "@/utils/log";
import { Question } from "@/types/question";

// Enum for question types
enum QuestionTypes {
  MultipleChoice = "multiple_choice",
  MultipleChoiceWithText = "multiple_choice_with_text",
  FreeText = "free_text",
}

// Question array and answer types
const questions = ref<Question[]>(TestQuestions);

type Answer = {
  options: number[];
  text: string;
};

// Initialize answers
const answers = ref<Record<number, Answer>>(
  questions.value.reduce(
    (acc: any, question: Question) => {
      // Initialize answers based on question type
      if (question.question_type === QuestionTypes.MultipleChoice) {
        acc[question.id] = null;
      } else if (question.question_type === QuestionTypes.FreeText) {
        acc[question.id] = "";
      } else if (
        question.question_type === QuestionTypes.MultipleChoiceWithText
      ) {
        acc[question.id] = { options: [], text: "" };
      }
      return acc;
    },
    {} as Record<number, Answer>,
  ),
);

/**
 * Retrieves the ID of the "Άλλο" option
 *
 * @param {Question} question - The question object to find the "Άλλο" option in.
 * @returns {number} - The ID of the "Άλλο" option, or -1 if not found.
 */
const getOtherOptionId = (question: Question): number => {
  const otherOption = question.answer_options?.find(
    (option) => option.option_text === "Άλλο",
  );
  return otherOption ? otherOption.id : -1; // Return a default value if "Άλλο" is not found
};

/**
 * Chooses the correct component based on the question type
 *
 * @param {Question} question - The question object.
 * @returns {string | object} - The component to render.
 */
const getQuestionComponent = (question: Question): string | object => {
  switch (question.question_type) {
    case QuestionTypes.MultipleChoice:
      return MultipleChoice;
    case QuestionTypes.FreeText:
      return FreeText;
    case QuestionTypes.MultipleChoiceWithText:
      return MultipleChoiceFreeText;
    default:
      return "div"; // Default to a div or an unsupported type
  }
};

/**
 * Computes whether the form is valid (all questions are answered)
 *
 * @returns {boolean} - True if all questions are answered correctly, false otherwise.
 */
const isFormValid = computed(() => {
  return questions.value.every((question: Question) => {
    const answer = answers.value[question.id];
    // Check validity for multiple-choice questions
    if (question.question_type === QuestionTypes.MultipleChoice) {
      return answer !== null;
      // Check validity for free-text questions
    } else if (question.question_type === QuestionTypes.FreeText) {
      return typeof answer === "string" && answer !== "";
    } else if (
      question.question_type === QuestionTypes.MultipleChoiceWithText
    ) {
      // Check validity for multiple-choice with text questions
      const typedAnswer = answer as { options: number[]; text: string };
      return typedAnswer.options.length > 0;
    }
    return false;
  });
});

/**
 * Transforms the answers into a consistent structure based on question type
 *
 * @returns {Array<Record<string, any>>} - An array of formatted answers.
 */
const transformAnswers = (): Array<Record<string, any>> => {
  return questions.value
    .map((question: Question) => {
      const answer = answers.value[question.id];
      // Transform answers for multiple-choice questions
      if (question.question_type === QuestionTypes.MultipleChoice) {
        return {
          question_id: question.id,
          answer_option_ids: Array.isArray(answer) ? answer : [answer],
        };
        // Transform answers for free-text questions
      } else if (question.question_type === QuestionTypes.FreeText) {
        return {
          question_id: question.id,
          answer_text: answer,
        };
      } // Transform answers for multiple-choice with text questions
      else if (
        question.question_type === QuestionTypes.MultipleChoiceWithText
      ) {
        const typedAnswer = answer as { options: number[]; text: string };
        return {
          question_id: question.id,
          answer_option_ids: typedAnswer.options,
          answer_text: typedAnswer.text || "",
        };
      }
      return null;
    })
    .filter(Boolean) as Array<Record<string, any>>; // Filter out any null values
};

// Form submission
const submit = (): void => {
  const formattedAnswers = transformAnswers();
  log(
    "🚀 ~ submit ~ JSON.stringify(formattedAnswers, null, 2):",
    JSON.stringify(formattedAnswers, null, 2),
  );
  alert(JSON.stringify(formattedAnswers, null, 2));
};
</script>
