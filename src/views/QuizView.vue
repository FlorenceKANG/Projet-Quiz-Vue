<script setup>
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
  <div v-if="state === 'loading'">Chargement...</div>
  <div v-else-if="state === 'error'">{{ errorMessage }}</div>

  <div v-else-if="state === 'success' && quiz">
    <h2>{{ quiz.title }}</h2>
    <p>{{ quiz.description }}</p>
    <div class="row">
      <p>Étape {{ step + 1 }} / {{ quiz.questions.length }}</p>
      <progress :value="step + 1" :max="quiz.questions.length" />
    </div>

    <div class="container">
      <h4>{{ currentQuestion.question }}</h4>
      <fieldset>
        <nav class="vertical">
          <label
            :for="choice.uuid"
            v-for="choice in currentQuestion.options"
            :key="choice.uuid"
            class="radio"
          >
            <input
              :id="choice.uuid"
              type="radio"
              name="answer"
              :value="choice.uuid"
            />
            <span>{{ choice.label }}</span>
          </label>
        </nav>
      </fieldset>
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
