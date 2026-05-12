const path = require('path');
const express = require('express');
const AirplaneRepository = require('./src/AirplaneRepository');

const app = express();
const airplaneRepository = new AirplaneRepository();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/airplanes', (req, res) => {
  res.json({ airplanes: airplaneRepository.getAll() });
});

app.listen(PORT, () => {
  console.log(`100 airplanes app running at http://localhost:${PORT}`);
});
