import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
config({ path: resolve(__dirname, '.env') });

// Import entities explicitly to ensure they're detected
import { User } from './src/users/entities/user.entity';
import { PortfolioFormSubmission } from './src/users/entities/portfolio-form-submission.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD ? String(process.env.DB_PASSWORD) : '',
  database: process.env.DB_DATABASE || 'attractify',
  entities: [User, PortfolioFormSubmission],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  ssl:
    process.env.DB_SSL === 'true'
      ? {
          rejectUnauthorized: true,
        }
      : false,
});
