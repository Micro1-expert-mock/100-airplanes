const Airplane = require('./Airplane');
const airplanesData = require('./airplanesData');

class AirplaneRepository {
  constructor() {
    this.airplanes = airplanesData.map((entry) => new Airplane(entry));
  }

  getAll() {
    return this.airplanes.map((airplane) => airplane.toView());
  }
}

module.exports = AirplaneRepository;
