import test from 'ava';
import mvg from '.';

test('Load station', async t => {
  const station = await mvg.getStation(953);

  const expectedStationInfo = {
    type: 'station',
    latitude: 48.108379,
    longitude: 11.663822,
    id: 953,
    place: 'München',
    name: 'Feldbergstraße',
    hasLiveData: true,
    hasZoomData: false,
    products: ['b'],
    lines: {
      tram: [],
      nachttram: [],
      sbahn: [],
      ubahn: [],
      bus: [],
      nachtbus: [],
      otherlines: []
    }
  };

  t.deepEqual(station, expectedStationInfo);
});
