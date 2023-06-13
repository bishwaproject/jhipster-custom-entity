import dayjs from 'dayjs/esm';

import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 23105,
};

export const sampleWithPartialData: IStudent = {
  id: 92250,
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  firstName: 'Genesis',
  email: 'Madaline.Braun61@yahoo.com',
  phoneNumber: 'Garden transmit synergistic',
};

export const sampleWithFullData: IStudent = {
  id: 19264,
  photo: '../fake-data/blob/hipster.png',
  photoContentType: 'unknown',
  firstName: 'Logan',
  lastName: 'MacGyver',
  email: 'Niko.Hegmann@gmail.com',
  phoneNumber: 'of neural',
  course: 'Tools Savings',
  startDate: dayjs('2023-03-03T18:27'),
};

export const sampleWithNewData: NewStudent = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
