FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat openssl curl wget

RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

ENV NODE_ENV=development

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/api ./apps/api

RUN pnpm install

RUN pnpm --filter=api prisma generate

EXPOSE 3001

HEALTHCHECK --interval=10s --timeout=5s --start-period=60s --retries=12 \
  CMD curl -f http://localhost:3001/health || exit 1

CMD ["pnpm", "--filter=api", "dev"]