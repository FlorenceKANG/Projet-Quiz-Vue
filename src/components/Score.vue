<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  quiz: Object,
  answers: Array,
});

const router = useRouter();

const score = computed(() => {
  return props.quiz.questions.reduce((acc, question, k) => {
    if (question.correct_option_uuid === props.answers[k]) {
      return acc + 1;
    }

    return acc;
  }, 0);
});
</script>

<template>
  <div class="score">
    <h3>Score</h3>
    <div class="shape sided-cookie12 extra center">
      <p>{{ score }} / {{ quiz.questions.length }}</p>
    </div>
  </div>
  <div class="right-align bottom-align">
    <button class="border" @click="router.push('/')">
      Continuer avec un autre quiz
    </button>
  </div>
</template>

<style>
h3 {
  text-align: center;
}
.score {
  margin-bottom: 2rem;
}
</style>
