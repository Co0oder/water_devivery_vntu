
exports.up = (knex) => {
  return knex.schema
    .createTable('orders', table => {
        table.increments('id').unsigned().primary().notNullable();
        table.string('name').notNullable();
        table.string('address').notNullable();
        table.string('region');
        table.string('house_number').notNullable();
        table.integer('flat_number');
        table.string('phone');
        table.date('delivery_date').notNullable();
        table.string('delivery_time');
        table.specificType('items', 'text[]');
        table.float('price').notNullable();
        table.text('comment');
        table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    })
};

exports.down = (knex) => {
  return knex.schema.dropTable('orders');
};
