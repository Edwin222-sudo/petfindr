// Lightweight USA state list. City/ZIP are free-form validated fields.
export const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
  'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
  'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
  'WI','WY','DC',
] as const;

export type USState = (typeof US_STATES)[number];

export const PET_SPECIES = [
  'Dog',
  'Cat',
  'Bird',
  'Horse',
  'Rabbit',
  'Reptile',
  'Ferret',
  'Other',
] as const;

export type PetSpecies = (typeof PET_SPECIES)[number];

export const PET_SEXES = ['Male', 'Female', 'Unknown'] as const;
export type PetSex = (typeof PET_SEXES)[number];

export const VERIFY_ENDPOINT = 'http://srv1952646.hstgr.cloud';

// Basic US ZIP validation (5 or 5+4)
export function isValidUSZip(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip.trim());
}
