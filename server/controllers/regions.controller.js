const regionsModule = require('../models/regions.model');
const { validationResult } = require('express-validator');

module.exports = {
    show: async (req,res) => {
        const data = await regionsModule.showAllRegions();
        res.json({data});
    },

    add: async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const props = req.body;
        const data = await regionsModule.addNewRegion (props);
        res.json({message: "Region created"});
    },

    update: async () => {
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const id = req.params.id;
        const props = req.body;
        const data = await regionsModule.updateRegion(id,props);
        res.json({message: "Region updated"});
        return;
    },

    delete: async (req,res) => {
        const id = req.params.id;
        await regionsModule.deleteRegionById(id);
        res.json({message: `Region with id: ${id} deleted`});
    }
}