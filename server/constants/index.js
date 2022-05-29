const dotenv = require('dotenv');
dotenv.config()

exports.TOKEN =  process.env.BOT_TOKEN;
exports.CHAT_ID =  process.env.TELEGRAM_CHAT_ID;
exports.LOGIN = process.env.ADMIN_LOGIN || 'admin';
exports.PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
exports.SECRET = process.env.SECRET;
exports.TIMES_INTERVALS = ['8:00-12:00','13:00-16:00','17:00-20:00'];
exports.BASE_URL = process.env.BASE_URL;