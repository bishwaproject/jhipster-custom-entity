export interface ITask {
  id: number;
  title?: string | null;
  description?: string | null;
}

export type NewTask = Omit<ITask, 'id'> & { id: null };
