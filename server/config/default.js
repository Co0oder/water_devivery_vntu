const dotenv = require('dotenv');
dotenv.config();

module.exports =  {
    PGUSER : process.env.PG_USER,
    PGPASSWORD : process.env.PG_PASSWORD,
    PGDATABASE : process.env.PG_DB,
    PGPORT : process.env.PG_PORT,
    LOGIN: process.env.LOGIN,
    PASSWORD: process.env.PASSWORD,
    DEBAG : true,
}