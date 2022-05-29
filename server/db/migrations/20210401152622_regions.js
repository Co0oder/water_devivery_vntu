
exports.up = (knex) => {
    return knex.schema
      .createTable('regions', table => {
          table.increments('id').unsigned().primary().notNullable();
          table.string('name').notNullable();
      })
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('regions');
  };
  