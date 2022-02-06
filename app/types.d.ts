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
