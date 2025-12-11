
# 🌐 InfoHub

**InfoHub** is a lightweight information dashboard that provides real-time **weather**, **currency conversion**, and **motivational quotes** — powered by a custom Node.js + Express backend and a modern frontend interface.

🔗 **Live Demo:**
👉 [InfoHub](https://ayan-info-hub.vercel.app/)

---

## 🚀 Features

### ✅ **Weather Information**

* Search any city
* Uses Open-Meteo Geocoding + Forecast API
* Returns:

  * Temperature
  * Wind speed
  * Weather code
  * City + Country

### 💱 **Currency Converter**

* Converts INR → USD, EUR
* Uses ExchangeRate-API
* Shows:

  * Converted values
  * Base exchange rates

### ✨ **Random Inspirational Quote**

* Fetches random quote + author from Quotable API

### ⚡ Fast API

Express backend deployed on Vercel for zero-latency responses.

---

## 🧠 Tech Stack

### **Frontend**

* React / Vite *(based on your repo)*
* CSS / Tailwind (if used)
* Axios for API calls

### **Backend**

* Node.js
* Express
* Axios
* CORS

### **External APIs**

* Open-Meteo Geocoding API
* Open-Meteo Weather Forecast API
* ExchangeRate-API
* Quotable API

### **Deployment**

* Vercel (frontend + serverless backend)

---

## 🧩 API Endpoints

Your backend exposes 3 main endpoints:

---

### 🌦️ **1. Weather API**

```
GET /api/weather?city=Delhi
```

#### **Response Example**

```json
{
  "name": "Delhi",
  "country": "India",
  "temperature": 27.5,
  "windspeed": 12.3,
  "winddirection": 90
}
```

---

### 💱 **2. Currency API**

```
GET /api/currency?amount=100
```

#### **Response Example**

```json
{
  "inr": 100,
  "usd": 1.20,
  "eur": 1.10,
  "baseRates": {
    "USD": 0.012,
    "EUR": 0.011
  }
}
```

---

### ✨ **3. Quote API**

```
GET /api/quote
```

#### **Response Example**

```json
{
  "quote": "Success is not final, failure is not fatal.",
  "author": "Winston Churchill"
}
```

---

## 📦 Project Structure

```
InfoHub/
│
├── api/
│   └── index.js           # Express serverless API
│
├── src/
│   ├── components/        # UI components
│   ├── pages/             # App pages
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vercel.json            # Deployment config
└── README.md
```

---

## ▶️ Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/MdAyanBadar/InfoHub.git
cd InfoHub
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Start development server

Frontend + backend (Vercel dev mode):

```bash
npm run dev
```

Open browser:

```
http://localhost:5173
```

Backend local API will be available at:

```
http://localhost:3000/api/weather
http://localhost:3000/api/currency
http://localhost:3000/api/quote
```

---

## 🌍 Deployment

Your project is already deployed on Vercel 🎉
If you redeploy:

```bash
vercel --prod
```

Vercel automatically detects:

* Frontend → React/Vite
* Backend → api/index.js (serverless function)

---

## 🛠 Future Enhancements

* 🔍 Add news API
* 🗺️ Add interactive weather map
* 📈 Add historical currency charts
* 🌙 Add dark mode
* 📱 Mobile-enhanced UI

---

## 🤝 Contributing

Pull requests are welcome!
If you'd like new features added, open an issue.

---

## 🧑‍💻 Author

**Md Ayan Badar**
Full-Stack Developer • API Integrations • Modern Web Apps
📬 Open for collaboration & ideas


