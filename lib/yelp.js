'use strict'
const req = require('./req');
class Yelp {
  constructor(config) {
    this.client_id = config.client_id;
    this.client_secret = config.client_secret;
    this.tokenUrl = 'https://api.yelp.com/oauth2/token';
    this.url = 'https://api.yelp.com/v3';
    this.header = {};
  }

  getToken() {
    let data = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: 'client_credentials'
    }
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    return req.post(this.tokenUrl, data, headers)
      .then(res => {
        this.header = {
          Authorization: res.token_type + ' ' + res.access_token
        }
        return 'Token retreived'
      })
      .catch(e => console.error(e))
  }

  getBusinesses(query) {
    return this.getToken().then(() => {
      return req.get(this.url + '/businesses/search',
        query, this.header)
    })
  }

  getBusiness(query) {
    if (!query.id) {
      return Promise.reject(new Error('id not found!'));
    }
    return this.getToken().then(() => {
      return req.get(this.url + '/businesses/' + query.id,
        query, this.header)
    })
  }

  getReviews(query) {
    if (!query.id) {
      return Promise.reject(new Error('id not found!'));
    }
    return this.getToken().then(() => {
      return req.get(this.url + '/businesses/' + query.id + '/reviews',
        query, this.header)
    })
  }

  getBusinessesByPhone(query) {
    return this.getToken().then(() => {
      return req.get(this.url + '/businesses/search/phone',
        query, this.header)
    })
  }

  autocomplete(query) {
    return this.getToken().then(() => {
      return req.get(this.url + '/autocomplete',
        query, this.header)
    })
  }
  //currently only supports delivery  
  getTransactions(query) {
    return this.getToken().then(() => {
      return req.get(this.url + '/transactions/delivery/search',
        query, this.header)
    })
  }
}

module.exports = Yelp;
