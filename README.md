
📞 Contact

Author: Selim Merzoug
Email: merzougselim19@gmail.com

GitHub: https://github.com/selim1920


# 🎯 SubTrack – SaaS Subscription Management Dashboard

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/selim1920/Subtrack/main.yml?branch=main&style=for-the-badge)](https://github.com/selim1920/Subtrack/actions) 
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)](https://www.docker.com/) 
[![Angular](https://img.shields.io/badge/Angular-19-red?style=for-the-badge&logo=angular)](https://angular.io/) 
[![Laravel](https://img.shields.io/badge/Laravel-12-red?style=for-the-badge&logo=laravel)](https://laravel.com/) 
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

---

## 🔍 Project Overview

**SubTrack** is your all-in-one subscription management dashboard. Keep track of every subscription, get timely alerts, and visualize spending trends.  

### Key Features:
- 📝 **Manage Subscriptions**: Add, edit, and delete subscriptions
- 🔔 **Alerts**: Receive email reminders 3 days before renewal
- 📊 **Analytics**: Monthly/Yearly spending charts
- 📁 **Export Options**: CSV & PDF summaries
- 💳 **Stripe Integration** (Optional): Premium payments & multi-currency support

> 💡 **Pro Tip:** Perfect for SaaS users or freelancers who want to avoid missed payments and understand their expenses better.

---

## 🧱 Tech Stack

| Layer         | Technology                  | Badge |
| ------------- | --------------------------- | ----- |
| Frontend      | Angular 19 + TypeScript     | ![Angular](https://img.shields.io/badge/Angular-19-red?style=flat-square&logo=angular) |
| Backend       | Laravel 12 (REST API)       | ![Laravel](https://img.shields.io/badge/Laravel-12-red?style=flat-square&logo=laravel) |
| Authentication| Laravel Passport            | ![Passport](https://img.shields.io/badge/Passport-Secure-blue?style=flat-square) |
| Database      | PostgreSQL                  | ![Postgres](https://img.shields.io/badge/PostgreSQL-14-blue?style=flat-square&logo=postgresql) |
| DevOps        | Docker, GitHub Actions, Kubernetes | ![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker) |
| Notifications | Email (SMTP)                | ![Email](https://img.shields.io/badge/Email-SMTP-yellow?style=flat-square) |

---

## 🧩 Core Features

### 👤 User Management
- Registration, login, logout (JWT/Sanctum)
- Update profile & password
- Default currency selection

### 📋 Subscription CRUD
- Full CRUD operations
- Fields: Name, Provider, Amount, Billing Cycle, Next Payment Date, Notes, Tags
- File upload: logo or receipt

### 🔔 Notifications
- Email reminders 3 days before renewal
- Optional Discord notifications
- Daily background jobs for checks

### 📊 Analytics Dashboard
- Monthly & yearly spending
- Bar & pie charts
- Trend & historical data

### 🧾 Export
- CSV & PDF exports
- Monthly & yearly summaries

### 💳 Stripe (Optional)
- Multi-currency payments
- Payment management via Laravel Cashier

> 💡 **Pro Tip:** Combine analytics & export features for automated expense reports.

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
├── Services/ # Business logic
└── Jobs/ # Scheduled background jobs





### Frontend (Angular)
src/
├── app/
│ ├── auth/ # Authentication components & services
│ ├── subscriptions/ # CRUD UI
│ ├── dashboard/ # Analytics
│ └── settings/ # User preferences
├── shared/
│ ├── components/ # Reusable UI
│ └── services/ # API & utilities












> 💡 **Pro Tip:** Modular lazy-loading + RxJS ensures smooth and reactive UI experience.

---

## 🔧 DevOps & CI/CD

### Docker
- Separate containers for backend, frontend, database, cache
- Docker Compose for easy local setup

### GitHub Actions
- Backend: Pest tests, PHPStan, linting
- Frontend: Jest/Karma tests, lint, build
- Docker image build & deploy on merge

### Tools
- Trivy: Docker image security scanning
- Sentry: Error monitoring
- Watchtower: Auto-updating containers
- MailHog: Dev email testing

---

## 🧪 Testing

**Backend:** Unit tests (services/actions) + Feature tests (API & notifications)  
**Frontend:** Unit tests (services) + Integration tests (UI flows)  

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
Open: http://localhost:4200

