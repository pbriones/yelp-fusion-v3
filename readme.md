#yelp-fusion-v3

Installation
----------
```
npm i yelp-fusion-v3 --save
```

Usage
----------

query parameter requires minimum required input by [Yelp Fusion](https://www.yelp.com/developers/documentation/v3)
Comment above function mentions extra requirements
Response is unmodified yelp response.

```
const Yelp = require('yelp-fusion-v3');
const yelp = new Yelp({
  client_id: <client_id>,
  client_secret: <client_secret>
});

yelp.getToken()

yelp.getBusinesses(query)

//requires query.id
yelp.getBusiness(query)

//requires query.id
yelp.getReviews(query)

yelp.getBusinessesByPhone(query)

yelp.autocomplete(query)
 
yelp.getTransactions(query)
```