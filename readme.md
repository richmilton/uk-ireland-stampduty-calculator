## uk-ireland-stampduty-calculator

Calculates stamp duty based on current rules. 
Handles regional/country variation for commercial and residential property,
and includes options for first time buyers and homeowners and investors.

## install
```bash
npm install uk-ireland-stampduty-calculator
```

## usage
```javascript
const {
  propertyTypes, countries, buyerTypes, calculate,
} = require('uk-ireland-stampduty-calculator');

const propertyValue = 2500000;
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
  "propertyValue": 2500000,
  "propertyType": "residential",
  "country": "england",
  "buyerType": "first",
  "summaryBands":[
     {
       "start": 0,
       "end": 125000,
       "bandAmount": 125000,
       "adjustedRate": 0,
       "taxAdded": 0
     },
     {
       "start": 125000,
       "end": 250000,
       "bandAmount": 125000,
       "adjustedRate": 2,
       "taxAdded": 2500
     },
     {
       "start": 250000,
       "end": 925000,
       "bandAmount": 675000,
       "adjustedRate": 5,
       "taxAdded": 33750
     },
     {
       "start": 925000,
       "end": 1500000,
       "bandAmount": 575000,
       "adjustedRate": 10,
       "taxAdded": 57500
     },
     {
       "start": 1500000,
       "end": 2500000,
       "bandAmount": 1000000,
       "adjustedRate": 12,
       "taxAdded": 120000
     }
  ],
  "tax": 213750,
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

[prop-calc-react](https://richmilton.github.io/prop-calc-react/)

[example React implementation](https://richmilton.github.io/stamp-duty-web)

[example React repo](https://github.com/richmilton/stamp-duty-web)
  

### License ISC

Copyright 2019 Richard Milton

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.