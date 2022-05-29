
exports.up = (knex) => {
    return knex.schema
      .createTable('calls', table => {
          table.increments('id').unsigned().primary().notNullable();
          table.string('name');
          table.string('phone').notNullable();
          table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      })
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('calls');
  };
  