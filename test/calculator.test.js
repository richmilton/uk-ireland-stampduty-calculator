/* eslint-env mocha */
const { expect } = require('chai');
const { describe } = require('mocha');
const calculate = require('../src/calculator');
const { countries,
  propertyTypes,
  buyerTypes,
  comments,
} = require('../src/config');

const testValues = [
  100000,
  200000,
  300000,
  400000,
  500000,
  600000,
  700000,
  800000,
  900000,
  1000000,
  2000000,
];

describe('calculate()', () => {
  it('should return rounded down numbers for floating decimal results', () => {
    expect(calculate(42067, propertyTypes.RESIDENTIAL, countries.SCOTLAND, buyerTypes.INVESTOR).tax).to.be.equal(1262);
    expect(calculate(142066, propertyTypes.RESIDENTIAL, countries.WALES, buyerTypes.INVESTOR).tax).to.be.equal(4261);
    expect(calculate(542524, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.INVESTOR).tax).to.be.equal(33401);
    expect(calculate(2042067, propertyTypes.COMMERCIAL, countries.ENGLAND, buyerTypes.INVESTOR).tax).to.be.equal(91603);
    expect(calculate(2000237, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.MOVING_HOUSE).summaryBands[4].taxAdded).to.be.equal(60028);
  });
});

describe('calculate()', () => {
  it('should return 0 for second properties below 40k in england scotland and wales', () => {
    expect(calculate(35000, propertyTypes.RESIDENTIAL, countries.SCOTLAND, buyerTypes.INVESTOR).tax).to.be.equal(0);
    expect(calculate(35000, propertyTypes.RESIDENTIAL, countries.WALES, buyerTypes.INVESTOR).tax).to.be.equal(0);
    expect(calculate(35000, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.INVESTOR).tax).to.be.equal(0);
    expect(calculate(35000, propertyTypes.COMMERCIAL, countries.ENGLAND, buyerTypes.INVESTOR).summaryBands[0].bandLimit).to.be.equal(150000);
  });
});

describe('calculate()', () => {
  it('should return correct comments', () => {
    expect(calculate(35000, propertyTypes.RESIDENTIAL, countries.WALES, buyerTypes.FIRST_TIME).comment).to.be.equal(comments.firstTimeWales);
    expect(calculate(35000, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.INVESTOR).comment).to.be.equal(comments.under40kUKInvestor);
    expect(calculate(135000, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.INVESTOR).comment).to.be.equal(comments.UKInvestor);
    expect(calculate(250000, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.FIRST_TIME).comment).to.be.equal(comments.EMPTY);
    expect(calculate(600000, propertyTypes.COMMERCIAL, countries.ENGLAND, buyerTypes.FIRST_TIME).comment).to.be.equal(comments.EMPTY);
    // expect(calculate(600000, propertyTypes.RESIDENTIAL, countries.WALES, buyerTypes.FIRST_TIME).comment).to.be.equal(comments.EMPTY);
    expect(calculate(600000, propertyTypes.RESIDENTIAL, countries.SCOTLAND, buyerTypes.FIRST_TIME).comment).to.be.equal(comments.EMPTY);
    expect(calculate(600000, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.FIRST_TIME).comment).to.be.equal(comments.firstTimeEnglandOverLimit);
  });
});

describe('calculate()', () => {
  it('should return full object', () => {
    const sdResult = calculate(2500000, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.FIRST_TIME);
    console.log(sdResult);
    expect(sdResult.ok).to.be.equal('ok');
    expect(sdResult.tax).to.be.equal(213750);
    expect(sdResult.propertyValue).to.be.equal(2500000);
    expect(sdResult.buyerType).to.be.equal('first');
    expect(sdResult.summaryBands.length).to.be.equal(5);
    expect(sdResult.summaryBands[0].start).to.be.equal(0);
    expect(sdResult.summaryBands[0].taxAdded).to.be.equal(0);
    expect(sdResult.summaryBands[1].taxAdded).to.be.equal(2500);
    expect(sdResult.summaryBands[2].taxAdded).to.be.equal(33750);
    expect(sdResult.summaryBands[3].taxAdded).to.be.equal(57500);
    expect(sdResult.summaryBands[4].taxAdded).to.be.equal(120000);
    expect(sdResult.summaryBands[3].bandLimit).to.be.equal(1500000);
    expect(sdResult.summaryBands[4].bandLimit).to.be.equal('+++');
  });
});



describe('calculate()', () => {
  it('should return correct values for first time buyers', () => {
    expect(calculate(250000, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.FIRST_TIME).tax).to.be.equal(0);
    expect(calculate(350000, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.FIRST_TIME).tax).to.be.equal(2500);
    expect(calculate(550000, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.FIRST_TIME).tax).to.be.equal(17500);
    expect(calculate(170000, propertyTypes.RESIDENTIAL, countries.SCOTLAND, buyerTypes.FIRST_TIME).tax).to.be.equal(0);
    expect(calculate(250000, propertyTypes.RESIDENTIAL, countries.SCOTLAND, buyerTypes.FIRST_TIME).tax).to.be.equal(1500);
    expect(calculate(170000, propertyTypes.RESIDENTIAL, countries.WALES, buyerTypes.FIRST_TIME).tax).to.be.equal(0);
    expect(calculate(250000, propertyTypes.RESIDENTIAL, countries.WALES, buyerTypes.FIRST_TIME).tax).to.be.equal(2450);
  });
});

