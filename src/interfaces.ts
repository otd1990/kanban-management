export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Array<{ title: string; isCompleted: boolean }>;
}

export interface Column {
  name: string;
  tasks: Task[];
}

export interface Board {
  name: string;
  columns: Column[];
}
