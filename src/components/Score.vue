<script setup>
import { computed } from "vue";

const props = defineProps({
  quiz: Object,
  answers: Array,
});

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
  <div class="absolute center">
    <h3>Score</h3>
    <div class="shape sided-cookie12 extra">
      <p>{{ score }} / {{ quiz.questions.length }}</p>
    </div>
  </div>
</template>
