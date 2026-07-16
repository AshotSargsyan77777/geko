# FC Barcelona Official Jersey Store — Django REST Backend

This is the fully structured **Django REST Framework (DRF)** backend codebase built to power your FC Barcelona 2026/27 jerseys online store. It provides robust database storage for kits, customized player printing, billing orders, and email subscribers.

---

## 🛠️ Features Included
1. **Products Catalog API**: Query available kits, filter by type (Home, Away, Third, Limited), or search player names.
2. **Dynamic Custom Orders API**: Post customized jerseys with personalized size, custom names, and customized back numbers. Automatically handles billing/shipping address verification.
3. **Automated Order Number Generators**: Creates secure tracking IDs formatted exactly like the official store (`FCB-XXXXXXXXXX`).
4. **Instant Seeding**: Includes a special `/api/seed/` POST endpoint to instantly populate your local SQLite database with initial jerseys, complete with high-quality descriptions and details.
5. **CORS Headers Pre-Configured**: Configured with `django-cors-headers` to immediately accept connection requests from your React frontend app!

---

## 🚀 Step-by-Step Local Setup

Follow these steps to run this backend on your local machine:

### 1. Initialize Virtual Environment & Dependencies
In your terminal, navigate into this `django_backend` directory:
```bash
# Create a Python virtual environment
python -m venv venv

# Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install all necessary backend dependencies
pip install -r requirements.txt
```

### 2. Prepare Database & Migrations
We use a pre-configured, lightweight file-based SQLite database. Initialize and generate the database tables:
```bash
# Make migrations for the api app
python manage.py makemigrations api

# Apply migrations to prepare your db.sqlite3 file
python manage.py migrate
```

### 3. Start the Server
Run the local Django development server:
```bash
python manage.py runserver
```
Your backend will start running live at **`http://127.0.0.1:8000/`**.

---

## ⚽ Seed Your Barça Jerseys Catalog
To quickly load your store catalog with the official 2026/27 Home, Away, Third, and 125th Anniversary shirts, make a quick POST request to the built-in seed url. 

You can use the Django browsable API, Postman, or run the following curl command in a separate terminal:
```bash
curl -X POST http://127.0.0.1:8000/api/seed/
```
**Response JSON:**
```json
{
  "status": "success",
  "message": "Seeded 4 products successfully. All 4 official 2026/27 kits are active!",
  "total_active_products": 4
}
```

---

## 🔄 Integrating with Your React Frontend
Your React app can now easily communicate with this backend instead of using the local static data file. 

For instance, you can update your React codebase (`src/App.tsx`) to fetch the active jerseys directly from Django:

```typescript
// Fetch from your Django backend
useEffect(() => {
  fetch('http://127.0.0.1:8000/api/products/')
    .then(response => response.json())
    .then(data => {
      // Set retrieved catalog products state here
    });
}, []);
```

And place custom orders:
```typescript
const placeOrder = (orderPayload) => {
  fetch('http://127.0.0.1:8000/api/orders/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload)
  })
  .then(res => res.json())
  .then(completedOrder => {
     alert(`Order placed successfully with ID: ${completedOrder.order_number}`);
  });
};
```
