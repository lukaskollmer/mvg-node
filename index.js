'use strict';
const request = require('request');

const makeRequest = url => {
  return new Promise((resolve, reject) => {
    const options = {
      url: `https://www.mvg.de/fahrinfo/api${url}`,
      headers: {'X-MVG-Authorization-Key': '5af1beca494712ed38d313714d4caff6'}
    };

    request(options, (err, response, body) => {
      if (err) {
        reject(err);
        return;
      }
      if (typeof body === 'string' && body.startsWith('<!DOCTYPE HTML PUBLIC')) {
        resolve(null);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
};

const toStation = async input => {
  if (input instanceof Object) {
    return input;
  }
  return await exports.getStation(input);
};

exports.allStations = async () => {
  return await makeRequest('/location/queryWeb?q=');
};

exports.getDepartures = async station => {
  station = await toStation(station);
  let departures = await makeRequest(`/departure/${station.id}?footway=0`);

  return departures.departures.map(departure => {
    departure.time = new Date(departure.departureTime);
    return departure;
  });
};

exports.getStation = async input => {
  let endpoint = typeof input === 'number' ? '/location/query' : '/location/queryWeb';

  return (await makeRequest(`${endpoint}?q=${input}`)).locations[0];
};

exports.getStations = async name => {
  return (await makeRequest(`/location/queryWeb?q=${name}`)).locations;
};

exports.getNearbyStations = async (latitude, longitude) => {
  return (await makeRequest(`/location/nearby?latitude=${latitude}&longitude=${longitude}`)).locations;
};

exports.getRoute = async (start, destination, options = new Date()) => {
  start = await toStation(start);
  destination = await toStation(destination);

  if (options instanceof Date) {
    options = {time: options.getTime()};
  }

  options.fromStation = start.id;
  options.toStation = destination.id;

  let params = Object.entries(options).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');

  let response = await makeRequest(`/routing/?${params}`);
  if (response === null) return null;

  response.connectionList.forEach(connection => {
    connection.departure = new Date(connection.departure).toLocaleString();
  });

  return response.connectionList;
};
