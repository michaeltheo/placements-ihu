<template>
  <div class="bg-red-300">
    <QuestionarrieDisplayAnswers :questions="questionsWithAnswers" />
  </div>
</template>

<script setup>
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { getUserAnswers } from "@/services/questionAnswerService";
const questionsWithAnswers = ref([]);

const $toast = useToast();
$toast.success(`hello`, { position: "bottom" });
const fetchUserAnswers = async () => {
  try {
    const response = await getUserAnswers(2);
    questionsWithAnswers.value = response.data;
    console.log(
      "🚀 ~ fetchUserAnswers ~ questionsWithAnswers:",
      questionsWithAnswers
    );
  } catch (error) {
    console.error("Error fetching user answers:", error);
  }
};

onMounted(fetchUserAnswers);
</script>
