FROM node:20-alpine

WORKDIR /app

# Basic system deps
RUN apk add --no-cache libc6-compat

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

# Dev environment
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy workspace source
COPY packages ./packages
COPY apps/web ./apps/web

# Install dependencies
RUN pnpm install

# Expose Next.js dev port
EXPOSE 3000

# Start web app in dev mode
CMD ["pnpm", "--filter=web", "dev"]
