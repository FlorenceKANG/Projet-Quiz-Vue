<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const state = ref("light");

const isDark = computed(() => state.value === "dark");

const onToggleMode = (e) => {
  const mode = e.target.checked ? "dark" : "light";
  ui("mode", mode);
  state.value = mode;
};
</script>

<template>
  <header>
    <div class="row">
      <img
        src="./assets/logo.png"
        alt="logo du site"
        width="100"
        height="100"
      />
      <h1>Vue Quiz</h1>
    </div>
    <nav>
      <button class="transparent square" @click="router.push('/')">
        <i>home</i>
      </button>
      <label class="switch icon">
        <input
          type="checkbox"
          v-model="state"
          :checked="isDark"
          @change="onToggleMode"
        />
        <span>
          <i>{{ isDark ? "bedtime" : "routine" }}</i>
        </span>
      </label>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem !important;
}
main {
  margin: 1rem;
  padding: 1rem;
  border-top: 1px solid lightgray;
}
</style>
