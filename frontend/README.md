# 🌍 **Multilingual Travel Guide – Frontend (React + i18n + Axios)**

The **Travel Guide Frontend** is a multilingual, responsive, user-friendly interface built using **React, Vite, React Router, i18next, and Axios**.
It integrates with the Spring Boot backend to display tourist places, user login/register, and reviews.

---

## 🚀 Features

### 🗺 Tourist Places

* View all places
* Search by **name/location**
* Filter by category (Scenic, Historical, Monument, Fort…)
* View full details of a place
* Responsive grid cards

### ⭐ Reviews

* Add review (after login)
* View reviews per place
* Auto-refresh after submission

### ❤️ Favourites

* Add/remove places from favourites
* Stored in **localStorage**

### 🌐 Full Multi-Language Support

Implemented using **i18next**

* English
* Hindi
* Marathi

### 👤 User Authentication

* Registration
* Login
* LocalStorage-based user session

---

## 🛠 Tech Stack

| Layer       | Technology   |
| ----------- | ------------ |
| Frontend    | React (Vite) |
| Routing     | React Router |
| API Calls   | Axios        |
| State       | React Hooks  |
| Translation | i18next      |
| Styles      | CSS          |
| Storage     | localStorage |

---

## 📸 Screenshots

*(You can add images here)*

```
/screenshots
   home.png
   place-details.png
   favourites.png
   login.png
```

---

## 📦 Folder Structure

```
travel-guide-frontend/
│── public/
│── src/
│   ├── components/
│   │     ├── Hero.jsx
│   │     ├── Places.jsx
│   │     ├── PlaceDetails.jsx
│   │     ├── Navbar.jsx
│   │     └── Footer.jsx
│   ├── pages/
│   │     ├── Auth/Login.jsx
│   │     ├── Auth/Register.jsx
│   │     └── Favourites/Favourites.jsx
│   ├── i18n/
│   │     ├── index.js
│   │     └── translations (en.json, hi.json, mr.json)
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
│── package.json
│── vite.config.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo

```
git clone https://github.com/pratiksha-bawaskar/travel-guide-frontend.git
cd travel-guide-frontend
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Run the app

```
npm run dev
```

- Frontend available at:
👉 [http://localhost:5173/](http://localhost:5173/)

### 4️⃣ Configure Backend URL

In `Places.jsx`, `Login.jsx`, `Register.jsx`, `PlaceDetails.jsx`, `Reviews.jsx` etc.

```
axios.get("http://localhost:8080/api/places")
```

---

## 🔗 Backend Repo Link

👉(https://github.com/pratiksha-bawaskar/travel-guide-backend)

---

## 📡 Deployment

Frontend can be deployed on:

* **Netlify**
* **GitHub Pages**

**For Netlify:**

1. Run build

   ```
   npm run build
   ```
2. Upload `/dist` folder to Netlify
3. Set build command:

   ```
   npm run build
   ```
4. Publish directory:

   ```
   dist
   ```

---

## 👩‍💻 Author

**Pratiksha Bawaskar**
-🌟 Full Stack Java Developer | 🌟 React + Spring Boot Projects |🌟 Passionate about clean UI and real-world apps

