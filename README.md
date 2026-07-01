# Student Management System — Frontend

React app styled with Bootstrap 5 (via CDN, kept intentionally simple).

## Setup (Local)

1. Install dependencies:
   ```
   cd frontend
   npm install
   ```
2. Create a `.env` file (copy from `.env.example`):
   ```
   APP_URL=http://localhost:5000
   ```
3. Run the app:
   ```
   npm start
   ```
   App runs at `http://localhost:3000`.

## Pages

- `/` — Login (UI only)
- `/dashboard` — Total / CS / Mechanical / Electrical student counts
- `/students` — Student list with search, add, edit, delete
- `/students/add` — Add student form
- `/students/edit/:id` — Edit student form
- `*` — 404 Not Found page

## Deploying on Vercel

1. Push this `frontend` folder to GitHub.
2. On Vercel, import the repo and set **Root Directory** to `frontend`.
3. Framework preset: Create React App.
4. Add Environment Variable:
   - `APP_URL` = your deployed backend URL (from Render)
5. Deploy. Copy the live frontend URL for submission.
