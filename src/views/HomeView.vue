<script setup>
import { onMounted, ref } from "vue";

const quizzes = ref([]);
const state = ref("idle");
const errorMessage = ref("");

onMounted(async () => {
  state.value = "loading";
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
  <div class="container">
    <div v-if="state === 'loading'" class="middle-align center-align">
      <progress class="circle wavy indeterminate" value="50" max="100" />
    </div>
    <article v-if="state === 'error'" class="middle-align center-align">
      <div>
        <div class="row middle-align center-align">
          <i class="extra">error</i>
          <h5>Erreur produite</h5>
        </div>
        <p>{{ errorMessage }}</p>
      </div>
    </article>
    <div v-if="state === 'success'">
      <article v-for="quiz in quizzes" :key="quiz.uuid" class="no-padding">
        <div class="grid no-space">
          <div class="s3">
            <img class="responsive" :src="quiz.image_url" />
          </div>
          <div class="s6">
            <div class="padding">
              <h5>{{ quiz.title }}</h5>
              <p>
                {{ quiz.description }}
              </p>
              <nav>
                <button class="round">Commencer</button>
              </nav>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style>
.container {
  padding: 1rem;
}
</style>
