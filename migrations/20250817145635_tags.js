exports.up = function(knex) {
  return knex.schema.createTable('tags', function(table){
    table.increments("id");
    table.string('tag_name', 145);
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tags');
};
