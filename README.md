# SendIT — Courier & Parcel Delivery Platform

Full-stack starter based on the provided SendIT UI.

## Stack

- Frontend: React + Vite + Redux Toolkit
- Backend: Flask + SQLAlchemy + PostgreSQL
- Authentication: JWT
- Testing: Vitest/React Testing Library + Pytest
- API listing endpoints use pagination.

## Repository structure

```text
sendit/
├── frontend/
└── backend/
```

## Backend setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# Update DATABASE_URL and JWT_SECRET_KEY

flask --app run.py db-init
flask --app run.py db-upgrade
flask --app run.py run --debug
```

For PostgreSQL, create a database such as `sendit`.

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Create `.env` from `.env.example` if the API URL differs.

## Demo flow

1. Register a user.
2. Log in.
3. Create a parcel.
4. View the dashboard.
5. Open parcel details.
6. Change destination while the parcel is not delivered/cancelled.
7. Cancel the parcel while allowed.
8. Admin users can update status and present location.

## UI

The implementation follows the supplied SendIT screens:

- dark navy shell
- orange primary actions
- serif/slab display headings
- compact logistics labels
- responsive dashboard cards
- landing page, auth, dashboard, create order and detail views


## New production/MVP features

- Language selector: English, Kiswahili, Français, Español, Português and العربية.
- Currency selector: KES, USD, GBP, EUR, GHS and NGN with KES-based demo conversion rates.
- Google Maps geocoding and driving route display.
- Customer parcel tracking polls for the latest GPS position while a parcel is in transit.
- Admin GPS tracking page can send browser GPS coordinates to the backend.
- Payment state is stored on every parcel. A parcel cannot be changed to `in_transit` until `payment_status` is `paid`. The current payment endpoint is a safe demo confirmation endpoint; replace it with M-Pesa/Stripe webhooks for real money.

### Google Maps setup

Enable the Maps JavaScript API and Routes/Geocoding capabilities in Google Cloud, create a browser-restricted key, and add it to `frontend/.env`:

```env
VITE_GOOGLE_MAPS_API_KEY=your-key
```

Google's current Maps JavaScript Routes library supports route distance and duration and traffic-aware driving routes.

### Make a user an admin

After registering a user, run this against your PostgreSQL database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

Then log out and log back in. The Admin link will appear in the navigation.

### Existing database warning

If you already created `sendit.db` or an existing PostgreSQL schema, `db.create_all()` does not add new columns to existing tables. For development, recreate the database or use a migration tool before testing the new payment columns.
