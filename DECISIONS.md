Backend Step 3: Serializers

- Created `SubscriptionSerializer` to convert Subscription model to JSON.
- Used DRF's `ModelSerializer` for simplicity.
- This allows React frontend to fetch subscription data easily.
- Tested in Django shell to verify output.

Backend Step 4: API Endpoints

- Created SubscriptionViewSet using DRF ModelViewSet.
- Added router-based URLs for clean REST endpoints.
- Exposed endpoints under /api/subscriptions/.
- Tested GET/POST/PUT/DELETE using Django REST UI.
- These endpoints will be used by the React frontend.

Backend Step 5: Stats API

- Implemented custom stats endpoint at /api/stats/.
- Returns total monthly and yearly cost, active count, expiring soon, cost by category, and next renewal dates.
- Used Django ORM aggregations and manual calculations.
- This endpoint is used by React for dashboard charts and summary cards.
