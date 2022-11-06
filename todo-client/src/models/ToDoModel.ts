export default interface ToDoModel {
  id: number;
  categoryId?: number;
  description?: string;
  name?: string;
  isDone: boolean;
}
