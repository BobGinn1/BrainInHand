import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../Components/Home.vue";
import Characters from "../Components/Characters.vue";
import CharacterDetail from "../Components/CharacterDetail.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/characters",
    name: "Characters",
    component: Characters,
  },
  {
    path: "/characters/:id",
    name: "CharacterDetail",
    component: CharacterDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
