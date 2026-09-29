const test = require('node:test');
const assert = require('node:assert');
const AirplaneRepository = require('../src/AirplaneRepository');
const airplanesData = require('../src/airplanesData');

test('dataset contains exactly 100 airplanes with the expected fields', () => {
  assert.strictEqual(airplanesData.length, 100);

  const expectedKeys = [
    'modelName',
    'manufacturer',
    'yearIntroduced',
    'category',
    'status',
    'country',
    'rangeKm',
    'maxPassengersEfficiency',
  ];

  airplanesData.forEach((entry) => {
    assert.deepStrictEqual(Object.keys(entry).sort(), [...expectedKeys].sort());
    assert.strictEqual(typeof entry.modelName, 'string');
    assert.strictEqual(typeof entry.rangeKm, 'number');
    assert.strictEqual(typeof entry.maxPassengersEfficiency, 'number');
    assert.match(entry.category, /^(Civil|Military)$/);
  });
});

test('getAll returns one view object per data record', () => {
  const all = new AirplaneRepository().getAll();

  assert.strictEqual(all.length, 100);
  assert.strictEqual(all[0].modelName, 'Boeing 737-800');
  assert.strictEqual(all[0].make, 'Boeing');
  assert.strictEqual(all[0].rangeKm, 3582);
  assert.strictEqual(all[0].reaches10kKm, false);
});

test('exactly 23 airplanes carry the "Reaches 10k km" label', () => {
  const all = new AirplaneRepository().getAll();
  const labeled = all.filter((airplane) => airplane.reaches10kKm);

  assert.strictEqual(labeled.length, 23);
  assert.strictEqual(
    labeled.some((airplane) => airplane.modelName === 'KC-135 Stratotanker'),
    true
  );
});
