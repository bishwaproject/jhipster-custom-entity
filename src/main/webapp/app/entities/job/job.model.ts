export interface IJob {
  id: number;
  jobTitle?: string | null;
  minSalary?: number | null;
  maxSalary?: number | null;
}

export type NewJob = Omit<IJob, 'id'> & { id: null };
