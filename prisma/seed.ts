import type { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const commonColors: Record<string, Prisma.BreedColorCreateManyInput> = {
  black: {
    id: 1,
    name: 'Black',
    hex: '#000000',
  },
  white: {
    id: 2,
    name: 'White',
    hex: '#ffffff',
  },
  brown: {
    id: 3,
    name: 'Brown',
    hex: '#a52a2a',
  },
  beige: {
    id: 4,
    name: 'Beige',
    hex: '#f5f5dc',
  },
  golden: {
    id: 5,
    name: 'Golden',
    hex: '#ffd700',
  },
  red: {
    id: 6,
    name: 'Red',
    hex: '#ff0000',
  },
};

const seedColors: Prisma.BreedColorCreateManyInput[] =
  Object.values(commonColors);

const seedBreeds: Array<Prisma.BreedCreateManyInput> = [
  {
    id: 1,
    name: 'Standard Poodle',
    // commonColors: [1, 2, 6],
  },
  {
    id: 2,
    name: 'Bernese Mountain Dog',
    // commonColors: [commonColors.black, commonColors.white, commonColors.brown],
  },
  {
    id: 3,
    name: 'Golden Retriever',
    // commonColors: [commonColors.golden],
  },
  {
    id: 4,
    name: 'Bernedoodle',
    // commonColors: [commonColors.black, commonColors.white, commonColors.brown],
    // parents: [1, 2],
  },
  {
    id: 5,
    name: 'Golden Doodle',
    // commonColors: [commonColors.golden],
    // parents: [1, 3],
  },
  {
    id: 6,
    name: 'Bernese Mountain Dog / Golden Retriever',
    // commonColors: [commonColors.golden, commonColors.brown, commonColors.black],
    // parents: [2, 3],
  },
];

const seedPups: Prisma.PupCreateManyInput[] = [
  {
    name: 'Maci Rae',
    birthday: new Date('2020-01-01'),
    gender: 'FEMALE',
    roles: ['MOTHER'],
    breedId: 1,
    embarkId: 'maceyrae',
  },
  {
    name: 'Luna',
    birthday: new Date('2021-01-01'),
    gender: 'FEMALE',
    roles: [],
    embarkId: 'luna9988',
    breedId: 1,
  },
  {
    name: 'Atlas',
    birthday: new Date('2017-04-08'),
    gender: 'MALE',
    roles: ['FATHER', 'CHILD'],
    breedId: 6,
    embarkId: 'atlas541',
  },
  {
    name: 'Jake',
    birthday: new Date('2014-01-17'),
    gender: 'MALE',
    roles: ['FATHER'],
    embarkId: 'jake1428',
    breedId: 2,
  },
];
// Band	Info		Contact	Weight  1/9/22	Weight 1/22/22	Deposit	Price
const v2 = [
  {
    name: 'Matrix',
    birthday: new Date('12/14/21'),
    gender: 'FEMALE',
    roles: ['CHILD'],
    colors: ['Golden'],
    owner: {
      name: 'Garrett',
    },
    weights: [
      { date: new Date('1/9/22'), weight: [4] },
      { date: new Date('1/22/22'), weight: [6, 14] },
    ],
    price: 'Guardian home',
  },
  {
    name: 'Neo',
    gender: 'MALE',
    breedId: 2,
    colors: [''],
    owner: {},
    weights: [
      { date: new Date('1/09/22'), weight: [] },
      { date: new Date('1/22/22'), weight: [] },
    ],
  },
  {
    name: '',
    gender: 'MALE FEMALE',
    breedId: 2,
    colors: [''],
    owner: {},
    weights: [
      { date: new Date('1/09/22'), weight: [] },
      { date: new Date('1/22/22'), weight: [] },
    ],
  },
  // ]	Guardian home	$1mil gcoin },
];
/*
  Neo	Boy	Black	Austin	4lb 8oz	8lb 10oz	$500	Fave child gift
  Zilker 	Boy	Phantom	Alfred 	3lb 15oz	7lb  9oz	$500	$3000
  Purple	Boy	White	Kelly	4lb 			Stud fee
  Ell	Girl	White	Tami	3lb 15oz	6lb 9oz	$500	$2500
  E	Boy 	Black	Tami	4lb 2oz	6lb 4oz		$500
  Lime	Girl	Black		3lb 13oz	6lb 12oz
  Rip	Boy	All Black Wavy		3lb 10oz	6lb 4oz		$2500?
  Rollover	Girl	White / Creme		4lb 3oz	 7lb 15oz
   */

const seedDb = async () => {
  await prisma.breedColor.deleteMany({});
  await prisma.pup.deleteMany({});
  await prisma.breed.deleteMany({});

  await prisma.breedColor
    .createMany({ data: seedColors })
    .then(() => {
      console.info('Created colors: ', seedColors.length);
    })
    .catch(console.error);

  await prisma.breed
    .createMany({ data: seedBreeds })
    .then(() => {
      console.info('Created breeds: ', seedBreeds.length);
    })
    .catch(console.error);

  await prisma.pup
    .createMany({ data: seedPups })
    .then(() => {
      console.info('Created pups: ', seedPups.length);
    })
    .catch(console.error);
};

seedDb().catch(console.error);
