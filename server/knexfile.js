const config = require('config');

module.exports = {
  development: {
    client: 'pg',
    debug: false,
    connection:{ 
      host:     'localhost',
      database: config.get('PGDATABASE'),
      user:     config.get('PGUSER'),
      password: config.get('PGPASSWORD'),
      port:     config.get('PGPORT')
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  production: {
    client: 'pg',
    debug: false,
    connection:{ 
      host:     'localhost',
      database: config.get('PGDATABASE'),
      user:     config.get('PGUSER'),
      password: config.get('PGPASSWORD'),
      port:     config.get('PGPORT')
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
}