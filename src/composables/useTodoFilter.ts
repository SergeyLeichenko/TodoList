import { computed, type Ref } from "vue";

import type { Todo } from "@/types/todo";

export function useTodoFilter(
  todos: Ref<Todo[]>,
  search: Ref<string>,
  status: Ref<string>,
  userId: Ref<string>,
  favorites: Ref<number[]>,
) {
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

  return {
    filteredTodos,
  };
}
