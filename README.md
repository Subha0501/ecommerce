# E-commerce Demo

This workspace contains a minimal e-commerce demo with a simple Express backend and a Vite + React frontend.

Features implemented:
- Home page with Dress categories: `Sarees` and `Western`
- Sarees include multiple varieties (silk, cotton, chiffon)
- Add to cart and cart management (stored in `localStorage`)
- Checkout with payment mode options: `offline` or `online` (UPI / Net Banking)

Quick start (Windows PowerShell):

1) Backend

```powershell
cd backend
npm install
npm run start
```

2) Frontend (new terminal)

```powershell
cd frontend
npm install
npm run dev
```

Notes:
- The backend serves product data from `backend/data/products.json` and exposes `/api/products` and `/api/checkout`.
- Checkout is simulated (no real payment integration).
- To integrate a real DB or payment gateway, I can add MongoDB models and a payment provider (Razorpay/Stripe/PayPal) next.
