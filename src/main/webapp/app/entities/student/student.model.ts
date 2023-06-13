import dayjs from 'dayjs/esm';

export interface IStudent {
  id: number;
  photo?: string | null;
  photoContentType?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  course?: string | null;
  startDate?: dayjs.Dayjs | null;
}

export type NewStudent = Omit<IStudent, 'id'> & { id: null };
