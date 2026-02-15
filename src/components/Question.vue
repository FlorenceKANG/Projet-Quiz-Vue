<script setup>
defineProps({ question: Object });
</script>

<template>
  <h3>{{ question.question }}</h3>
  <fieldset>
    <nav class="vertical">
      <label
        :for="option.uuid"
        v-for="option in question.options"
        :key="option.uuid"
        class="radio"
      >
        <input
          :id="option.uuid"
          type="radio"
          name="answer"
          :value="option.uuid"
        />
        <span>{{ option.label }}</span>
      </label>
    </nav>
  </fieldset>
</template>
