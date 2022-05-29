
exports.up = (knex) => {
    return knex.schema
      .createTable('reviews', table => {
          table.increments('id').unsigned().primary().notNullable();
          table.string('name').notNullable();
          table.text('review').notNullable();
          table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      })
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('reviews');
  };  