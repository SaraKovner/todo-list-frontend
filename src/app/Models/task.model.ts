export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  priority: string;
  category: Category;
}