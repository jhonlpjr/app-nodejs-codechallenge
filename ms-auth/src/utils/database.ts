import { Pool } from 'pg';
import logger from './logger';

import dotenv from 'dotenv';

dotenv.config();

export namespace PostgresDB {
    const pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: `${process.env.PG_PASSWORD}`,
        port: Number(process.env.PG_PORT) || 5432,
    });

    logger.info('Connecting to PostgreSQL database...');

    export const query = (text: string, params?: any[]) => pool.query(text, params);
}