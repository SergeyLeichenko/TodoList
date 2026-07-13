export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface Status {
  value: string;
  name: string;
}