exports.up = function(knex) {
  return knex.schema.createTable('categories', function(table){
    table.increments("id");
    table.string('category_name', 145);
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories');
};
