class Airplane {
  constructor({
    modelName,
    manufacturer,
    yearIntroduced,
    category,
    status,
    country,
    rangeKm,
    maxPassengersEfficiency,
  }) {
    this.modelName = modelName;
    this.manufacturer = manufacturer;
    this.yearIntroduced = yearIntroduced;
    this.category = category;
    this.status = status;
    this.country = country;
    this.rangeKm = rangeKm;
    this.maxPassengersEfficiency = maxPassengersEfficiency;
  }

  toView() {
    return {
      modelName: this.modelName,
      make: this.manufacturer,
      year: this.yearIntroduced,
      civilOrMilitary: this.category,
      currentState: this.status,
      country: this.country,
      rangeKm: this.rangeKm,
      maxPassengersEfficiency: this.maxPassengersEfficiency,
    };
  }
}

module.exports = Airplane;
