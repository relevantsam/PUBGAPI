'use strict';

const Kitsu = require('kitsu');
const PUBG_API_URL = "https://api.playbattlegrounds.com";

export class pubgApiWrapper {
    constructor(token) {
        this.token = token;
        this.updateBaseURL(PUBG_API_URL)
    }

    updateBaseURL(url) { 
        this.api = new Kitsu({
            baseURL: url,
            headers: {
                Authorization: `Bearer ${this.token}`,
                Accept: 'application/vnd.api+json'
            },
            pluralize: false
        });
    }

    getStatus() {
        this.updateBaseURL(PUBG_API_URL);
        return this.api.get('status').then(({data}) => data, (err) => {
            throw err;
        })
    }

    getMatches(shard, filters = {}, offset=0, limit=5, sort="createdAt") {
        this.updateBaseURL(`${PUBG_API_URL}/shards/${shard}`);
        let params = { filter: filters, sort: sort };
        if(offset != 0 && limit != 0) params.page = {limit: limit, offset: offset};

        return this.api.get(`matches`, params).then(({data}) => data, err => {
            throw err;
        })
    }

    getMatch(shard, id) {
        this.updateBaseURL(`${PUBG_API_URL}/shards/${shard}`);
        return this.api.get(`matches/${id}`).then(({data}) => data, err => {
            throw err;
        })
    }
};