import dayjs from 'dayjs/esm';
import { Language } from 'app/entities/enumerations/language.model';

export interface IJobHistory {
  id: number;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  language?: Language | null;
}

export type NewJobHistory = Omit<IJobHistory, 'id'> & { id: null };
