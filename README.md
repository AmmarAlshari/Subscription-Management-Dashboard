# **Subscription Management Dashboard**

A full stack web application to **track subscription services**, get **renewal reminders**, and analyze **subscription costs**. Built with **Django + DRF** for the backend and **React + TypeScript** for the frontend.  

This project was developed as a **take home assignment** for a software engineer role.

---

## **Features**

- Add, view, update, and delete subscriptions.  
- Automatically calculate renewal dates based on billing cycle (monthly/yearly).  
- Show total monthly and yearly subscription costs.  
- Highlight subscriptions expiring within 7 days.  
- Cost breakdown by category.  
- Responsive dashboard for better usability on all devices.

---

## **Project Structure**

SMD/
├─ backend/ # Django + DRF backend
├─ frontend/ # React + TypeScript frontend



- **backend/** contains Django models, serializers, viewsets, and API endpoints.  
- **frontend/** contains React components, API calls, and UI for displaying subscriptions.

---

## **Prerequisites**

- Python 3.10+  
- Node.js 18+ and npm/yarn/pnpm  
- PostgreSQL or SQLite (SQLite used by default for simplicity)  

---

## **Backend Setup (Django + DRF)**

1. Navigate to the backend folder:

```bash
cd backend
```

2. Create a virtual environment and activate it:

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Apply migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create a superuser (for Django admin):
   
```bash
python manage.py createsuperuser
```

7. Run the backend server:

```bash
python manage.py runserver
```

## Frontend Setup (React + TypeScript)
1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm start
# or
yarn start
```
The app will be available at: http://localhost:5173/ (Vite default)

## Connecting Frontend and Backend

Make sure the backend server is running at http://localhost:8000/

The frontend calls the DRF API endpoints (http://localhost:8000/api/subscriptions/) to fetch and manage subscriptions.


## Author

Ammar Al-Shari

