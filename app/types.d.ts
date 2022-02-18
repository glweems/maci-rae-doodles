export interface RawDog {
  _table: Table;
  id: string;
  _rawJson: RawJSON;
  fields: Fields;
}

interface RawJSON {
  id: string;
  fields: Fields;
  createdTime: string;
}

interface Fields {
  Family: string[];
  Color: string;
  'For Sale?': boolean;
  Parents: string[];
  Name: string;
  'Weigh-Ins': string[];
  Gender: string;
  Breed: string[];
  Dad: string[];
  Mom: string[];
  'Birthday Lookup': string[];
  Birthday: string[];
  'Record ID': string;
  'Take Home Days Remaining': string;
  'Take-Home Date': string;
  'Breed Name': string[];
  'Request Form Link': string;
  'Dad Breed Name': string[];
  'Mom Breed Name': string[];
}

interface Table {
  _base: Base;
  id: null;
  name: string;
}

interface Base {
  _airtable: unknown;
  _id: string;
}

export interface Dog {
  family?: string[];
  roles?: string[];
  masterS?: string[];
  color?: string;
  parents?: string[];
  familes?: string[];
  embarkId?: string;
  name?: string;
  gender?: string;
  breed?: string[];
  embarkUrl?: string;
  dad?: string[];
  mom?: string[];
  birthdayLookup?: Date[];
  birthday?: Date[] | Date;
  age?: AgeClass | string;
  recordId?: string;
  takeHomeDaysRemaining?: AgeMonthsClass | number;
  takeHomeDate?: AgeClass | Date;
  ageYears?: string;
  ageMonths?: AgeMonthsClass | number;
  ageWeeks?: AgeMonthsClass | number;
  avatar?: Avatar[];
  available?: boolean;
  weighIns?: string[];
  birthdayEntry?: Date;
}

export interface AgeClass {
  error?: string;
}

export interface AgeMonthsClass {
  specialValue?: string;
}

export interface Avatar {
  id?: string;
  width?: number;
  height?: number;
  url?: string;
  filename?: string;
  size?: number;
  type?: string;
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

export interface UpcomingResponse {
  _table?: Table;
  id?: string;
  _rawJson?: RawJson;
  fields?: Fields;
}

export interface RawJson {
  id?: string;
  fields?: Fields;
  createdTime?: Date;
}

export interface Fields {
  inseminationDate?: Date;
  parents?: string[];
  id?: Date;
  dad?: string[];
  mom?: string[];
  dateExpected?: Date;
  dadImages?: Image[];
  momImages?: Image[];
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
  Imagejpeg = 'image/jpeg',
}

export type BernedoodleColor =
  | 'Tri-Color'
  | 'Red, White and Black'
  | 'Chocolate, White and Black'
  | 'Tan, White and Black'
  | 'Red and White'
  | 'Merle'
  | 'Black and White'
  | 'Chocolate and White'
  | 'Black and Tan'
  | 'Black'
  | 'Not Color Pick';
