const test = require('node:test');
const assert = require('node:assert');
const Airplane = require('../src/Airplane');

test('constructor stores all eight fields', () => {
  const airplane = new Airplane({
    modelName: 'Boeing 737-800',
    manufacturer: 'Boeing',
    yearIntroduced: 1998,
    category: 'Civil',
    status: 'Active',
    country: 'United States',
    rangeKm: 3582,
    maxPassengersEfficiency: 189,
  });

  assert.strictEqual(airplane.modelName, 'Boeing 737-800');
  assert.strictEqual(airplane.manufacturer, 'Boeing');
  assert.strictEqual(airplane.yearIntroduced, 1998);
  assert.strictEqual(airplane.category, 'Civil');
  assert.strictEqual(airplane.status, 'Active');
  assert.strictEqual(airplane.country, 'United States');
  assert.strictEqual(airplane.rangeKm, 3582);
  assert.strictEqual(airplane.maxPassengersEfficiency, 189);
});

test('toView renames fields for the API shape', () => {
  const view = new Airplane({
    modelName: 'C-130 Hercules',
    manufacturer: 'Lockheed',
    yearIntroduced: 1956,
    category: 'Military',
    status: 'Active',
    country: 'United States',
    rangeKm: 2360,
    maxPassengersEfficiency: 92,
  }).toView();

  assert.deepStrictEqual(view, {
    modelName: 'C-130 Hercules',
    make: 'Lockheed',
    year: 1956,
    civilOrMilitary: 'Military',
    currentState: 'Active',
    country: 'United States',
    rangeKm: 2360,
    reaches10kKm: false,
    maxPassengersEfficiency: 92,
  });
});

test('reaches10kKm is true at or above the 6400 threshold', () => {
  const at = new Airplane({ modelName: 'At', rangeKm: 6400 }).toView();
  const above = new Airplane({ modelName: 'Above', rangeKm: 15006 }).toView();

  assert.strictEqual(at.reaches10kKm, true);
  assert.strictEqual(above.reaches10kKm, true);
});

test('reaches10kKm is false below the 6400 threshold', () => {
  const below = new Airplane({ modelName: 'Below', rangeKm: 6399 }).toView();

  assert.strictEqual(below.reaches10kKm, false);
});
