const config = require('./config');

const {
  sdltBands,
  countries: { IRELAND, WALES },
  buyerTypes: { FIRST_TIME },
  propertyTypes: { RESIDENTIAL },
} = config;

const ok = 'ok';

const calculate = (propertyValue, propertyType, country, buyerType) => {
  const onePercentOfVal = (propertyValue / 100);
  let bands = sdltBands[propertyType][country];
  if (
    buyerType === FIRST_TIME
    && propertyType === RESIDENTIAL
    && !(new RegExp(`${IRELAND}|${WALES}`)).test(country)
  ) {
    const { first } = sdltBands[propertyType];
    const { limit, thresholds } = first[country];
    if (limit === -1 || propertyValue <= limit) {
      bands = thresholds;
    }
  }

  let tax = 0;
  let bandLimit;
  let bandAmount;
  let previousBandLimit;
  let taxAdded = 0;
  const summaryBands = [];

  if (!propertyType || !country) return 0;

  for (let idx = 0; idx < bands.length; idx += 1) {
    const { rate } = bands[idx];
    const adjustedRate = rate + (buyerType === 'investor' ? (bands[idx].load || 0) : 0);

    bandLimit = bands[idx].upto;
    previousBandLimit = idx > 0 ? bands[idx - 1].upto : 0;
    bandAmount = propertyValue - previousBandLimit;

    if (bandLimit === 'end') { // end and return
      taxAdded = ((onePercentOfVal - (previousBandLimit / 100)) * adjustedRate);
      tax += taxAdded;
      summaryBands.push({
        start: previousBandLimit,
        end: propertyValue,
        bandAmount, adjustedRate, taxAdded
      });
      return {
        propertyValue, propertyType, country, buyerType, summaryBands, tax, ok
      };
    }
    if (propertyValue <= bandLimit) { // return before end
      if (idx === 0) { // below first limit
        taxAdded = (onePercentOfVal * adjustedRate);
        tax += taxAdded;
      } else { // below this limit
        taxAdded = ((onePercentOfVal - (previousBandLimit / 100)) * adjustedRate);
        tax += taxAdded;
      }
      summaryBands.push({
        start: previousBandLimit,
        end: propertyValue,
        bandAmount, adjustedRate, taxAdded
      });
      return {
        propertyValue, propertyType, country, buyerType, summaryBands, tax, ok
      };
    }
    // add the tax rate for the whole band and carry on
    bandAmount = bandLimit - previousBandLimit;
    taxAdded = ((bandAmount) / 100 * adjustedRate);
    summaryBands.push({
      start: previousBandLimit,
      end: bandLimit,
      bandAmount, adjustedRate, taxAdded
    });
    tax += taxAdded;
  }

  return {
    propertyValue,
    propertyType,
    country,
    buyerType,
    summaryBands,
    tax,
    err: 'something has gone wrong - check all last band upto property set to \`end\` in config.js'
  };
};

module.exports = calculate;
