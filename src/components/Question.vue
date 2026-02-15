<script setup>
import { shuffleArray } from "@/hooks/array";
import { computed, ref } from "vue";

const props = defineProps({ question: Object });
const emits = defineEmits(["answer"]);

const answer = ref(null);

const hasAnswer = computed(() => answer.value);
const randomOptions = computed(() => shuffleArray(props.question.options));
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
      >
        <input
          :id="option.uuid"
          type="radio"
          name="answer"
          v-model="answer"
          :value="option.uuid"
        />
        <span>{{ option.label }}</span>
      </label>
    </nav>
  </fieldset>
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
</style>
