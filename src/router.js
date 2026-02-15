import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import QuizView from "./views/QuizView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/quiz/:id", component: QuizView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
