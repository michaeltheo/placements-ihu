<template>
  <div class="bg-red-300">
    <QuestionarrieDisplayAnswers :questions="questionsWithAnswers" />
    <BaseComponentsInfoBanner status="Pending review" />
  </div>
</template>

<script setup>
import { getUserAnswers } from "@/services/questionAnswerService";
const questionsWithAnswers = ref([]);

const fetchUserAnswers = async () => {
  try {
    const response = await getUserAnswers(2);
    questionsWithAnswers.value = response.data;
  } catch (error) {
    console.error("Error fetching user answers:", error);
  }
};

onMounted(fetchUserAnswers);
</script>
