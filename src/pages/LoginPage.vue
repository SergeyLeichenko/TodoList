<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import LoginForm from "@/components/login/LoginForm.vue";

const router = useRouter();
const auth = useAuthStore();

// Methods
const login = async (data: { username: string; phone: string }) => {
  try {
    await auth.login(data.username, data.phone);

    router.push("/todos");
  } catch {
    alert("Login error");
  }
};
</script>

<template>
  <LoginForm @login="login" />
</template>
