<script setup>
defineProps({ errorMessage: String });
</script>

<template>
  <article class="middle-align center-align">
    <div>
      <div class="row middle-align center-align">
        <i class="extra">error</i>
        <h5>Erreur produite</h5>
      </div>
      <p>{{ errorMessage }}</p>
    </div>
  </article>
</template>
