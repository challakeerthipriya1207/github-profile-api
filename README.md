# GitHub Profile Analyzer API

A professional production-ready RESTful API built with Node.js, Express.js, and MySQL using the MVC (Model-View-Controller) architecture. The application fetches real-time data from the public GitHub API, extracts core user insights, and caches them efficiently in a relational database.

## 🚀 Live Demo & API Endpoints
* **Live API URL:** `YOUR_DEPLOYED_BACKEND_URL_HERE`
* **Database Hosting:** Deployed on cloud instance

### API Endpoints Documentation
* **`GET /api/github/:username`** - Fetches profile insights from GitHub, updates/saves them to the MySQL database, and returns the data.
* **`GET /api/profiles`** - Retrieves all previously analyzed and stored user profiles from the database.
* **`GET /api/profiles/:username`** - Retrieves a single stored user profile directly from the local database cache.

---

## 🛠️ Tech Stack & Architecture
* **Backend:** Node.js, Express.js
* **Database:** MySQL (with connection pooling)
* **Design Pattern:** MVC (Models/Config, Views/Routes, Controllers)
* **HTTP Client:** Axios (for external API consumption)

---

## ⚙️ Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_GITHUB_USERNAME/github-profile-api.git](https://github.com/YOUR_GITHUB_USERNAME/github-profile-api.git)
   cd github-profile-api