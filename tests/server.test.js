const test = require('node:test');
const assert = require('node:assert');
const { once } = require('node:events');

// Requiring server.js boots the app; npm test sets PORT=0 for an ephemeral port.
const { server } = require('../server');

// Subscribe immediately, before the asynchronous bind can complete.
const serverReady = once(server, 'listening');

let BASE;

test.before(async () => {
  await serverReady;
  BASE = `http://localhost:${server.address().port}`;
});

test.after(() => {
  server.close();
});

test('serves the static frontend with no-store caching', async () => {
  const res = await fetch(`${BASE}/`);
  const body = await res.text();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.headers.get('cache-control'), 'no-store');
  assert.match(body, /100 Airplanes/);
});

test('GET /api/session reports unauthenticated without a login', async () => {
  const res = await fetch(`${BASE}/api/session`);

  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { authenticated: false });
});

test('GET /api/airplanes is rejected without a session', async () => {
  const res = await fetch(`${BASE}/api/airplanes`);

  assert.strictEqual(res.status, 401);
  assert.deepStrictEqual(await res.json(), { error: 'Authentication required' });
});

test('POST /api/login rejects an unknown username', async () => {
  const res = await fetch(`${BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'nobody', password: 'password1' }),
  });

  assert.strictEqual(res.status, 401);
  assert.deepStrictEqual(await res.json(), { error: 'Invalid username or password' });
});

test('POST /api/login rejects a wrong password for a known account', async () => {
  const res = await fetch(`${BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'account1', password: 'wrong' }),
  });

  assert.strictEqual(res.status, 401);
  assert.deepStrictEqual(await res.json(), { error: 'Invalid username or password' });
});

test('login, authenticated access, and logout complete the full session lifecycle', async () => {
  const loginRes = await fetch(`${BASE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'account1', password: 'password1' }),
  });

  assert.strictEqual(loginRes.status, 200);
  assert.deepStrictEqual(await loginRes.json(), { success: true, username: 'account1' });

  const cookie = loginRes.headers.get('set-cookie').split(';')[0];

  const sessionRes = await fetch(`${BASE}/api/session`, { headers: { Cookie: cookie } });
  assert.deepStrictEqual(await sessionRes.json(), {
    authenticated: true,
    username: 'account1',
  });

  const airplanesRes = await fetch(`${BASE}/api/airplanes`, { headers: { Cookie: cookie } });
  assert.strictEqual(airplanesRes.status, 200);
  const { airplanes } = await airplanesRes.json();
  assert.strictEqual(airplanes.length, 100);
  assert.strictEqual(airplanes[0].modelName, 'Boeing 737-800');

  const logoutRes = await fetch(`${BASE}/api/logout`, {
    method: 'POST',
    headers: { Cookie: cookie },
  });
  assert.strictEqual(logoutRes.status, 200);
  assert.deepStrictEqual(await logoutRes.json(), { success: true });

  const afterLogout = await fetch(`${BASE}/api/session`, { headers: { Cookie: cookie } });
  assert.deepStrictEqual(await afterLogout.json(), { authenticated: false });
});
