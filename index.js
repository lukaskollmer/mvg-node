'use strict';
const request = require('request');

const makeRequest = url => {
  return new Promise((resolve, reject) => {
    const options = {
      url : `https://www.mvg.de/fahrinfo/api${url}`,
      headers: {'X-MVG-Authorization-Key' : '5af1beca494712ed38d313714d4caff6'}
    };

    request(options, (err, response, body) => {
      if (err) { reject(err) };
      resolve(JSON.parse(body));
    });
  });
}

exports.allStations = async callback => {
  return await makeRequest('/location/queryWeb?q=');
}

// Get all upcoming departures from a station.
// The `station` parameter can either be a `Station` object, or a Number identifying the station's id
exports.getDepartures = async station => {
  let departures = await makeRequest(`/departure/${station.id}?footway=0`);

	return departures['departures'].map(departure => {
		departure.time = new Date(departure.departureTime);
		return departure;
	});

	return departures;
}

// Get a specific station, either by station id or by name.
// If `input` is a Number, this returns the station associated with that Number
// If `input` is a String, this returns an array of stations that contain the passed name
exports.getStation = async input => {
  let endpoint = typeof input === 'number' ? '/location/query' : '/location/queryWeb'

  return (await makeRequest(`${endpoint}?q=${input}`)).locations[0];
}

// Search stations by name
exports.getStations = async name => {
  return (await makeRequest(`/location/queryWeb?q=${name}`)).locations;
}

// Little helper to get a station object from a station object, a string or a number (station id)
const toStation = async input => {
	if (input instanceof Object) {
		return input
	} else {
		return await exports.getStation(input);
	}
}

// Get a route between two stations.
// `start` and `end` can either be a `Station` id, a `Number`, or a `String`
// `options` can either a `Date` object (the start time of the route) or an object containing the following keys: start, arrival, maxTravelTimeFootwayToStation, maxTravelTimeFootwayToDestination
// TODO: We could add support for coordinates in the future
exports.getRoute = async (start, destination, options = new Date()) => {
	start = await toStation(start);
	destination = await toStation(destination);

	if (options instanceof Date) {
		options = { time: options.getTime() }
	}

	options['fromStation'] = start.id;
	options['toStation'] = destination.id;

	let params = Object.entries(options).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');

	let response = await makeRequest(`/routing/?${params}`);

  response['connectionList'].forEach(connection => {
    connection.departure = new Date(connection.departure).toLocaleString();
  })

	return response['connectionList'];
}
