<script setup>
import ErrorState from "@/components/ErrorState.vue";
import Spinner from "@/components/Spinner.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const quizzes = ref([]);
const state = ref("idle");
const errorMessage = ref("");

const router = useRouter();

onMounted(async () => {
  state.value = "loading";
  errorMessage.value = "";

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
  <Spinner v-if="state === 'loading'" />
  <ErrorState v-else-if="state === 'error'" :error-message="errorMessage" />
  <div v-else-if="state === 'success'">
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
              <button class="round" @click="router.push(`/quiz/${quiz.uuid}`)">
                Commencer
              </button>
            </nav>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
