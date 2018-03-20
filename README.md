# PUBGAPI

A simple wrapper for the PUBG API. Uses [kitsu](https://github.com/wopian/kitsu) to interact with the api and transform complex responses to a more traditional format.

## Installation
```
yarn add pubg-api-wrapper --save
npm install pubg-api-wrapper --save
```

## Usage

### Importing

The best way to use the wrapper is to import it with ES6 style syntax. 
I personally like to alias the package to another name for readability.

`import { pubgApiWrapper as PUBG } from 'pubg-api-wrapper';`

### Actually using the thing

The wrapper has been written as an ES6 class. That means you get fancy stuff like
constructors! So, to get an instance of this puppy, try the following:

`const api = new pubgApiWrapper('a_pubg_api_token_here');`

Remember, PUBG API tokens are non-expiring and non-domain attached, so keep yours
super secret and never publish it where someone can access it. This wrapper is meant
for use in **server side** javascript contexts, not client side.

Now, `api` is available to call any of the functions made available through the wrapper.

Check them out below:

# Reference

## getStatus()

Fetch the status of the API

### Params:
- none
### Returns:
Status data from the PUBG API in the following format if successful:

    {
        id: string,
        releasedAt: datetime,
        type: string,
        version: string
    }

If the API fails, you'll get the error from the API passed through to your app. Use `catch` to process it.

## getMatches(shard, filters)
Fetch match objects from the API, applying filters as needed

### Params:
- **shard** - the shard you'd like matches from. [See the PUBG API for more details](https://documentation.playbattlegrounds.com/en/making-requests.html#regions)
- **filters** - an optional object containing key value pairs to filter the matches. You can use any of the filters from the [PUBG API documentation for matches](https://documentation.playbattlegrounds.com/en/matches.html#/Matches/get_matches) 
- **offset** - an optional int used in paging for offseting the results to return
- **limit** - an optional int used to cap the number of results returned in the request
- **sort** - an optional string used to determine the order of the returned results. Check the API documentation for options: [PUBG API documentation for matches](https://documentation.playbattlegrounds.com/en/matches.html#/Matches/get_matches) 

### Returns:
A pretty complex array of match objects:

    [
        {
            "type": string,
            "id": string,
            "links": {
                "schema": string,
                "self": string
            },
            "assets": [
                {
                    "type": string,
                    "id": string,
                    "URL": string,
                    "createdAt": datetime,
                    "description": string,
                    "name": string
                }
            ],
            "rosters": [
                {
                    "type": string,
                    "id": string,
                    "participants": [
                        {
                            "type": string,
                            "id": string,
                            "actor": string,
                            "shardId": string,
                            "stats": {
                                "DBNOs": int,
                                "assists": int,
                                "boosts": int,
                                "damageDealt": int,
                                "deathType": string,
                                "headshotKills": int,
                                "heals": int,
                                "killPlace": int,
                                "killPoints": int,
                                "killPointsDelta": double,
                                "killStreaks": int,
                                "kills": int,
                                "lastKillPoints": int,
                                "lastWinPoints": int,
                                "longestKill": int,
                                "mostDamage": int,
                                "name": string,
                                "playerId": string,
                                "revives": int,
                                "rideDistance": int,
                                "roadKills": int,
                                "teamKills": int,
                                "timeSurvived": int,
                                "vehicleDestroys": int,
                                "walkDistance": double,
                                "weaponsAcquired": int,
                                "winPlace": int,
                                "winPoints": int,
                                "winPointsDelta": double
                            }
                        }
                    ],
                    "shardId": string,
                    "stats": {
                        "rank": int,
                        "teamId": int
                    },
                    "won": string
                }
            ],
            "rounds": [],
            "spectators": [],
            "createdAt": datetime,
            "duration": int,
            "gameMode": string,
            "patchVersion": string,
            "shardId": string,
            "stats": null,
            "tags": null,
            "titleId": string
        }
    ]


## Examples

Fetching all recent matches for pc-na:

    import { pubgApiWrapper as PUBG } from 'pubg-api-wrapper';

    const api = new PUBG('my_super_secret_token');

    let matches;

    api.getMatches('pc-na').then((data) => {
        matches = data;
    }).catch((err) => {
        throw err;
    });
