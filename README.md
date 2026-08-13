# MK DATA

MK DATA is a mobile-first Nigerian digital services application built to support wallet funding, mobile data purchases, and transaction history tracking.

## Project structure

- `backend/`: Node.js + Express API with mock database and authentication.
- `frontend/`: React mobile-first UI for registration, login, dashboard, wallet, data purchase, and admin views.

## Features

- User registration, login, logout, profile
- Wallet balance display and funding
- Mobile data purchase for MTN, Airtel, Glo, 9mobile
- Transaction history list and recent activity
- Admin dashboard for users, transactions, wallet funding, and order overview
- Mock payment and VTU provider layer for safe development

## Getting started

### Backend

1. Open a terminal in `backend`
2. Run `npm install`
3. Copy `.env.example` to `.env` and update `JWT_SECRET`
4. Run `npm run dev`

The backend will be available at `http://localhost:4000`.

### Frontend

1. Open a terminal in `frontend`
2. Run `npm install`
3. Run `npm start`

The frontend will open at `http://localhost:3000` and use the backend API.

## Admin account

- Email: `admin@mkdata.com`
- Password: `Password123!`

## Notes

- This version uses an in-memory mock database. No real payments or VTU services are connected.
- The app is built as a production-ready foundation with clean REST routes, validation, protected routes, and mock service layers.
