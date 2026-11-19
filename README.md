# Travelia Travel Admin

A separate React + Vite admin dashboard and Express + MongoDB API for managing travel packages. The existing travel website is not modified.

## Requirements
- Node.js 18 or newer (Vite 5)
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## 1. Start the backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and set your MongoDB connection string:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/travel_admin
CLIENT_URL=http://localhost:5173
```

Start the API:

```bash
npm run dev
```

The API health check is `http://localhost:5000/api/health`.

## 2. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Copy `.env.example` to `.env` if you need a different API URL. Default is `http://localhost:5000/api`.

```bash
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Features
- Dashboard overview with live package counts and capacity summary
- Create, read, update and delete travel packages
- Search by title, destination, country or category
- Filter by Active / Inactive status
- Responsive blue-and-white admin interface
- Form validation and API error feedback

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/travels` | List packages (optional `?search=` and `?status=`) |
| GET | `/api/travels/:id` | Get one package |
| POST | `/api/travels` | Create a package |
| PUT | `/api/travels/:id` | Update a package |
| DELETE | `/api/travels/:id` | Delete a package |
| GET | `/api/health` | API health check |

## Notes
- This starter project does not include admin login/authentication. Add authentication and authorization before deploying it publicly.
- Images are stored as image URLs, not uploaded files. Use public image URLs or add an image-storage service later.
- Booking and customer navigation items are visual placeholders for future modules; package CRUD is fully wired to the API.
