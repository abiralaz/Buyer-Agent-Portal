# Buyer Agent Portal

A short full-stack real estate portal with authentication, role-based access, property browsing, and favourites.

## Tech Stack

- Frontend: React + Vite + React Router + Axios + TailwindCSS
- Backend: Node.js + Express + MongoDB (Mongoose) + JWT

## Roles and Permissions

There are **3 roles** in the system:

- `buyer`
  - Sign up and login
  - View dashboard
  - Browse properties
  - Add/remove favourites

- `agent`
  - All buyer features
  - Access `Properties` management page
  - Add new properties

- `admin` (single fixed admin)
  - All agent features
  - Access `Users` page (view all registered users)

## Fixed Credentials

- Admin user (only admin account):
  - Email: `admin@admin.com`
  - Password: `adminUser`

- Demo buyer:
  - Email: `buyer@example.com`
  - Password: `Password123`

## Auth and Signup/Login Flow

- Signup:
  - Route: `/signup`
  - Allowed roles at signup: `buyer`, `agent`
  - `admin` cannot be selected in UI and is blocked in backend.
  - `admin@admin.com` is reserved and cannot be registered.

- Login:
  - Route: `/login`
  - On success, JWT token + user info are saved in localStorage.
  - Protected routes check auth token and role.

- Admin account behavior:
  - If `admin@admin.com` does not exist yet, backend auto-creates it on first admin login attempt with password `adminUser`.

## Main Frontend Routes

- `/login` - login page
- `/signup` - signup page
- `/dashboard` - authenticated users
- `/users` - admin only
- `/properties` - admin and agent
- `/properties/new` - admin and agent (add property form)

## Backend API Overview

- Auth
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/auth/me`

- Properties
  - `GET /api/property` (public)
  - `POST /api/property` (admin/agent)

- Favourites
  - `GET /api/favourite` (auth)
  - `POST /api/favourite/:propertyId` (auth)
  - `DELETE /api/favourite/:propertyId` (auth)

- Users
  - `GET /api/users` (admin only)

## Quick Setup

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
```

Set your `.env` values (important: `MONGODB_URI`, `JWT_SECRET`), then run:

```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

Optional seed:

```bash
npm run seed
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---
