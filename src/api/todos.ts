import api from "./axios";
import type { Todo } from "@/types/todo";

export const getTodos = async () => {
  const { data } = await api.get<Todo[]>("/todos");

  return data;
};
