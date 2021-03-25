'use strict';

const fetch = require('node-fetch');

const MAX_RETRIES = 5;

const _fetch = (url, options, retries) => {
    return fetch(url, options)
        .catch(err => {
            if (err instanceof fetch.FetchError || retries < MAX_RETRIES) {
                return _fetch(url, options, retries + 1);
            } else {
                throw err;
            }
        });
};

module.exports = {
    fetch: (url, options) => _fetch(url, options, 1)
};
