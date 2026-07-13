import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "@/pages/LoginPage.vue";
import TodosPage from "@/pages/TodosPage.vue";

import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LoginPage,
    },

    {
      path: "/todos",
      component: TodosPage,
      meta: {
        auth: true,
      },
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  auth.restoreUser();

  if (to.meta.auth && !auth.user) {
    return "/";
  }
});

export default router;
