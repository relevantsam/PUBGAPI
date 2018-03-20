# PUBGAPI

A simple wrapper for the PUBG API. Uses [kitsu](https://github.com/wopian/kitsu) to interact with the api.

## Usage

Example:

```
const pubgapi = require('pubgapi');

const api = new pubgapi('my_super_secret_token');

let matches;

api.getMatches('pc-na').then((data) => {
    matches = data;
}).catch((err) => {
    throw err;
});

```