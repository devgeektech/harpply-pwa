# Database & pgAdmin Setup Notes

## What was done (for next time)

### 1. Why port 5433?
- **Port 5432** on the machine is already used by **system PostgreSQL** (or another service).
- To avoid conflict, the **project’s Postgres** (Docker) is exposed on **port 5433**.
- So: **system Postgres = 5432**, **project Postgres (Docker) = 5433**.

### 2. Docker Compose (`compose.yml`)
- **db** service maps container port 5432 to host port **5433**: `"5433:5432"`.
- Environment: `POSTGRES_USER=postgres`, `POSTGRES_PASSWORD=postgres`, `POSTGRES_DB=harpply`.

### 3. Backend env (`apps/api/.env`)
- `DATABASE_URL="postgresql://postgres:postgres@localhost:5433/harpply"`  
- Backend must use **5433** so it talks to the Docker Postgres, not system Postgres.

### 4. One-command startup (`package.json` at repo root)
- **`pnpm dev`** → runs `docker compose up -d db` then `turbo run dev` (starts DB + app).
- **`pnpm db`** → runs only `docker compose up -d db` (DB only).

So you only need to run **`pnpm dev`** (or **`pnpm db`**) to have the database reachable.

### 5. pgAdmin 4 connection (what you used)
| Field | Value |
|--------|--------|
| Host name/address | `localhost` |
| Port | **5433** |
| Maintenance database | `postgres` |
| Username | `postgres` |
| Password | `postgres` |

After connecting, the **harpply** database appears under **Databases**.

---

## Quick checklist for next time

1. From project root, start DB (and optionally the app):  
   `pnpm dev` or `pnpm db`
2. In pgAdmin: **Register → Server** → Connection tab:  
   Host `localhost`, Port **5433**, User `postgres`, Password `postgres`
3. If “Connection refused”: container not running → run `pnpm db` (or `pnpm dev`) again.




## #####################################################

What was done to fix it
1. New migration file
Path: apps/api/prisma/migrations/20260305052500_sync_user_table/migration.sql
Contents:
Add the missing columns on auth."User":
resetOtp (TEXT, nullable)
resetOtpExpires (TIMESTAMP(3), nullable)
resetToken (TEXT, nullable)
resetTokenExpires (TIMESTAMP(3), nullable)
Remove the column that the schema no longer has:
Drop column role from auth."User"
Drop enum type auth."Role"
So the migration made the real table match the current Prisma User model.
2. Apply the migration
Command run:
cd apps/api && pnpm exec prisma migrate deploy
Effect: Prisma applied the new migration so the database schema was updated.
