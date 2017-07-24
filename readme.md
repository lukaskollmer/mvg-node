# mvg-node [![Build Status](https://travis-ci.org/lukaskollmer/mvg-node.svg?branch=master)](https://travis-ci.org/lukaskollmer/mvg-node) [![Coverage Status](https://coveralls.io/repos/github/lukaskollmer/mvg-node/badge.svg?branch=master)](https://coveralls.io/github/lukaskollmer/mvg-node?branch=master)

> MVG client for NodeJS


## Install

```
$ npm install mvg-node
```


## Usage

### Getting departures

```js
const mvgNode = require('mvg-node');


(async () => {
  let home    = await exports.getStation(953)
	let pullach = await exports.getStation('Pullach (im Isartal)')

	let departures = await exports.getDepartures(home);
  console.log(departures);
})();
```

Output:
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
    ...]
```


## API

### mvgNode(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global mvg-node
```

```
$ mvg-node --help

  Usage
    mvg-node [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ mvg-node
    unicorns & rainbows
    $ mvg-node ponies
    ponies & rainbows
```


## License

MIT © [Lukas Kollmer](https://lukaskollmer.me)
