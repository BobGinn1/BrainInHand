// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/styles.css"; // <---- make sure this line exists!

createApp(App).use(router).mount("#app");
