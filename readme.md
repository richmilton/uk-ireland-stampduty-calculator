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
const {
  propertyTypes, countries, buyerTypes, calculate,
} = require('uk-ireland-stampduty-calculator');

const propertyValue = 1200000;
const propertyType = propertyTypes.RESIDENTIAL;
const country = countries.ENGLAND;
const buyerType = buyerTypes.MOVING_HOUSE;

const stampDuty = calculate(
  propertyValue, propertyType, country, buyerType,
);

console.log(stampDuty);
```
will log...

```json
{
  "propertyValue": 1200000,
  "propertyType": "residential",
  "country": "england",
  "buyerType": "home",
  "summaryBands": [
    { "bandLimit": 125000, "taxAdded": 0 },
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
 | country | countries.ENGLAND (same for Northern Ireland)<br/>countries.SCOTLAND<br/>countries.WALES<br/>countries.IRELAND |
 | buyerType | buyerTypes.FIRST_TIME<br/>buyerTypes.MOVING_HOUSE<br/>buyerTypes.INVESTOR |

Used in:
[https://richmilton.github.io/prop-calc-react/](https://richmilton.github.io/prop-calc-react/)

### License ISC

Copyright 2019 Richard Milton

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.