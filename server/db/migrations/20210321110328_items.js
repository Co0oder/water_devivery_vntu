
exports.up = (knex) => {
    return knex.schema
      .createTable('items', table => {
          table.increments('id').unsigned().primary().notNullable();
          table.string('title').notNullable();
          table.text('description').notNullable();
          table.text('details')
          table.string('image').notNullable();
          table.float('price').notNullable();
          table.integer('order');
          table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      })
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('items');
  };  