describe('calculate()', () => {
  it('should return correct values for moving home', () => {
    expect(calculate(250000, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.MOVING_HOUSE).tax).to.be.equal(2500);
    expect(calculate(350000, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.MOVING_HOUSE).tax).to.be.equal(7500);
    expect(calculate(550000, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.MOVING_HOUSE).tax).to.be.equal(17500);
    expect(calculate(170000, propertyTypes.RESIDENTIAL, countries.SCOTLAND, buyerTypes.MOVING_HOUSE).tax).to.be.equal(500);
    expect(calculate(250000, propertyTypes.RESIDENTIAL, countries.SCOTLAND, buyerTypes.MOVING_HOUSE).tax).to.be.equal(2100);
    expect(calculate(170000, propertyTypes.RESIDENTIAL, countries.WALES, buyerTypes.MOVING_HOUSE).tax).to.be.equal(0);
    expect(calculate(250000, propertyTypes.RESIDENTIAL, countries.WALES, buyerTypes.MOVING_HOUSE).tax).to.be.equal(2450);
  });
});

describe('calculate()', () => {
  it('should return correct values for Ireland', () => {
    expect(calculate(250000, propertyTypes.RESIDENTIAL, countries.IRELAND, buyerTypes.MOVING_HOUSE).tax).to.be.equal(2500);
    expect(calculate(350000, propertyTypes.RESIDENTIAL, countries.IRELAND, buyerTypes.FIRST_TIME).tax).to.be.equal(3500);
    expect(calculate(550000, propertyTypes.RESIDENTIAL, countries.IRELAND, buyerTypes.INVESTOR).tax).to.be.equal(5500);
    expect(calculate(170000, propertyTypes.RESIDENTIAL, countries.IRELAND, buyerTypes.MOVING_HOUSE).tax).to.be.equal(1700);
    expect(calculate(250000, propertyTypes.RESIDENTIAL, countries.IRELAND, buyerTypes.FIRST_TIME).tax).to.be.equal(2500);
    expect(calculate(170000, propertyTypes.COMMERCIAL, countries.IRELAND, buyerTypes.INVESTOR).tax).to.be.equal(1700);
    expect(calculate(250000, propertyTypes.RESIDENTIAL, countries.IRELAND, buyerTypes.MOVING_HOUSE).tax).to.be.equal(2500);
  });
});

describe('calculate()', () => {
  it('should return correct values for residential', () => {
    const expectedValues = [
      3000,
      7500,
      14000,
      22000,
      30000,
      38000,
      46000,
      54000,
      62000,
      73750,
      213750,
    ];
    testValues.forEach((v, idx) => {
      expect(calculate(v, propertyTypes.RESIDENTIAL, countries.ENGLAND, buyerTypes.INVESTOR).tax).to.be.equal(expectedValues[idx]);
    });
  });
});

describe('calculate()', () => {
  it('should return correct values for commercial', () => {
    const expectedValues = [
      0,
      1000,
      4500,
      9500,
      14500,
      19500,
      24500,
      29500,
      34500,
      39500,
      89500,
    ];
    testValues.forEach((v, idx) => {
      expect(calculate(v, 'commercial', countries.ENGLAND, buyerTypes.INVESTOR).tax).to.be.equal(expectedValues[idx]);
    });
  });
});

describe('calculate()', () => {
  it('should return correct values for residential wales', () => {
    const expectedValues = [
      3000,
      6700,
      13950,
      21950,
      32450,
      42950,
      53450,
      65200,
      78200,
      91200,
      231200,
    ];
    testValues.forEach((v, idx) => {
      expect(calculate(v, propertyTypes.RESIDENTIAL, countries.WALES, buyerTypes.INVESTOR).tax).to.be.equal(expectedValues[idx]);
    });
  });
});

describe('calculate()', () => {
  it('should return correct values for commercial scotland', () => {
    const expectedValues = [
      0,
      500,
      3500,
      8500,
      13500,
      18500,
      23500,
      28500,
      33500,
      38500,
      98500,
    ];
    testValues.forEach((v, idx) => {
      expect(calculate(v, 'commercial', countries.WALES, buyerTypes.INVESTOR).tax).to.be.equal(expectedValues[idx]);
    });
  });
});

describe('calculate()', () => {
  it('should return correct values for residential scotland', () => {
    const expectedValues = [
      3000,
      7100,
      13600,
      25350,
      38350,
      51350,
      64350,
      78350,
      93350,
      108350,
      258350,
    ];
    testValues.forEach((v, idx) => {
      expect(calculate(v, propertyTypes.RESIDENTIAL, countries.SCOTLAND, buyerTypes.INVESTOR).tax).to.be.equal(expectedValues[idx]);
    });
  });
});

describe('calculate()', () => {
  it('should return correct values for commercial scotland', () => {
    const expectedValues = [
      0,
      500,
      3500,
      8500,
      13500,
      18500,
      23500,
      28500,
      33500,
      38500,
      88500,
    ];
    testValues.forEach((v, idx) => {
      expect(calculate(v, 'commercial', countries.SCOTLAND, buyerTypes.INVESTOR).tax).to.be.equal(expectedValues[idx]);
    });
  });
});
