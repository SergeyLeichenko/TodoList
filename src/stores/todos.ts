import { defineStore } from "pinia";
import { ref } from "vue";

import { getTodos } from "@/api/todos";
import { useTodoFilter } from "@/composables/useTodoFilter";
import type { Todo } from "@/types/todo";

export const useTodosStore = defineStore("todos", () => {
  const todos = ref<Todo[]>([]);

  const search = ref("");
  const status = ref("all");
  const userId = ref("all");

  const favorites = ref<number[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]"),
  );

  const { filteredTodos } = useTodoFilter(
    todos,
    search,
    status,
    userId,
    favorites,
  );

  const loadTodos = async () => {
    todos.value = await getTodos();
  };

  const toggleFavorite = (id: number) => {
    if (favorites.value.includes(id)) {
      favorites.value = favorites.value.filter((item) => item !== id);
    } else {
      favorites.value.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  };

  const createTodo = (todo: Todo) => {
    todos.value.unshift(todo);
  };

  return {
    todos,
    search,
    status,
    userId,
    favorites,
    filteredTodos,
    loadTodos,
    toggleFavorite,
    createTodo,
  };
});
