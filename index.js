'use strict';

const Kitsu = require('kitsu');
const PUBG_API_URL = "https://api.playbattlegrounds.com";

class PUBGAPI {
    constructor(token) {
        this.api = new Kitsu({
            baseURL: PUBG_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.api+json'
            },
            pluralize: false
        });
    }

    getStatus() {
        return this.api.get('status').then(({data}) => data, (err) => {
            throw err;
        })
    }

    getMatches(shard, filters = {}) {
        return this.api.get(`shards/${shard}/matches`, {
            filter: filters
        }).then(({data}) => data, (err) => {
            throw err;
        })
    }
}

export default PUBGAPI;