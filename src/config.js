require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const port = 5566;

const configuration = {
  port,
  cors: {
    exposedHeaders: ['Link']
  },
  development: {
    baseURL: `http://localhost:${port}`,
    db: {
      username: process.env.DEVELOPMENT_DB_USERNAME,
      password: process.env.DEVELOPMENT_DB_PASSWORD,
      database: process.env.DEVELOPMENT_DB_DATABASE,
      options: {
        port: process.env.DEVELOPMENT_DB_PORT,
        host: process.env.DEVELOPMENT_DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
          ssl: false
        },
        define: {
          freezeTableName: true,
          underscored: true
        },
        logging: false
      }
    },
    jwtEncryption: process.env.DEVELOPMENT_JWT_ENCRYPTION,
    jwtExpiration: process.env.DEVELOPMENT_JWT_EXPIRATION
  },
  staging: {
    baseURL: ``,
    db: {
      username: process.env.STAGING_DB_USERNAME,
      password: process.env.STAGING_DB_PASSWORD,
      database: process.env.STAGING_DB_DATABASE,
      options: {
        host: process.env.STAGING_DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
          ssl: true
        },
        define: {
          freezeTableName: true,
          underscored: true
        },
        logging: false,
        pool: {
          max: 5,
          min: 0,
          idle: 20000,
          acquire: 20000
        }
      }
    },
    jwtEncryption: process.env.STAGING_JWT_ENCRYPTION,
    jwtExpiration: process.env.STAGING_JWT_EXPIRATION
  },
  production: {
    baseURL: ``,
    db: {
      username: process.env.PROD_DB_USERNAME,
      password: process.env.PROD_DB_PASSWORD,
      database: process.env.PROD_DB_DATABASE,
      options: {
        host: process.env.PROD_DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
          ssl: true
        },
        define: {
          freezeTableName: true,
          underscored: true
        },
        logging: false,
        pool: {
          max: 5,
          min: 0,
          idle: 20000,
          acquire: 20000
        }
      }
    },
    jwtEncryption: process.env.PROD_JWT_ENCRYPTION,
    jwtExpiration: process.env.PROD_JWT_EXPIRATION
  }
};
export default configuration[env];
