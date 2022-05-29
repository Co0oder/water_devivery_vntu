exports.up = (knex) => {
    return knex.schema
      .createTable('predicate', table => {
          table.increments('id').unsigned().primary().notNullable();
          table.integer('phone').notNullable();
          table.date('predicated_date');
          table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      })
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('predicate');
  };
  