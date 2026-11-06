# MK DATA

MK DATA is a mobile-first Nigerian digital-services application with a React frontend, Express API scaffold, and Supabase PostgreSQL schema.

## Current status

**Not production-ready.** The backend still uses an in-memory development repository. Accounts, wallet balances, and transactions are not persisted to Supabase. Do not accept customer deposits or real orders with this build.

Implemented: React registration/login/dashboard screens; Express routes for auth, profile, wallet, data catalogue, transactions, and admin; 26 Supabase public tables with RLS enabled; API health endpoint, JWT configuration guard, JSON body limit, configurable CORS; wallet funding and data purchase fail closed instead of falsely crediting money or claiming delivery.

Outstanding: Prisma 7 runtime adapter and persistent PostgreSQL repository; production registration/login; atomic wallet ledger postings, idempotency, reversals, reconciliation; Monnify or other gateway checkout and signature-verified webhook; VTU provider integration, live catalogue, status polling, refunds; production admin provisioning, deployment secrets, automated and end-to-end tests.

Backend development: enter backend/, run npm install, copy .env.example to .env, set a unique random JWT_SECRET of at least 32 characters, then run npm run dev.

Frontend development: enter frontend/, run npm install, set REACT_APP_API_URL if needed, then run npm start.

Never commit .env, database passwords, payment secrets, VTU credentials, or Supabase service-role keys.

Financial rules: credit wallets only after server-side verification of exact amount, currency, customer/reference, and success status; mark VTU orders successful only after provider confirmation; track wallet balance, wallet ledger, provider balance, provider cost, and gross profit separately. Example: NGN 800 selling price less NGN 650 provider cost = NGN 150 gross profit before other fees.
