# Enterprise RAG

A full-stack research assistant platform with a Django backend and React + Vite frontend.

## Project Overview

- **Backend:** Django REST Framework with JWT auth and document ingestion/search capabilities.
- **Frontend:** React + Vite with TypeScript, Tailwind CSS, and client-side routing.
- **Purpose:** Upload and index documents, create embeddings, and search/retrieve content via a modern UI.

## Repository Structure

- `backend/`
  - Django project configured under `config/`
  - App modules: `accounts`, `documents`
  - Services for PDF parsing, embedding, vector search, and storage

- `frontend/`
  - React application using Vite
  - Pages: `Home`, `Login`, `Register`, `Dashboard`, `LegalPage`
  - Services for auth, document handling, and search

## Key Technologies

- Backend: Django 6.0, Django REST Framework, django-environ, djangorestframework-simplejwt
- Frontend: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Axios
- Data & search: `mysqlclient`, `psycopg2-binary`, document embedding services, FAISS-style index support

## Setup

### Backend

1. Create and activate a Python virtual environment:
   ```powershell
   cd backend
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

2. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```

3. Configure environment variables.
   - The backend uses `django-environ`, so create a `.env` file in `backend/`.
   - Example variables:
     ```env
     SECRET_KEY=your-secret-key
     DEBUG=True
     DATABASE_URL=postgres://user:password@localhost:5432/dbname
     ```

4. Run migrations:
   ```powershell
   python manage.py migrate
   ```

5. Start the backend server:
   ```powershell
   python manage.py runserver
   ```

### Frontend

1. Install Node dependencies:
   ```powershell
   cd frontend
   npm install
   ```

2. Start the frontend app:
   ```powershell
   npm run dev
   ```

3. Build for production:
   ```powershell
   npm run build
   ```

## Development Notes

- The backend API is exposed from Django; connect the frontend to the backend base URL in `frontend/src/api/axios.ts`.
- Authentication is handled through JWT and account APIs in `backend/apps/accounts/api/`.
- Document ingestion and search features live in `backend/apps/documents/` and related services.

## Useful Commands

- Backend migrations: `python manage.py migrate`
- Create superuser: `python manage.py createsuperuser`
- Run backend tests: `python manage.py test`
- Frontend dev server: `npm run dev`
- Frontend linting: `npm run lint`

## Notes

- The backend includes both `mysqlclient` and `psycopg2-binary`, so either MySQL or PostgreSQL can be used.
- The frontend depends on Tailwind CSS and React Router for layout and navigation.

## License

This repository does not include a license file. Add one if you intend to publish or share the project.
