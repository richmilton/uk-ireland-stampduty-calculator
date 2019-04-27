const load = 3;
const countries = {
  ENGLAND: 'england',
  SCOTLAND: 'scotland',
  WALES: 'wales',
  IRELAND: 'ireland',
};
const propertyTypes = {
  COMMERCIAL: 'commercial',
  RESIDENTIAL: 'residential',
};
const buyerTypes = {
  FIRST_TIME: 'first',
  MOVING_HOUSE: 'home',
  INVESTOR: 'investor',
};
const ireland = [
  { upto: 1000000, rate: 1 },
  { upto: 'end', rate: 2 },
];
const scotland = [{ upto: 250000, rate: 2, load },
  { upto: 325000, rate: 5, load },
  { upto: 750000, rate: 10, load },
  { upto: 'end', rate: 12, load },
];
const sdltBands = {
  [propertyTypes.COMMERCIAL]: {
    [countries.ENGLAND]: [
      { upto: 150000, rate: 0 },
      { upto: 250000, rate: 2 },
      { upto: 'end', rate: 5 },
    ],
    [countries.WALES]: [
      { upto: 150000, rate: 0 },
      { upto: 250000, rate: 1 },
      { upto: 1000000, rate: 5 },
      { upto: 'end', rate: 6 },
    ],
    [countries.SCOTLAND]: [
      { upto: 150000, rate: 0 },
      { upto: 250000, rate: 1 },
      { upto: 'end', rate: 5 },
    ],
    ireland,
  },

  [propertyTypes.RESIDENTIAL]: {
    [buyerTypes.FIRST_TIME]: {
      [countries.ENGLAND]: {
        thresholds: [
          { upto: 300000, rate: 0 },
          { upto: 500000, rate: 5 },
        ],
        limit: 500000,
      },
      [countries.SCOTLAND]: {
        thresholds: [
          { upto: 175000, rate: 0 },
          ...scotland,
        ],
        limit: -1,
      },
    },
    [countries.ENGLAND]: [
      { upto: 125000, rate: 0, load },
      { upto: 250000, rate: 2, load },
      { upto: 925000, rate: 5, load },
      { upto: 1500000, rate: 10, load },
      { upto: 'end', rate: 12, load },
    ],
    [countries.WALES]: [
      { upto: 180000, rate: 0, load },
      { upto: 250000, rate: 3.5, load },
      { upto: 400000, rate: 5, load },
      { upto: 750000, rate: 7.5, load },
      { upto: 1500000, rate: 10, load },
      { upto: 'end', rate: 12, load },
    ],
    [countries.SCOTLAND]: [
      { upto: 145000, rate: 0, load },
      ...scotland,
    ],
    ireland,
  },
};

const config = {
  sdltBands,
  countries,
  propertyTypes,
  buyerTypes,
};

module.exports = config;
