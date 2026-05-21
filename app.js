const nameList = document.getElementById('nameList');
const searchInput = document.getElementById('searchInput');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const modelName = document.getElementById('modelName');
const make = document.getElementById('make');
const year = document.getElementById('year');
const category = document.getElementById('category');
const status = document.getElementById('status');
const country = document.getElementById('country');
const range = document.getElementById('range');
const autonomy = document.getElementById('autonomy');
const maxPassengers = document.getElementById('maxPassengers');

let airplanes = [];
let filteredAirplanes = [];
let currentIndex = 0;

const countryFlags = {
  Brazil: '🇧🇷',
  Canada: '🇨🇦',
  China: '🇨🇳',
  Europe: '🇪🇺',
  France: '🇫🇷',
  'France/Italy': '🇫🇷🇮🇹',
  'France/United Kingdom': '🇫🇷🇬🇧',
  Germany: '🇩🇪',
  India: '🇮🇳',
  Italy: '🇮🇹',
  Japan: '🇯🇵',
  Netherlands: '🇳🇱',
  Russia: '🇷🇺',
  'South Korea': '🇰🇷',
  'Soviet Union/Russia': '🇷🇺',
  Sweden: '🇸🇪',
  Switzerland: '🇨🇭',
  Ukraine: '🇺🇦',
  'United Kingdom': '🇬🇧',
  'United States': '🇺🇸'
};

function countryWithFlag(countryName) {
  const flag = countryFlags[countryName];
  return flag ? `${countryName} ${flag}` : countryName;
}

function estimateCruiseSpeedKmh(item) {
  const model = item.modelName.toLowerCase();

  if (model.includes('ah-64') || model.includes('chinook') || model.includes('black hawk') || model.includes('mi-8') || model.includes('mi-26') || model.includes('aw101') || model.includes('dhruv')) {
    return 260;
  }

  if (model.includes('cessna 172') || model.includes('dc-3') || model.includes('an-2') || model.includes('caravan') || model.includes('air tractor')) {
    return 240;
  }

  if (model.includes('atr') || model.includes('dash 8') || model.includes('pc-12') || model.includes('islander')) {
    return 500;
  }

  if (item.civilOrMilitary === 'Military') {
    return 900;
  }

  return 840;
}

function formatAutonomyTime(item) {
  const cruiseSpeedKmh = estimateCruiseSpeedKmh(item);
  const totalMinutes = Math.max(1, Math.round((item.rangeKm / cruiseSpeedKmh) * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

function renderDetails() {
  if (!filteredAirplanes.length) {
    modelName.textContent = 'No airplane found';
    make.textContent = '';
    year.textContent = '';
    category.textContent = '';
    status.textContent = '';
    country.textContent = '';
    range.textContent = '';
    autonomy.textContent = '';
    maxPassengers.textContent = '';
    return;
  }

  const item = filteredAirplanes[currentIndex];
  modelName.textContent = item.modelName;
  make.textContent = `Make: ${item.make}`;
  year.textContent = `Year: ${item.year}`;
  category.textContent = `Civil/Military: ${item.civilOrMilitary}`;
  status.textContent = `Current State: ${item.currentState}`;
  country.textContent = `Country: ${countryWithFlag(item.country)}`;
  range.textContent = `Range: ${item.rangeKm} km`;
  autonomy.textContent = `Autonomy: ${formatAutonomyTime(item)}`;
  maxPassengers.textContent = `Max Passengers Efficiency: ${item.maxPassengersEfficiency}`;

  [...nameList.children].forEach((li, idx) => {
    li.classList.toggle('active', idx === currentIndex);
  });
}

function renderList() {
  nameList.innerHTML = '';

  filteredAirplanes.forEach((item, idx) => {
    const li = document.createElement('li');
    li.textContent = item.modelName;
    li.addEventListener('click', () => {
      currentIndex = idx;
      renderDetails();
    });
    nameList.appendChild(li);
  });

  if (currentIndex >= filteredAirplanes.length) {
    currentIndex = 0;
  }

  renderDetails();
}

function applySearch() {
  const query = searchInput.value.toLowerCase().trim();
  filteredAirplanes = airplanes.filter((item) => item.modelName.toLowerCase().includes(query));
  currentIndex = 0;
  renderList();
}

prevBtn.addEventListener('click', () => {
  if (!filteredAirplanes.length) return;
  currentIndex = (currentIndex - 1 + filteredAirplanes.length) % filteredAirplanes.length;
  renderDetails();
});

nextBtn.addEventListener('click', () => {
  if (!filteredAirplanes.length) return;
  currentIndex = (currentIndex + 1) % filteredAirplanes.length;
  renderDetails();
});

searchInput.addEventListener('input', applySearch);

async function init() {
  const res = await fetch('/api/airplanes');
  const data = await res.json();
  airplanes = data.airplanes;
  filteredAirplanes = [...airplanes];
  renderList();
}

init();
