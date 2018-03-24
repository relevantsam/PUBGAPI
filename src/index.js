'use strict';

const Kitsu = require('kitsu');
const PUBG_API_URL = "https://api.playbattlegrounds.com";

export class pubgApiWrapper {
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

    getMatches(shard, filters = {}, offset=0, limit=5, sort="createdAt") {
        let params = { filter: filters, sort: sort };
        if(offset != 0 && limit != 0) params.page = {limit: limit, offset: offset};

        return this.api.get(`shards/${shard}/matches`, params).then(({data}) => data, err => {
            throw err;
        })
    }

    getMatch(shard, id) {
        return this.api.get(`shards/${shard}/matches/${id}`).then(({data}) => data, err => {
            throw err;
        })
    }
};