module.exports = {
    required: (val) => val && (val.toString().trim()),
    number: (val) => !!Number(val),
    phone: (val) => val ? !(val.replace(/[^\d]/g,'').length < 12) : false,
    image: (file) => file && file.type && (file.type === 'image/jpeg' || file.type === 'image/png'),
    validateAll: (vals, fields) => {
        let allFight = true
        Object.keys(fields).forEach(field => {
            const validate = module.exports[fields[field]]
            if (!validate(vals[field])) allFight = false
        });
        return allFight
    }
}
