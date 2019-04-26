## uk-ireland-stampduty-calculator

Calculates stamp duty based on current rules. 
Handles regional/country variation for commercial and residential property,
and includes options for first time buyers and homeowners and invesors.

## install
```bash
npm install uk-ireland-stampduty-calculator
```

## usage
```javascript
import stampDutyCalculator from 'uk-ireland-stampduty-calculator';

const {
  propertyTypes, countries, buyerTypes, calculate,
} = stampDutyCalculator;
const propertyValue = 1200000;
const propertyType = propertyTypes.RESIDENTIAL;
const country = countries.ENGLAND;
const buyerType = buyerTypes.MOVING_HOUSE;

const stampDuty = calculate(
  propertyValue, propertyType, country, buyerType,
);
```
will return...

```json
{
  "propertyValue": 1200000,
  "propertyType": "residential",
  "country": "england",
  "buyerType": "home",
  "summaryBands": [{ "bandLimit": 125000, "taxAdded": 0 },
     { "bandLimit": 250000, "taxAdded": 2500 },
     { "bandLimit": 925000, "taxAdded": 33750 },
     { "bandLimit": 1500000, "taxAdded": 27500 }
  ],
  "tax": 63750,
  "ok": "ok"
}
```
 ## calculate params
 | param | values |
 | --- | --- |
 | propertyValue | int |
 | propertyType | propertyTypes.RESIDENTIAL<br/>propertyTypes.COMMERCIAL |
 | country | countries.ENGLAND<br/>countries.SCOTLAND<br/>countries.WALES<br/>countries.IRELAND |
 | buyerType | buyerTypes.FIRST_TIME<br/>buyerTypes.MOVING_HOUSE<br/>buyerTypes.INVESTOR |

Used in:
[https://richmilton.github.io/prop-calc-react/](https://richmilton.github.io/prop-calc-react/)
