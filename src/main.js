import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import SpectaclesWomen from "./components/SpectaclesWomen.vue";
import SunglassesWomen from "./components/SunglassesWomen.vue";
import SpectaclesMen from "./components/SpectaclesMen.vue";
import SunglassesMen from "./components/SunglassesMen.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/spectacles-women" },
    { path: "/spectacles-women", component: SpectaclesWomen },
    { path: "/spectacles-men", component: SpectaclesMen },
    { path: "/sunglasses-women", component: SunglassesWomen },
    { path: "/sunglasses-men", component: SunglassesMen },
  ],
});

const app = createApp(App);

app.use(router);

app.mount("#app");
