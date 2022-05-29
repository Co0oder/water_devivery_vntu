const knex = require('../db');

module.exports = {
    showAllRegions: () => knex('regions').select(),
    addNewRegion: (props) => knex('regions').insert(props),
    updateRegion: (id,props) => knex('regions').update(props).where({id}),
    deleteRegionById: (id) => knex('regions').where({id}).del(),
}