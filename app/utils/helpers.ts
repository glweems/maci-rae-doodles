import type { Token } from '@chakra-ui/styled-system/dist/declarations/src/utils';
import type CSS from 'csstype';
import _ from 'lodash';
export const USDollar = (num: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  }).format(num);

export const numDisplay = (num: number) =>
  num?.toLocaleString(
    'en-US', // leave undefined to use the visitor's browser
    // locale or a string like 'en-US' to override it.
    { minimumFractionDigits: 0, maximumFractionDigits: 0 },
  );

export const sbSelect = (arr: string[]) => arr.join(',');

export function toObject<T = Record<string, unknown>>(obj: T): T {
  return JSON.parse(
    JSON.stringify(
      obj,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
    ),
  );
}

export function toArray<T>(arr: T[]): T[] {
  return arr.map(toObject);
}

export const camelize = (obj) =>
  _.transform(obj, (acc, value, key, target) => {
    const camelKey = _.isArray(target) ? key : _.camelCase(key);

    acc[camelKey] = _.isObject(value) ? camelize(value) : value;
  });

export const titleCase = (str: string) =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export type ThemeColor = Token<CSS.Property.Color, 'colors'>;
export type GradientDirection =
  | 'to top'
  | 'to right'
  | 'to bottom'
  | 'to left'
  | 'to top right'
  | 'to top left'
  | 'to bottom right'
  | 'to bottom left';

export const gradientColorProp = (arr: string[], dir?: GradientDirection) => {
  const val = `linear(${dir}, ${arr.join(',')})`;

  return val;
};
