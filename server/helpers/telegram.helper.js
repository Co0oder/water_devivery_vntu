const Telegraf = require('telegraf');
const { CHAT_ID, TOKEN } = require('../constants')
const Bot = new Telegraf(TOKEN);

exports.sendToTelegram = (message) => Bot.telegram.sendMessage(CHAT_ID, message);