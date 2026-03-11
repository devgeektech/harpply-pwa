# Fix: "password authentication failed for user postgres"

You're connecting to **localhost:5432**, database **harpply**, user **postgres**. The server is reachable but the **password is wrong** for whatever is listening on 5432.

---

## Step 1: See what is on port 5432

Either **Docker Postgres** or **system PostgreSQL** can be on 5432. Only one should be.

```bash
# Is Docker Postgres running?
docker compose ps

# What process is using 5432?
sudo lsof -i :5432
```

- If you see **app-postgres** (Docker): use **Solution A**.
- If you see **postgres** (system): use **Solution B**.

---

## Solution A: You're using Docker Postgres

Docker is started with user `postgres` and password `postgres` (see `compose.yml`).

### In pgAdmin (Register – Server → Connection)

| Field              | Value      |
|--------------------|------------|
| Host               | `localhost` |
| Port               | `5432`     |
| Maintenance database | `harpply` or `postgres` |
| Username           | `postgres` |
| **Password**       | **`postgres`** (literally) |

- Turn **Save password** on if you want, then **Save**.
- If you still get "password authentication failed", either the container is not the one from this project (different password) or something else is on 5432 — do Step 1 again.

### Ensure the `harpply` database exists (Docker)

Docker Compose creates `app_db` by default, not `harpply`. Your `apps/api/.env` uses `harpply`, so that database must exist.

**Option 1 – Create `harpply` and keep using it**

```bash
cd /home/gt822001/project/2026/harpply-pwa
docker compose exec db psql -U postgres -c "CREATE DATABASE harpply;"
```

Then in pgAdmin use **Maintenance database**: `harpply` (or `postgres`).

**Option 2 – Use `app_db` instead**

In `apps/api/.env` set:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db"
```

Then in pgAdmin use **Maintenance database**: `app_db`.

---

## Solution B: You're using system PostgreSQL (no Docker)

System Postgres uses the password **you set when you installed it**, not `postgres`.

### In pgAdmin

- **Password**: the real password for the system user `postgres` (often set during `sudo apt install postgresql` or when you first set it).

If you don’t remember it:

- **Option 1** – Reset the `postgres` user password (e.g. via `sudo -u postgres psql` and `ALTER USER postgres PASSWORD 'newpassword';`), then use that in pgAdmin and in `.env`.
- **Option 2** – Use only Docker Postgres: stop system Postgres (`sudo systemctl stop postgresql`), start Docker (`docker compose up -d db`), then use password **`postgres`** in pgAdmin as in Solution A.

### Create the database (system Postgres)

```bash
sudo -u postgres psql -c "CREATE DATABASE harpply;"
```

Then run migrations:

```bash
cd /home/gt822001/project/2026/harpply-pwa/apps/api
pnpm exec prisma migrate dev
```

---

## Quick checklist

1. **One server on 5432** – Docker **or** system Postgres, not both.
2. **pgAdmin password** – `postgres` for Docker; system postgres password for system Postgres.
3. **Database exists** – `harpply` (or `app_db`) created and migrations run.
4. **`.env`** – `DATABASE_URL` uses the same host, port, user, password, and database name as in pgAdmin.

After changing anything, restart the API (`pnpm dev`).
