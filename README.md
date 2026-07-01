# Hotel-Management-System

## Project Overview

EUTELIA is a hotel billing department system built with React.js frontend, Flask backend, and MySQL using raw SQL through `mysql-connector-python`.

## Setup

1. Install backend dependencies:
   ```powershell
   cd backend
   pip install -r requirements.txt
   ```
2. Configure environment variables:
   - `EUTELIA_SECRET_KEY`
   - `EUTELIA_DB_HOST`
   - `EUTELIA_DB_PORT` (defaults to `3307` for the included XAMPP setup)
   - `EUTELIA_DB_USER`
   - `EUTELIA_DB_PASSWORD`
   - `EUTELIA_DB_NAME` (defaults to `hotel_billing`)
3. Initialize MySQL database only if tables are missing in `hotel_billing`:
   - Run `backend/db_init.sql` against your MySQL server if you need to create the tables and seed the default admin user.
4. Start backend:
   ```powershell
   python backend/app.py
   ```
5. Install frontend dependencies and build the frontend served by Flask:
   ```powershell
   cd frontend
   npm install
   npm run build
   ```
6. Open `http://127.0.0.1:5000/` or the network URL printed by Flask.

## API Endpoints

- `POST /api/auth/login`
- `GET /api/users/`
- `POST /api/users/`
- `GET /api/invoices/`
- `POST /api/invoices/`
- `PUT /api/invoices/<id>`
- `GET /api/reports/summary`

## Notes

The frontend includes the landing page, login page, and dashboard with styling and layout matching the provided luxury hotel design references.

