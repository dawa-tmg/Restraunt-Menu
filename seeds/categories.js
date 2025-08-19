exports.seed = async function(knex) {
  await knex.raw('TRUNCATE TABLE categories RESTART IDENTITY CASCADE');
  await knex('categories').insert([
    { category_name: 'Beverages' },
    { category_name: 'Main Course' },
    { category_name: 'Desserts' },
    { category_name: 'Appetizers' }
  ]);
};
