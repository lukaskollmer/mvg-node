# mvg-node [![CircleCI](https://circleci.com/gh/lukaskollmer/mvg-node.svg?style=svg)](https://circleci.com/gh/lukaskollmer/mvg-node) [![Build Status](https://img.shields.io/travis/lukaskollmer/mvg-node.svg?style=flat-square)](https://travis-ci.org/lukaskollmer/mvg-node) [![npm](https://img.shields.io/npm/v/mvg-node.svg?style=flat-square)](https://www.npmjs.com/package/mvg-node) [![node](https://img.shields.io/node/v/mvg-node.svg?style=flat-square)](https://www.npmjs.com/package/mvg-node)

> NodeJS client for the Munich Public Transport System


## Install

```
$ npm install mvg-node
```


## Usage

### Getting departures

```js
const mvg = require('mvg-node');

(async () => {
  let home = await mvg.getStation('Feldbergstr')

  let departures = await mvg.getDepartures(home);
  console.log(departures);
})();
```

<details>
  <summary>Output</summary>

  ```
  [ { departureTime: 1500923983000,
      product: 'b',
      label: '194',
      destination: 'Trudering Bf.',
      live: true,
      lineBackgroundColor: '#0d5c70',
      departureId: 325930522,
      sev: false,
      time: 2017-07-24T19:19:43.000Z },
    { departureTime: 1500924014000,
      product: 'b',
      label: '192',
      destination: 'Neuperlach Zentrum',
      live: true,
      lineBackgroundColor: '#0d5c70',
      departureId: -120781808,
      sev: false,
      time: 2017-07-24T19:20:14.000Z },
      ... ]
  ```
</details>


## API

#### `async getStation(input) -> object`
Fetch information about a specific station

| Parameter | Description |
| :-------- | :---------- |
| `input`   | Either a `Number` (station ID) or a `String` (station name) |
| **Returns** | An `Object` containing information about a specific station. This object can be passed to the other functions |

#### `async getStations(input) -> array`
Search stations by name

| Parameter | Description |
| :-------- | :---------- |
| `name`   | The station name to search for |
| **Returns** | An `Array` of object representing stations |

#### `async allStations() -> array`
Fetch all stations

#### `async getDepartures(station) -> array`
Load a specific station's upcoming departures

| Parameter | Description |
| :-------- | :---------- |
| `station`   | Either a station object or a station id |
| **Returns** | An `Array` of upcoming departures from that station |

#### `async getRoute(start, destination, options) -> array`
Get routes between two stations

| Parameter | Description |
| :-------- | :---------- |
| `start`   | The route's starting point (either a station object, or a station id (Number) or a station name (String) |
| `destination`   | The route's destination (either a station object, or a station id (Number) or a station name (String) |
| `options`   | Either a date object (the route's starting time) or some more options (`start`, `arrival`, `maxTravelTimeFootwayToStation`, `maxTravelTimeFootwayToDestination`) |
| **Returns** | An `Array` of routes between the two stations |

## CLI

```
$ npm install --global mvg-node
```
<details>
  <summary>Usage</summary>

```
$ mvg-node --help

  NodeJS client for the Munich Public Transport System

  Usage
    $ mvg-node [input] <options>

  Commands
     station      Get information about a specific station
     departures   Get upcoming departures for a specific station.

  Options
     --all        By default, this shows the next 10 departures. Pass `--all` to get all upcoming departures


  Examples
    $ mvg-node station 953

    $ mvg-node departures 'Hauptbahnhof'
```
</details>

### Get departures

```bash
$ node cli.js departures 'Hauptbahnhof'
```

```
Upcoming departures for 'Hauptbahnhof':
┌─────────┬────────────────────────────────────────┐
│   ⏳    │                                        │
├─────────┼────────────────────────────────────────┤
│ 1 min   │ S8 Herrsching                          │
├─────────┼────────────────────────────────────────┤
│ 1 min   │ U5 Neuperlach Süd                      │
├─────────┼────────────────────────────────────────┤
│ 1 min   │ U1 Olympia - Einkaufszentrum           │
├─────────┼────────────────────────────────────────┤
│ 1 min   │ U1 Mangfallplatz                       │
├─────────┼────────────────────────────────────────┤
│ 2 min   │ U5 Laimer Platz                        │
├─────────┼────────────────────────────────────────┤
│ 2 min   │ Bus 58 Silberhornstraße                │
├─────────┼────────────────────────────────────────┤
│ 3 min   │ S7 Höhenkirchen-Siegertsbrunn          │
├─────────┼────────────────────────────────────────┤
│ 4 min   │ U2 Feldmoching                         │
├─────────┼────────────────────────────────────────┤
│ 4 min   │ Tram 16 Romanplatz                     │
├─────────┼────────────────────────────────────────┤
│ 4 min   │ U2 Messestadt Ost                      │
└─────────┴────────────────────────────────────────┘
```



## License

MIT © [Lukas Kollmer](https://lukaskollmer.me)

`myg-node` was inspired by [leftshift/python_mvg_api](https://github.com/leftshift/python_mvg_api)
