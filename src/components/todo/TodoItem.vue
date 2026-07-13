<script setup lang="ts">
import { computed } from "vue";
import type { Todo } from "@/types/todo";

import { useTodosStore } from "@/stores/todos";

// Props
const props = defineProps<{
  todo: Todo;
}>();

const store = useTodosStore();

// Computed
const isFavorite = computed(() => store.favorites.includes(props.todo.id));
</script>

<template>
  <div class="todo">
    <h3>{{ todo.title }}</h3>

    <p>
      {{ todo.completed ? "✅" : "❌" }}
    </p>

    <button
      class="favorite-btn"
      :class="{ active: isFavorite }"
      @click="store.toggleFavorite(todo.id)"
    >
      {{ isFavorite ? "★" : "☆" }}
    </button>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px;
  margin-bottom: 15px;
  background: $white;
  border-radius: $radius;
  box-shadow: $shadow;

  h3 {
    flex: 1;
    word-break: break-word;
  }

  .favorite-btn {
    border: none;
    background: transparent;
    font-size: 24px;
    cursor: pointer;
    transition: transform 0.2s ease;
    flex-shrink: 0;

    &:hover {
      transform: scale(1.15);
    }

    &.active {
      color: $yellow;
    }
  }

  @include mobile {
    flex-direction: column;
    align-items: flex-start;
    button {
      width: 100%;
    }
  }
}
</style>
