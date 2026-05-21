const path = require('path');
const express = require('express');
const session = require('express-session');
const AirplaneRepository = require('./src/AirplaneRepository');

const app = express();
const airplaneRepository = new AirplaneRepository();
const PORT = process.env.PORT || 3000;

const users = {
  account1: 'password1',
  account2: 'password2',
  account3: 'password3',
  account4: 'password4',
  account5: 'password5'
};

app.use(express.json());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
app.use(
  session({
    secret: '100-airplanes-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax'
    }
  })
);

app.use(express.static(path.join(__dirname, 'public')));

function requireAuth(req, res, next) {
  if (req.session?.user) {
    return next();
  }
  return res.status(401).json({ error: 'Authentication required' });
}

app.get('/api/session', (req, res) => {
  if (!req.session?.user) {
    return res.json({ authenticated: false });
  }
  return res.json({ authenticated: true, username: req.session.user });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    req.session.user = username;
    return res.json({ success: true, username });
  }
  return res.status(401).json({ error: 'Invalid username or password' });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.get('/api/airplanes', (req, res) => {
  if (!req.session?.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  res.json({ airplanes: airplaneRepository.getAll() });
});

app.listen(PORT, () => {
  console.log(`100 airplanes app running at http://localhost:${PORT}`);
});
