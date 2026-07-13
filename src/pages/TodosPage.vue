<script setup lang="ts">
import { onMounted } from "vue";

import UserCard from "@/components/todo/UserCard.vue";
import TodoFilters from "@/components/todo/TodoFilters.vue";
import TodoList from "@/components/todo/TodoList.vue";
import CreateTodo from "@/components/todo/CreateTodo.vue";
import BaseButton from "@/components/base/BaseButton.vue";

import { useTodosStore } from "@/stores/todos";
import { useAuthStore } from "@/stores/auth";

const todosStore = useTodosStore();
const authStore = useAuthStore();

// Methods
const logout = () => {
  authStore.logout();
}

// Lifecicle hooks
onMounted(() => {
  todosStore.loadTodos();
});
</script>

<template>
  <div class="page">
    <div class="btn-logout">
      <BaseButton :width="'150px'" :background="'#6b7280'" @click="logout"> Logout </BaseButton>
    </div>
    <UserCard />

    <CreateTodo />

    <TodoFilters />

    <TodoList />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins" as *;

.page {
  max-width: 1200px;
  margin: auto;
  padding: 20px 40px;

  .btn-logout {
    display: flex;
    justify-content: end;
    margin-bottom: 20px;
  }

  @include tablet {
    padding: 20px;
  }

  @include mobile {
    padding: 15px;
  }
}
</style>
