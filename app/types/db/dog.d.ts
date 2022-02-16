export interface DogResponse {
  records?: Record[];
}

export interface Record {
  id?: string;
  fields?: Fields;
  createdTime?: Date;
}

export interface Fields {
  roles?: string[];
  owners?: string[];
  birthdayEntry?: Date;
  color?: string;
  name?: string;
  sex?: Sex;
  breed?: string[];
  birthday?: Birthday;
  recordId?: string;
  takeHomeDate?: Date;
  breedName?: string[];
  requestFormURL?: string;
  embarkId?: string;
  embarkURL?: string;
  images?: Image[];
  litters?: Family[];
  weighIns?: string[];
  family?: Family[];
  parents?: Parent[];
  dad?: Dad[];
  mom?: Mom[];
  birthdayLookup?: Date[];
  dadBreedName?: DadBreedName[];
  momBreedName?: MomBreedName[];
  momEmbarkId?: MomEmbarkId[];
  dadEmbarkId?: DadEmbarkId[];
  isForSale?: boolean;
  requests?: string[];
  isAvailable?: boolean;
  price?: number;
  notes?: string;
}

export type Birthday = Date[] | Date;

export enum Dad {
  Atlas = 'Atlas',
  Jake = 'Jake',
}

export enum DadBreedName {
  BerneseMountainDog = 'Bernese Mountain Dog',
  GoldenMountainDog = 'Golden Mountain Dog',
}

export enum DadEmbarkId {
  Atlas541 = 'atlas541',
  Jake1428 = 'jake1428',
}

export enum Family {
  Rec8UwTylS1KUIUrN = 'rec8uwTylS1kUIUrN',
  RecMNfvfeIsFmMviT = 'recMNfvfeIsFmMviT',
  RecsJU4VJce9TrzRQ = 'recsJU4VJce9trzRQ',
}

export interface Image {
  id?: string;
  width?: number;
  height?: number;
  url?: string;
  filename?: string;
  size?: number;
  type?: Type;
  thumbnails?: Thumbnails;
}

export interface Thumbnails {
  small?: Full;
  large?: Full;
  full?: Full;
}

export interface Full {
  url?: string;
  width?: number;
  height?: number;
}

export enum Type {
  ImageHeic = 'image/heic',
  Imagejpeg = 'image/jpeg',
}

export enum Mom {
  Bella = 'Bella',
  MaciRae = 'Maci Rae',
}

export enum MomBreedName {
  GoldenRetriever = 'Golden Retriever',
  StandardPoodle = 'Standard Poodle',
}

export enum MomEmbarkId {
  Maceyrae = 'maceyrae',
}

export enum Parent {
  Rec3STZgKGEXYyte1 = 'rec3sTZgKGEXYyte1',
  RecGQf9Bxl4ALxkLo = 'recGQf9bxl4aLxkLo',
  RecL0AMMDjJZ7KyjW = 'recL0AMMDjJZ7KyjW',
  Rect1TZeTVUkNI6EL = 'rect1TZeTVUkNI6eL',
}

export enum Sex {
  Female = 'FEMALE',
  Male = 'MALE',
}
