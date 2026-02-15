<script setup>
import ErrorState from "@/components/ErrorState.vue";
import QuizCard from "@/components/QuizCard.vue";
import Spinner from "@/components/Spinner.vue";
import { onMounted, ref } from "vue";

const quizzes = ref([]);
const state = ref("idle");
const errorMessage = ref("");

onMounted(async () => {
  state.value = "loading";
  errorMessage.value = "";

  try {
    const res = await fetch("/data/quizzes.json");

    if (!res.ok) {
      throw new Error("Impossible de récupérer les données.");
    }
    const data = await res.json();

    quizzes.value = data.quiz_collection;
    state.value = "success";
  } catch (error) {
    console.error(error);
    state.value = "error";
    errorMessage.value =
      "Une erreur s'est produite lors de la récupération des données. Veuillez réessayer plus tard.";
  }
});
</script>

<template>
  <Spinner v-if="state === 'loading'" />
  <ErrorState v-else-if="state === 'error'" :error-message="errorMessage" />
  <div v-else-if="state === 'success'">
    <QuizCard v-for="quiz in quizzes" :key="quiz.uuid" :quiz="quiz" />
  </div>
</template>
