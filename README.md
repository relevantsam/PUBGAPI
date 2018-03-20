# PUBGAPI

A simple wrapper for the PUBG API. Uses [kitsu](https://github.com/wopian/kitsu) to interact with the api.

## Installation
```
yarn add pubg-api-wrapper --save
npm install pubg-api-wrapper --save
```

## Usage

Example:

```
import { pubgApiWrapper } from 'pubg-api-wrapper';

const api = new pubgapi('my_super_secret_token');

let matches;

api.getMatches('pc-na').then((data) => {
    matches = data;
}).catch((err) => {
    throw err;
});

```