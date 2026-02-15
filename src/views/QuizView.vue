<script setup>
import ErrorState from "@/components/ErrorState.vue";
import Progress from "@/components/Progress.vue";
import Question from "@/components/Question.vue";
import Spinner from "@/components/Spinner.vue";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const quiz = ref(null);
const state = ref("idle");
const errorMessage = ref("");
const step = ref(0);

const quizId = computed(() => route.params.id);
const currentQuestion = computed(() => {
  if (!quiz.value) return null;
  return quiz.value.questions[step.value] ?? null;
});

const next = () => {
  if (!quiz.value) return;

  if (step.value < quiz.value.questions.length - 1) {
    step.value++;
  }
};

watch(
  quizId,
  async (id) => {
    if (!id) return;

    state.value = "loading";
    errorMessage.value = "";
    quiz.value = null;
    step.value = 0;

    try {
      const res = await fetch(`/data/${id}.json`);

      if (!res.ok) {
        throw new Error("Impossible de récupérer les données.");
      }

      const data = await res.json();

      quiz.value = data;
      state.value = "success";
    } catch (error) {
      console.error(error);
      state.value = "error";
      errorMessage.value =
        "Une erreur s'est produite lors de la récupération des données. Veuillez réessayer plus tard.";
    }
  },
  { immediate: true },
);
</script>

<template>
  <Spinner v-if="state === 'loading'" />
  <ErrorState v-else-if="state === 'error'" :error-message="errorMessage" />

  <div v-else-if="state === 'success' && quiz">
    <h2>{{ quiz.title }}</h2>
    <p>{{ quiz.description }}</p>
    <Progress :value="step + 1" :max="quiz.questions.length" />

    <div class="container">
      <Question :question="currentQuestion" />
    </div>
  </div>
  <button class="absolute bottom right" @click="next">Suivant</button>
</template>

<style>
.container {
  margin-top: 1rem;
  padding: 1rem 0;
}
</style>
