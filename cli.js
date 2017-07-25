#!/usr/bin/env node
'use strict';
const meow = require('meow');
const chalk = require('chalk');
const moment = require('moment');
const Table = require('cli-table');
const mvg = require('.');

const cli = meow(`
	Usage
	  $ mvg-node [input] <options>

	Commands
    station      Get information about a specific station
    departures   Get upcoming departures for a specific station.

	Options
    --all        By default, this shows the next 10 departures. Pass \`--all\` to get all upcoming departures


	Examples
	  $ mvg-node station 953

	  $ mvg-node departures 'Hauptbahnhof'
`);

(async () => {
  switch (cli.input[0]) {
    case 'station': {
      const station = await mvg.getStation(cli.input[1]);
      const output =
`Name: ${station.name}
ID: ${station.id}
Place: ${station.place}
Products: ${station.products}
Latitude: ${station.latitude}
Longitude: ${station.longitude}
HasLiveData: ${station.hasLiveData}
HasZoomData: ${station.hasZoomData}`;

      console.log(output);
      break;
    }
    case 'departures': {
      const station = await mvg.getStation(cli.input[1]);
      let departures = await mvg.getDepartures(station);

      console.log(`Upcoming departures for '${station.name}':`);

      const table = new Table({
        head: ['  ⏳', ''],
        colWidths: [9, 40]
      });

      if (!cli.flags.all) {
        departures = departures.slice(0, 10);
      }

      const type = {
        b: 'Bus ',
        s: 'S',
        u: 'U',
        t: 'Tram '
      };
      let now = moment();

      departures.forEach(d => {
        let duration = Math.ceil(moment.duration(moment(d.time).diff(now)).asMinutes());

        if (duration < 5) {
          duration = chalk.red(`${duration} min`);
        } else {
          duration = chalk.green(`${duration} min`);
        }

        table.push([`${duration}`, `${type[d.product]}${d.label} ${d.destination}`]);
      });
      console.log(table.toString());
      break;
    }
    default: break;
  }
})();

// console.log(mvg(cli.input[0] || 'unicorns'));
