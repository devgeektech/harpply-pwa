# Backend DB Error Fix: "Authentication failed... credentials for postgres are not valid"

## What’s wrong
The API uses `DATABASE_URL` in `apps/api/.env` to connect to PostgreSQL. The server at `localhost:5432` is rejecting the user `postgres` with the password you have in `.env` (usually `postgres`). That usually means either:
- Another PostgreSQL (e.g. installed on the system) is running on port 5432 and uses a **different password**, or
- The Docker Postgres container is not the one on 5432 (e.g. port conflict).

---

## Solution A: Use only Docker Postgres (recommended)

### 1. Stop any local PostgreSQL (so only Docker uses 5432)
```bash
sudo systemctl stop postgresql
```
If that command fails (e.g. "not found"), you may not have local Postgres; skip to step 2.

### 2. Start the DB with Docker (from project root)
```bash
cd ~/project/2026/harpply-pwa
# If you had Docker permission issues before, run: newgrp docker
docker compose up -d db
```

### 3. Wait a few seconds, then run migrations (from apps/api)
```bash
cd ~/project/2026/harpply-pwa/apps/api
pnpm exec prisma migrate dev
```

### 4. Keep your .env as:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db"
PORT=5000
JWT_SECRET="your-very-secure-secret-1234567890"
```

### 5. Restart the API
Stop `pnpm dev` (Ctrl+C) and run again from project root:
```bash
pnpm dev
```

---

## Solution B: Use your local PostgreSQL (no Docker)

If you want to use PostgreSQL installed on your system instead of Docker:

### 1. In apps/api/.env set the real password for user `postgres`
Example (replace `YOUR_REAL_PASSWORD` with the password you set when you installed Postgres):
```
DATABASE_URL="postgresql://postgres:YOUR_REAL_PASSWORD@localhost:5432/app_db"
PORT=5000
JWT_SECRET="your-very-secure-secret-1234567890"
```

### 2. Create the database if it doesn’t exist
```bash
sudo -u postgres psql -c "CREATE DATABASE app_db;"
```

### 3. Run migrations
```bash
cd ~/project/2026/harpply-pwa/apps/api
pnpm exec prisma migrate dev
```

### 4. Restart the API
Stop and run `pnpm dev` again.

---

## Check what is using port 5432
To see whether Docker or local Postgres is on 5432:
```bash
sudo lsof -i :5432
# or
docker compose ps
```
If you see a container `app-postgres` and it’s “Up”, then Docker is running. If you also have a `postgres` process from systemd, stop local Postgres (Solution A step 1) so the API talks only to Docker.
