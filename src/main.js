import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

await ui("theme", "#8b5000");

createApp(App).use(router).mount("#app");
