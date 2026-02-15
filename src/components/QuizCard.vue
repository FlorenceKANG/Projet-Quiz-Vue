<script setup>
import { useRouter } from "vue-router";

defineProps({ quiz: Object });

const router = useRouter();
</script>

<template>
  <article class="no-padding">
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
</template>
