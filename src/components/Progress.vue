<script setup>
defineProps({ value: Number, max: Number });
</script>

<template>
  <div class="row">
    <p>Étape {{ value }} / {{ max }}</p>
    <progress :value="value" :max="max" />
  </div>
</template>
