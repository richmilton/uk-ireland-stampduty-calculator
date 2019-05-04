/**
 * Calculator for residential and commercial
 *
 *  SDLT(England/NI),
 *  LBTT(Scotland),
 *  LTT(Wales),
 *  Stamp Duty(Ireland)
 *
 * correct for transactions completing after 1 April 2016
 * calculations are rounded down in line with
 *
 * https://www.tax.service.gov.uk/calculate-stamp-duty-land-tax
 *
 */

const {
  sdltBands,
  countries: { IRELAND, WALES, ENGLAND },
  buyerTypes: { FIRST_TIME, INVESTOR },
  propertyTypes: { RESIDENTIAL },
  comments,
  englandFirstTimeLimit,
} = require('./config');

const ok = 'ok';

/**
 * returns JSON object
 *
 * @param {number} propertyValue - int or floating point.
 * @param {string} propertyType - either propertyTypes.COMMERCIAL or propertyTypes.RESIDENTIAL.
 * @param {string} country - any of countries.ENGLAND, countries.WALES, countries.SCOTLAND, countries.IRELAND
 * @param {string} buyerType - any of buyerTypes.FIRST_TIME, buyerTypes.INVESTOR, buyerTypes.MOVING_HOUSE
 */

const calculate = (propertyValue, propertyType, country, buyerType) => {
  const isLoaded = country !== IRELAND
    && buyerType === INVESTOR
    && propertyType === RESIDENTIAL;
  const below40kUKAdditionalProperty = isLoaded
    && propertyValue <= 40000;

  let comment = '';
  let tax = 0;
  let bandLimit;
  let bandAmount;
  let previousBandLimit;
  let taxAdded = 0;
  let bands = sdltBands[propertyType][country];
  let endReached = false;

  if (!below40kUKAdditionalProperty) {
    const onePercentOfVal = (propertyValue / 100);
    const isFirst = buyerType === FIRST_TIME
      && propertyType === RESIDENTIAL;
    const isWalesFirst = isFirst
      && country === WALES;
    const isEnglandFirstOverLimit = isFirst
      && country === ENGLAND
      && propertyValue > englandFirstTimeLimit;
    const summaryBands = [];

    if (isWalesFirst) {
      comment = comments.firstTimeWales;
    } else if (isLoaded) {
      comment = comments.UKInvestor;
    } else if (isEnglandFirstOverLimit) {
      comment = comments.firstTimeEnglandOverLimit;
    }

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

    for (let idx = 0; idx < bands.length; idx += 1) {
      const {rate} = bands[idx];
      const adjustedRate = rate + (buyerType === INVESTOR ? (bands[idx].load || 0) : 0);

      bandLimit = bands[idx].upto;
      previousBandLimit = idx > 0 ? bands[idx - 1].upto : 0;
      bandAmount = propertyValue - previousBandLimit;
      endReached = bandLimit === 'end' || propertyValue <= bandLimit;

      if (endReached) {
        if (bandLimit === 'end') { // end and return
          taxAdded = ((onePercentOfVal - (previousBandLimit / 100)) * adjustedRate);
          tax += taxAdded;
          summaryBands.push({
            start: previousBandLimit,
            end: propertyValue,
            bandLimit: propertyValue,
            bandAmount, adjustedRate,
            taxAdded: Math.floor(taxAdded),
          });
          tax = Math.floor(tax);
        } else if (propertyValue <= bandLimit) { // return before end
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
            bandLimit,
            bandAmount, adjustedRate,
            taxAdded: Math.floor(taxAdded),
          });
          tax = Math.floor(tax);
        }
        return {
          propertyValue,
          propertyType,
          country,
          buyerType,
          summaryBands,
          tax,
          ok,
          comment,
        };
      }
      // add the tax rate for the whole band and carry on
      bandAmount = bandLimit - previousBandLimit;
      taxAdded = ((bandAmount) / 100 * adjustedRate);
      summaryBands.push({
        start: previousBandLimit,
        end: bandLimit,
        bandLimit,
        bandAmount, adjustedRate, taxAdded
      });
      tax += taxAdded;
    }
  }

  comment = comments.under40kUKInvestor;

  return {
    propertyValue,
    propertyType,
    country,
    buyerType,
    summaryBands: [{ start: 0,
      end: propertyValue,
      bandLimit: 40000,
      bandAmount: 0,
      adjustedRate: 0,
      taxAdded: 0 }],
    tax,
    ok,
    comment,
  };
};

module.exports = calculate;
