# PocketShop

PocketShop is a full-stack React and Express application.

## Setup

1. Copy `server/.env.example` to `server/.env`.
2. Copy `client/.env.example` to `client/.env`.
3. Install dependencies in `server` and `client`.
4. Set a unique `SHOP_USERNAME`, a unique 8–15 digit `SHOP_PHONE`, a strong `ADMIN_PASSWORD`, and a four-digit `ADMIN_PIN` in `server/.env`.
5. Start MongoDB and run the seed script once to create the shop administrator and sample products:

```bash
cd server
npm run seed
```

The shop administrator is also the account that receives payments. Do not use the example values in production.

The demo catalog contains 16 products. Their photos open a WhatsApp conversation with `+224 661 61 58 59` and a prefilled message naming the product. Demo products are added without overwriting products already in the database.

## Commands

```bash
cd server
npm install
npm run dev
```

From the repository root, `npm run dev` starts both the API and the client. Open `http://localhost:5173`. If MongoDB Atlas is not reachable in development, the API uses a temporary local replica set; its data is cleared when the API stops.

```bash
cd client
npm install
npm run dev
```

## Deployment

### MongoDB Atlas

Create an Atlas cluster and database user, allow the Render service network, and copy the connection string to Render:

```text
mongodb+srv://<user>:<password>@<cluster-host>/pocketshop?retryWrites=true&w=majority
```

Never commit the real connection string.

### Render

Deploy the repository using [render.yaml](./render.yaml). In the Render dashboard, set:

- `MONGODB_URI`: the Atlas connection string
- `SHOP_USERNAME`: the username created by the seed script
- `SHOP_PHONE`: the phone number created for the shop admin
- `CLIENT_URL`: the production Vercel URL, for example `https://pocketshop.vercel.app`

Run `npm run seed` against the production MongoDB database once before accepting payments. Configure the shop username and admin credentials securely in the server environment before running it.

The API health endpoint is `/api/health`.

### Vercel

Create a Vercel project with `client` as the root directory. Set:

```text
VITE_API_URL=https://<render-service>.onrender.com/api
```

Redeploy the frontend after changing this environment variable.