const callsModule = require('../models/calls.model');
const { validationResult } = require('express-validator');
const { sendToTelegram } = require('../helpers/telegram.helper');
const { TIMES_INTERVALS } = require('../constants');

module.exports = {
    show: async (req,res) => {
        const data = await callsModule.showAllCalls();
        res.json({data});
    },

    add: async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const name = req.body.name;
        const phone = req.body.phone;
        const message = `
ПЕРЕДЗВОНИТИ:
${name ? `${name}` : ``}
Мобільний: ${phone}
        `
        await Promise.all([
            sendToTelegram(message),
            callsModule.addNewColls({
                name,
                phone,
            }),
        ]);
        res.json({...(name ? {name}: {}), phone});
    },

    delete: async (req,res) => {
        const id = req.params.id;
        await callsModule.deleteCollById(id);
        res.json({message: `Call with id: ${id} deleted`});
    }
}