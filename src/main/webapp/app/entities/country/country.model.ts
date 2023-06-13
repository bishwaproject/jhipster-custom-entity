export interface ICountry {
  id: number;
  countryName?: string | null;
}

export type NewCountry = Omit<ICountry, 'id'> & { id: null };
