# Run Harpply PWA with Docker

This guide helps you **install Docker** and **run the full project** (web, API, admin, database) in containers.

---

## 1. Install Docker (Linux)

Run these commands in your terminal.

### Option A — Quick install (recommended for dev)

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

Add your user to the `docker` group so you can run Docker without `sudo`:

```bash
sudo usermod -aG docker $USER
```

**Log out and back in** (or reboot) for the group change to apply. Then verify:

```bash
docker --version
docker compose version
```

### Option B — Install via apt (Ubuntu/Debian)

```bash
# Dependencies
sudo apt-get update
sudo apt-get install -y ca-certificates curl

# Docker's GPG key and repository
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine and Compose plugin
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Optional: start on boot
sudo systemctl enable docker
```

Add your user to the `docker` group and re-login:

```bash
sudo usermod -aG docker $USER
```

---

## 2. Run the project with Docker

From the project root (`harpply-pwa`):

```bash
# Build and start all services in the background (web, api, admin, db)
pnpm docker:up
```

Or with Docker directly:

```bash
docker compose up -d --build
```

To see logs in the foreground:

```bash
pnpm docker:up:logs
# or
docker compose up --build
```

To stop everything:

```bash
pnpm docker:down
# or
docker compose down
```

---

## 3. Ports and URLs

| Service | URL | Port |
|--------|-----|------|
| **Web** (Next.js) | http://localhost:3000 | 3000 |
| **API** (NestJS) | http://localhost:3001 | 3001 |
| **Admin** | http://localhost:3002 | 3002 |
| **PostgreSQL** | localhost:5433 (host) | 5433 → 5432 (container) |

---

## 4. Environment variables (optional)

Compose uses defaults; override by creating a `.env` in the project root, e.g.:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=harpply
NEXT_PUBLIC_API_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3000
WEB_PORT=3000
BACKEND_PORT=3001
ADMIN_PORT=3002
```

---

## 5. Local dev with only the DB in Docker

To run the apps locally with pnpm and only the database in Docker:

```bash
pnpm dev
```

This starts the `db` container, then runs `turbo run dev` (web, api, admin) on your machine.
