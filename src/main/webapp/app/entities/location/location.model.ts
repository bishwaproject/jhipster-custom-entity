export interface ILocation {
  id: number;
  streetAddress?: string | null;
  postalCode?: string | null;
  city?: string | null;
  stateProvince?: string | null;
}

export type NewLocation = Omit<ILocation, 'id'> & { id: null };
