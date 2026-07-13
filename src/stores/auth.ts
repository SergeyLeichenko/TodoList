import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { getUsers } from "@/api/users";
import type { User } from "@/types/user";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const router = useRouter();

  const login = async (username: string, phone: string) => {
    const users = await getUsers();

    const currentUser = users.find(
      (item) =>
        item.username.toLowerCase() === username.toLowerCase() &&
        item.phone === phone,
    );

    if (!currentUser) {
      throw new Error("Login error");
    }

    user.value = currentUser;

    localStorage.setItem("user", JSON.stringify(currentUser));
  };

  const logout = () => {
    user.value = null;

    router.push("/");
    localStorage.removeItem("user");
  };

  const restoreUser = () => {
    const data = localStorage.getItem("user");

    if (!data) return;

    user.value = JSON.parse(data);
  };

  return {
    user,
    login,
    logout,
    restoreUser,
  };
});
