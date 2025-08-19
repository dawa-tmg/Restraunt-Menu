exports.up = function(knex) {
  return knex.schema.createTable('food_items', function(table){
    table.increments("id");
    table.integer('category_id').unsigned().references('id').inTable('categories');
    table.integer('tag_id').unsigned().references('id').inTable('tags');
    table.string('image_url', 500);
    table.string('item_name', 145);
    table.text('description');
    table.decimal('price', 10, 2);
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('food_items');
};
 