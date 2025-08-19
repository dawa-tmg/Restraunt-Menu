exports.seed = async function(knex) {
  await knex.raw('TRUNCATE TABLE tags RESTART IDENTITY CASCADE');
  await knex('tags').insert([
    { tag_name: 'Vegetarian' },
    { tag_name: 'Non-Vegetarian' },
    { tag_name: 'Spicy' },
    { tag_name: 'Sweet' },
    { tag_name: 'Alcoholic' },
    { tag_name: 'Non-Alcoholic' },
    { tag_name: 'Hot' },
    { tag_name: 'Cold' }
  ]);
};
