import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import path from 'path';

// Load generated client from api package (works when compiled to dist/prisma/prisma.service.js)
const clientPath = path.join(__dirname, '..', '..', 'node_modules', '.prisma', 'client');
const { PrismaClient } = require(clientPath);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        'DATABASE_URL is not set. Create apps/api/.env with DATABASE_URL (e.g. postgresql://postgres:postgres@localhost:5432/app_db). See .env.example.',
      );
    }
    // Create a pg Pool (you can customize it a lot — pooling, ssl, etc)
    const pool = new Pool({
      connectionString,
      // optional useful settings:
      // max: 20,
      // idleTimeoutMillis: 30000,
      // connectionTimeoutMillis: 2000,
      // ssl: { rejectUnauthorized: false } // ← if you need it for self-signed certs
    });

    const adapter = new PrismaPg(pool);

    super({
      adapter,
      log: ['query', 'info', 'warn', 'error'], // this still works
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}