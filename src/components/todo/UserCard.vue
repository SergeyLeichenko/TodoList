<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>

<template>
  <div class="user-card">
    <h2>{{ auth.user?.name }}</h2>

    <p>{{ auth.user?.email }}</p>

    <p>{{ auth.user?.phone }}</p>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

.user-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px;
  margin-bottom: 25px;
  background: $white;
  border-radius: $radius;
  box-shadow: $shadow;

  @include mobile {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
