#  harpply-pwa

A Turborepo monorepo containing **web**, **api**, and **admin** apps.

---


## 📋 Project Setup

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | >= 24 |
| pnpm | Latest |

---

## 🚀 Setup Commands (Run in Order)

### Step 1 — Install Node.js >= 24

```bash
# Install Node.js v24 via nvm
nvm install 24
nvm use 24

# Verify
node --version   # should show v24.x.x
```

### Step 2 — Install pnpm

```bash
# Install pnpm globally
npm install -g pnpm

# Verify
pnpm --version
```

### Step 3 — Clone & Install Dependencies

```bash
# Clone the repo
git clone 
cd harpply-pwa

# Install all dependencies across all apps
pnpm install
```

### Step 4 — Environment Variables

```bash
# Copy env files for each app
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
cp apps/admin/.env.example apps/admin/.env
```

> ⚠️ Fill in your values in each `.env` file before running the project.


### Step 5 — Database (Prisma)

```bash
# Generate Prisma client
pnpm --filter api prisma generate

# Run migrations
pnpm --filter api prisma migrate dev

# (Optional) Seed the database
pnpm --filter api prisma db seed
```

### Step 6 — Run the Project

```bash
# Run ALL apps simultaneously (recommended)
pnpm dev
```

#### Or run apps individually:

```bash
pnpm --filter web dev       # Next.js web app
pnpm --filter api dev       # Backend API
pnpm --filter admin dev     # Admin panel
```

---



## 🐳 Docker (Alternative to Local Dev)

```bash
# Build and run all containers
docker compose up --build

# Run in background
docker compose up -d --build

# Stop all containers
docker compose down
```

---

## 🌐 Default Ports

| App | URL |
|-----|-----|
| **web** | http://localhost:3000 |
| **admin** | http://localhost:3001 |
| **api** | http://localhost:4000 |

---


## 🔧 Day-to-Day Commands

### Package Management

```bash
# Add a package to a specific app
pnpm --filter web add axios
pnpm --filter api add bcrypt
pnpm --filter admin add zustand

# Add a package to ALL apps
pnpm add -w typescript

# Add a package to shared packages/
pnpm --filter @harpply/ui add clsx
```


### Build & Quality

```bash
# Build all apps
pnpm build

# Run linting across all apps
pnpm lint

# Type check all apps
pnpm typecheck

# Clean all node_modules & build cache
pnpm clean
```


### Prisma

```bash
# Generate Prisma client after schema changes
pnpm --filter api prisma generate

# Create a new migration
pnpm --filter api prisma migrate dev --name 

# Push schema changes without migration (dev only)
pnpm --filter api prisma db push

# Open Prisma Studio (DB GUI)
pnpm --filter api prisma studio

# Reset database
pnpm --filter api prisma migrate reset
```

---

## 📁 Project Structure

```
harpply-pwa/
├── apps/
│   ├── web/        # Next.js frontend
│   ├── api/        # Backend API
│   └── admin/      # Admin panel
├── packages/       # Shared packages
├── docker/         # Dockerfiles per app
│   ├── admin.Dockerfile
│   ├── api.Dockerfile
│   └── web.Dockerfile
├── compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

---


## ❓ Troubleshooting

**`pnpm dev` fails on startup**
- Make sure all `.env` files are filled in
- Run `pnpm --filter api prisma generate` before starting

**Prisma client not found**
```bash
pnpm --filter api prisma generate
```

**Port already in use**
```bash
# Kill process on a port (macOS/Linux)
lsof -ti:3000 | xargs kill -9
```


**Node version mismatch**
```bash
nvm use 24
```





