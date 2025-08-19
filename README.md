# 🎯 SubTrack – SaaS Subscription Management Dashboard

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/selim1920/Subtrack/main.yml?branch=main&style=for-the-badge)](https://github.com/selim1920/Subtrack/actions) 
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)](https://www.docker.com/) 
[![Angular](https://img.shields.io/badge/Angular-19-red?style=for-the-badge&logo=angular)](https://angular.io/) 
[![Laravel](https://img.shields.io/badge/Laravel-12-red?style=for-the-badge&logo=laravel)](https://laravel.com/) 

---

## 🔍 Project Overview

**SubTrack** is a powerful subscription management dashboard designed to help users keep track of all their subscriptions in one place.  

### Features:
- Add and manage subscriptions (Netflix, GitHub, Figma, etc.)
- Set renewal dates and receive timely email alerts
- Visualize monthly and yearly spending
- Export subscription data in CSV or PDF format

SubTrack simplifies subscription tracking, prevents missed payments, and provides insights into spending habits.

---

## 🧱 Tech Stack

| Layer         | Technology                  |
| ------------- | --------------------------- |
| Frontend      | Angular 19 + TypeScript     |
| Backend       | Laravel 12 (REST API)       |
| Authentication| Laravel Passport            |
| Database      | PostgreSQL                  |
| DevOps        | Docker, GitHub Actions, Kubernetes |
| Payments      | Stripe                      |
| Notifications | Email (SMTP)                |

---

## 🧩 Core Features

### 👤 User Management
- Registration, login, logout (JWT/Sanctum)
- Profile update & password change
- Default currency selection (USD, EUR, etc.)

### 📋 Subscription CRUD
- Full CRUD: Create, Read, Update, Delete
- Fields: Name, Provider, Amount, Billing Cycle, Next Payment Date, Notes, Tags
- File upload (logo or receipt)

### 🔔 Notifications & Alerts
- Email alerts 3 days before renewal
- Optional: Discord notifications
- Daily background job checks

### 📊 Analytics Dashboard
- Total spending per month/year
- Bar charts: monthly expenses
- Pie charts: spending categories
- Trend analysis & historical data

### 🧾 Export
- CSV or PDF export
- Monthly and yearly summaries

### 💳 Stripe Integration (Optional)
- Multi-currency support
- Payment management via Laravel Cashier

---

## 📐 Project Architecture

### Backend (Laravel)
 app/
├── Actions/ # Specific business actions
├── DTOs/ # Data Transfer Objects
├── Http/
│ ├── Controllers/
│ └── Resources/ # API response formatting
├── Models/ # Eloquent models
├── Notifications/ # Email/notification logic
├── Services/ # Business logic services
└── Jobs/ # Scheduled background jobs

- Actions/DTOs/Services separate concerns for cleaner architecture
- Scheduled jobs handle upcoming payments

### Frontend (Angular)
src/
├── app/
│ ├── auth/ # Auth components & services
│ ├── subscriptions/ # CRUD UI
│ ├── dashboard/ # Analytics
│ └── settings/ # User preferences
├── shared/
│ ├── components/ # Reusable UI components
│ └── services/ # API calls & utilities

- Lazy-loaded modular routing
- Reactive programming with RxJS
- Charts via Chart.js or NGX-Charts

---

## 🔧 DevOps Setup

### Docker
- Containers: Laravel (php-fpm), PostgreSQL, Redis, Nginx, Node (Angular)
- Docker Compose separates backend, frontend, database, cache

### CI/CD (GitHub Actions)
- Backend: tests (Pest), linting, PHPStan
- Frontend: tests (Jest/Karma), lint, build
- Docker image builds & deploy

### Tools
- Trivy: Security scanning
- Sentry: Error monitoring
- Watchtower: Auto-updating containers
- MailHog: Dev email testing

---

## 🧪 Testing

### Backend
- Unit tests: Services & Actions
- Feature tests: Subscription API & Notifications

### Frontend
- Unit tests: Services
- Integration tests: UI flows (Add Subscription)

---

## 🕐 Suggested Timeline (2 Months)

| Week | Tasks |
|------|-------|
| 1    | Requirements, architecture, CI/CD & Docker setup |
| 2    | Authentication (Laravel + Angular) |
| 3    | Subscription CRUD (API + UI) |
| 4    | Analytics & charts |
| 5    | Email/Notification jobs & scheduler |
| 6    | CSV/PDF Export & Stripe integration |
| 7    | Testing + UI polish |
| 8    | Final review, staging deployment, documentation |

---

## 📁 Folder Structure

/subtrack/
├── backend/ # Laravel project
├── frontend/ # Angular project
├── docker/
│ ├── nginx/
│ └── php/
├── docker-compose.yml
├── README.md
└── .github/workflows/




---

## 🚀 Run Locally

```bash
# Clone repository
git clone https://github.com/selim1920/Subtrack.git
cd Subtrack

# Start Docker containers
docker-compose up -d

# Backend
cd backend
composer install
php artisan migrate
php artisan serve

# Frontend
cd frontend
npm install
ng serve
Open your browser: http://localhost:4200

📞 Contact

Author: Selim Merzoug
Email: merzougselim19@gmail.com

GitHub: https://github.com/selim1920


---

Si tu veux, je peux faire **une version encore plus visuelle avec icônes, couleurs, et sections “Pro Tips”**, parfaite pour un dépôt GitHub ultra-pro.  

Veux‑tu que je fasse ça ?
