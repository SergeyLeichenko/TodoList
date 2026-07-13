import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { getTodos } from "@/api/todos";
import type { Todo } from "@/types/todo";

export const useTodosStore = defineStore("todos", () => {
  const todos = ref<Todo[]>([]);

  const search = ref("");
  const status = ref("all");
  const userId = ref("all");

  const favorites = ref<number[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]"),
  );

  const loadTodos = async () => {
    todos.value = await getTodos();
  };

  const filteredTodos = computed(() => {
    return todos.value.filter((todo) => {
      const bySearch = todo.title
        .toLowerCase()
        .includes(search.value.toLowerCase());

      const byStatus =
        status.value === "all" ||
        (status.value === "completed" && todo.completed) ||
        (status.value === "uncompleted" && !todo.completed) ||
        (status.value === "favorites" && favorites.value.includes(todo.id));

      const byUser =
        userId.value === "all" || todo.userId === Number(userId.value);

      return bySearch && byStatus && byUser;
    });
  });

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
