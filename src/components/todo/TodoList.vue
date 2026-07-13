<script setup lang="ts">
import TodoItem from "./TodoItem.vue";

import { useTodosStore } from "@/stores/todos";

const store = useTodosStore();
</script>

<template>
  <TodoItem v-for="todo in store.filteredTodos" :key="todo.id" :todo="todo" />
</template>
