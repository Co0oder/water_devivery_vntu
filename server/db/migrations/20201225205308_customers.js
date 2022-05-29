exports.up = (knex) => {
    return knex.schema
      .createTable('customers', table => {
          table.increments('id').unsigned().primary().notNullable();
          table.string('name').notNullable();
          table.string('address');
          table.string('phone').unique();
          table.string('house_number').notNullable();
          table.string('region');
          table.text('comment');
          table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
      })
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('customers');
  };
  