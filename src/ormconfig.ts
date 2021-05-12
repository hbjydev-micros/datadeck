import glob from 'glob';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USER ?? 'datadeck',
    password: process.env.DB_PASS ?? 'datadeck',
    database: process.env.DB_NAME ?? 'datadeck',
    synchronize: false,
    logging: true,
    entities: glob.sync('{src,dist}/models/*.{js,ts}'),
    migrations: glob.sync('{src,dist}/migrations/*.{js,ts}'),
    migrationsTableName: 'migrations',
    cli: {
        migrationsDir: 'src/migrations/*.ts'
    }
};

export default config;
