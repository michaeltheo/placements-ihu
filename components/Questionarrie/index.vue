<template>
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
          <v-btn size="large" type="submit" class="m-2" :disabled="!isFormValid"
            >Υποβολή Ερωτηματολιγίου</v-btn
          >
        </v-row>
      </v-container>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import MultipleChoice from "./MultipleChoice.vue";
import FreeText from "./FreeText.vue";
import MultipleChoiceFreeText from "./MultipleChoiceFreeText.vue";
import { getQuestions, submitAnswers } from "@/services/questionAnswerService";
import { AnswerSubmission, Question } from "@/types/questionAnswer";
import { QuestionnaireType, QuestionType } from "@/types";
import { hasErrorResponse } from "@/services/errorHandling";

// Define the props received by the component
const props = defineProps<{
  questionnaireType: QuestionnaireType;
}>();

// Define the emits for the component
const emit = defineEmits(["refreshUserAnswers"]);

const $toast = useToast();
const questions = ref<Question[]>([]);
const answers = ref<Record<number, any>>({});

/**
 * Initialize the answers object based on the questions
 */
const initializeAnswers = () => {
  answers.value = questions.value.reduce(
    (acc, question) => {
      if (question.question_type === QuestionType.multiple_choice) {
        acc[question.id] = null;
      } else if (question.question_type === QuestionType.free_text) {
        acc[question.id] = "";
      } else if (
        question.question_type === QuestionType.multiple_choice_with_text
      ) {
        acc[question.id] = { options: [], text: "" };
      }
      return acc;
    },
    {} as Record<number, any>,
  );
};

/**
 * Fetch the list of questions based on the questionnaire type
 */
const fetchQuestions = async () => {
  const response = await getQuestions(props.questionnaireType);
  if (response.data && !hasErrorResponse(response)) {
    questions.value = response.data ?? [];
    initializeAnswers();
  }
};

// Fetch questions on component mount and when the questionnaire type changes
onMounted(fetchQuestions);
watch(() => props.questionnaireType, fetchQuestions);

/**
 * Get the ID of the "Other" option for a multiple-choice question
 * @param {Question} question - The question object
 * @returns {number} - The ID of the "Other" option, or -1 if not found
 */
const getOtherOptionId = (question: Question): number => {
  const otherOption = question.answer_options?.find(
    (option) => option.option_text === "Άλλο",
  );
  return otherOption ? otherOption.id : -1;
};

/**
 * Get the component to be used for rendering a question based on its type
 * @param {Question} question - The question object
 * @returns {string|object} - The component to be used for rendering the question
 */
const getQuestionComponent = (question: Question): string | object => {
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
 * Validate if the form is complete and ready for submission
 * @returns {boolean} - True if the form is valid, false otherwise
 */
const isFormValid = computed(() => {
  return questions.value.every((question: Question) => {
    const answer = answers.value[question.id];
    if (question.question_type === QuestionType.multiple_choice) {
      return answer !== null;
    } else if (question.question_type === QuestionType.free_text) {
      return typeof answer === "string" && answer !== "";
    } else if (
      question.question_type === QuestionType.multiple_choice_with_text
    ) {
      const typedAnswer = answer as { options: number[]; text: string };
      const isOtherSelected = typedAnswer.options.includes(
        getOtherOptionId(question),
      );
      return (
        typedAnswer.options.length > 0 &&
        (!isOtherSelected || typedAnswer.text.trim() !== "")
      );
    }
    return false;
  });
});

/**
 * Transform the user's answers into a format suitable for submission
 * @returns {AnswerSubmission[]} - An array of formatted answer submissions
 */
const transformAnswers = (): AnswerSubmission[] => {
  return questions.value
    .map((question: Question) => {
      const answer = answers.value[question.id];
      if (question.question_type === QuestionType.multiple_choice) {
        return {
          question_id: question.id,
          answer_option_ids: Array.isArray(answer) ? answer : [answer],
        };
      } else if (question.question_type === QuestionType.free_text) {
        return {
          question_id: question.id,
          answer_text: answer,
        };
      } else if (
        question.question_type === QuestionType.multiple_choice_with_text
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
    .filter(Boolean) as AnswerSubmission[];
};

/**
 * Handle form submission
 */
const submit = async () => {
  const formattedAnswers: AnswerSubmission[] = transformAnswers();
  const response = await submitAnswers(formattedAnswers);
  if (hasErrorResponse(response)) {
    $toast.error(`${response.error}`, {
      position: "top",
      duration: 1000,
    });
  } else {
    $toast.success(`${response?.detail}`, {
      position: "top",
      duration: 1000,
    });
    if (emit) {
      emit("refreshUserAnswers");
    }
  }
};
</script>
