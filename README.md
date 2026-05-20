# ✈️ 100 Airplanes: Artistic OOP Aircraft Explorer
A lightweight browser application to explore 100 popular civil and military airplanes using a clean, artistic, text-first interface.

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-Web_App-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img alt="OOP" src="https://img.shields.io/badge/Architecture-OOP-1E3A8A?style=for-the-badge" />
  <img alt="Dataset" src="https://img.shields.io/badge/Dataset-100_Airplanes-7C3AED?style=for-the-badge" />
</p>

---

## ✨ Features

* **Curated Dataset:** Includes exactly 100 diverse civil and military aircraft.
* **Smart Navigation:** Features fluid Next/Previous browsing and a quick click-to-select sidebar.
* **Instant Search:** Fast filtering by airplane model name.
* **OOP Architecture:** Built with Object-Oriented Programming for clean data modeling and retrieval.
* **Rich Metadata:** Detail view displays:
  * Model Name & Manufacturer (Make)
  * Year of Introduction & Country of Origin
  * Category (Civil/Military) & Current Operational State
  * Flight Range & Max Passenger Capacity (Efficiency Configuration)

---

## 🧱 Tech Stack

* **Backend:** Node.js + Express
* **Frontend:** Vanilla JavaScript, HTML5, CSS3
* **Design Focus:** Artistic typography and a minimalist, highly styled layout
* **Architecture Pattern:** Data layer handled via `Airplane` model and `AirplaneRepository` classes

---

## 📁 Project Structure

```text
100-airplanes/
├── src/
│   ├── Airplane.js
│   ├── AirplaneRepository.js
│   └── airplanesData.js
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── package.json
└── server.js
```

---

## 🚀 Run Locally

1. **Navigate to the project directory:**
   ```bash
   cd /Users/user/Downloads/100-airplanes
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local server:**
   ```bash
   npm start
   ```

4. **View in browser:**
   Open [http://localhost:3000](http://localhost:3000) in your preferred web browser.

---

## 🔌 API Documentation

### Get All Airplanes
Returns the complete airplane collection used to populate the frontend interface.

* **Endpoint:** `GET /api/airplanes`
* **Response Format:** `application/json`

**Example Response:**
```json
{
  "airplanes": [
    {
      "modelName": "Boeing 737-800",
      "make": "Boeing",
      "year": 1998,
      "civilOrMilitary": "Civil",
      "currentState": "Active",
      "country": "United States",
      "rangeKm": 5765,
      "maxPassengersEfficiency": 189
    }
  ]
}
```

---

## 🎯 Purpose
This application prioritizes rapid UI navigation and highly readable aircraft metadata. It is purpose-built for users who appreciate a clean, catalog-style digital exploration experience.
