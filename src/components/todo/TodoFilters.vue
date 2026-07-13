<script setup lang="ts">
import { reactive } from "vue";
import BaseInput from "../base/BaseInput.vue";

// Types
import type { Status } from "@/types/todo";

import { useTodosStore } from "@/stores/todos";

const store = useTodosStore();

// Data
const statuses = reactive<Status[]>([
  { value: "all", name: "All" },
  { value: "completed", name: "Completed" },
  { value: "uncompleted", name: "Uncompleted" },
  { value: "favorites", name: "Favorites" },
]);
</script>

<template>
  <div class="filters">
    <BaseInput v-model="store.search" placeholder="Search..." />

    <select v-model="store.status" class="select">
      <option
        v-for="status in statuses"
        :key="status.value"
        :value="status.value"
      >
        {{ status.name }}
      </option>
    </select>

    <select v-model="store.userId" class="select">
      <option value="all">All users</option>

      <option v-for="id in 10" :key="id" :value="id">
        {{ id }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins" as *;
@use "@/assets/styles/variables" as *;

.filters {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  margin: 20px 0;

  :deep(.input-group) {
    margin-bottom: 0;
  }

  .select {
    width: 100%;
    padding: 12px;
    border: 1px solid $border;
    border-radius: $radius;
    transition: $transition;

    &:focus {
      outline: none;
      border-color: $primary;
    }
  }

  @include tablet {
    grid-template-columns: auto;
  }

  @include mobile {
    grid-template-columns: auto;
  }
}
</style>
