FROM node:20-alpine

WORKDIR /app

# Basic system deps (enough for most dev needs)
RUN apk add --no-cache libc6-compat

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

# Disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1
ENV NODE_ENV=development

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/admin ./apps/admin

# Install dependencies
RUN pnpm install

# Expose dev server port (change if your admin uses a different port)
EXPOSE 3002

# Start admin app in dev mode
CMD ["pnpm", "--filter", "admin", "dev"]
