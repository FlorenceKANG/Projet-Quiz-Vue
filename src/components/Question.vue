<script setup>
import { shuffleArray } from "@/hooks/array";
import { computed, ref, watch } from "vue";

const props = defineProps({ question: Object });
const emits = defineEmits(["answer"]);

const answer = ref(null);

const hasAnswer = computed(() => answer.value);
const randomOptions = computed(() => shuffleArray(props.question.options));
const isCorrect = computed(
  () => hasAnswer && answer.value === props.question.correct_option_uuid,
);
const classes = computed(() => ({
  correct: hasAnswer && answer.value === props.question.correct_option_uuid,
  wrong: hasAnswer && answer.value !== props.question.correct_option_uuid,
}));
</script>

<template>
  <h3>{{ question.question }}</h3>
  <fieldset>
    <nav class="vertical">
      <label
        :for="option.uuid"
        v-for="option in randomOptions"
        :key="option.uuid"
        class="radio"
        :class="classes"
      >
        <input
          :id="option.uuid"
          type="radio"
          name="answer"
          v-model="answer"
          :value="option.uuid"
          :disabled="hasAnswer"
        />
        <span>{{ option.label }}</span>
      </label>
    </nav>
  </fieldset>

  <div class="row" v-if="hasAnswer">
    <p :class="classes">
      {{ isCorrect ? "✅ Bonne réponse" : "❌ Mauvaise réponse" }}
    </p>
  </div>
  <button
    v-if="hasAnswer"
    class="absolute right"
    @click="emits('answer', answer)"
  >
    Suivante
  </button>
</template>

<style>
fieldset {
  margin-bottom: 1rem;
}
.correct {
  color: green;
}
.wrong {
  color: red;
}
</style>
