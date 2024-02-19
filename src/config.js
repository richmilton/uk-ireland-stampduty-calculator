const additionalPropertySurcharge = 3;
const additionalPropertySurchargeScotland = 6;
const percent = String.fromCharCode(37);

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

const scotland = [
  { upto: 250000, rate: 2, additionalPropertySurchargeScotland },
  { upto: 325000, rate: 5, additionalPropertySurchargeScotland },
  { upto: 750000, rate: 10, additionalPropertySurchargeScotland },
  { upto: 'end', rate: 12, additionalPropertySurchargeScotland },
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
          // { upto: 500000, rate: 0 },
          { upto: 425000, rate: 0 },
          { upto: 625000, rate: 5 },
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
      // { upto: 500000, rate: 0, additionalPropertySurcharge },
      // { upto: 125000, rate: 0, additionalPropertySurcharge },
      { upto: 250000, rate: 0, additionalPropertySurcharge },
      { upto: 925000, rate: 5, additionalPropertySurcharge },
      { upto: 1500000, rate: 10, additionalPropertySurcharge },
      { upto: 'end', rate: 12, additionalPropertySurcharge },
    ],
    [countries.WALES]: [
      { upto: 225000, rate: 0, additionalPropertySurcharge },
      // { upto: 250000, rate: 3.5, additionalPropertySurcharge },
      { upto: 400000, rate: 6, additionalPropertySurcharge },
      { upto: 750000, rate: 7.5, additionalPropertySurcharge },
      { upto: 1500000, rate: 10, additionalPropertySurcharge },
      { upto: 'end', rate: 12, additionalPropertySurcharge },
    ],
    [countries.SCOTLAND]: [
      { upto: 145000, rate: 0, additionalPropertySurchargeScotland },
      ...scotland,
    ],
    ireland,
  },
};

const { limit: englandFirstTimeLimit } = sdltBands[propertyTypes.RESIDENTIAL][buyerTypes.FIRST_TIME][countries.ENGLAND];

const comments = {
  firstTimeWales: 'there is no separate first time buyer exemption in Wales',
  under40kUKInvestor: 'all transactions below 40k in UK are exempt from ',
  UKInvestor: `${additionalPropertySurchargeScotland + percent} surcharge is applied`,
  firstTimeEnglandOverLimit: `properties over ${englandFirstTimeLimit} do not attract first time buyer relief`,
  EMPTY: '',
};

const taxNames = {
  [countries.ENGLAND]: { long: 'stamp duty land tax', short: 'SDLT' },
  [countries.IRELAND]: { long: 'stamp duty', short: 'stamp duty' },
  [countries.SCOTLAND]: { long: 'land and buildings tax', short: 'LBTT' },
  [countries.WALES]: { long: 'land transaction tax', short: 'LTT' },
};

const config = {
  sdltBands,
  countries,
  propertyTypes,
  buyerTypes,
  comments,
  englandFirstTimeLimit,
  taxNames,
};

module.exports = config;
