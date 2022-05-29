const {LOGIN,PASSWORD, SECRET} = require('../constants');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const adminValidator = require('../routes/validators/admin.validator');

module.exports  = {
    login: (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return
        }
        let params = req.body;
        if(params.login !== LOGIN || params.password !== PASSWORD) {
            res.status = 403;
            return
        }
        const user = jwt.sign({user: 'admin', role: 'admin'}, SECRET);
        res.json({user});
    },

    getUser: (req,res) => {
        let user = null;
        if(req.session)
            user = req.session.user;
        res.json({ user });
    },

    logout: (req,res) => {
        req.session.user = null;
        res.json({ user: req.session.user });
    },
}