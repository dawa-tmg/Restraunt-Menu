exports.seed = async function(knex) {
  await knex.raw('TRUNCATE TABLE food_items RESTART IDENTITY CASCADE');
  await knex('food_items').insert([
    {
      category_id: 3,
      tag_id: 4,
      image_url: 'https://www.seriouseats.com/thmb/lpcQrICX9t1WZgX5NxxzhnrJPyk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20230713-SEA-StrawberryShortcaker-DebbieWee-hero-027-70e05a1299cd41d8b4b7768cd67a8d97.jpg',
      item_name: 'Strawberry Shortcake',
      description: 'Buttery shortcake, juicy berries, and fluffy whipped cream make this a delicious way to enjoy strawberries at their peak.', 
      price: 250
    },
    {
      category_id: 4,
      tag_id: 2,
      image_url: 'https://www.sipandfeast.com/wp-content/uploads/2024/01/garlic-parm-wings-recipe-snippet.jpg',
      item_name: 'Crispy Garlic Parmesan Chicken Wings',
      description: 'These oven-baked Garlic Parmesan Chicken Wings are so crispy and delicious, you’d swear they were fried! They’re excellent on their own but even better with a side of buttermilk ranch dressing or blue cheese dressing!', 
      price: 350
    },
    {
      category_id: 2,
      tag_id: 1,
      image_url: 'https://feelgoodfoodie.net/wp-content/uploads/2023/12/Vegetarian-Burrito-Bowl-TIMG.jpg',
      item_name: 'Vegetarian Burrito Bowl',
      description: 'This Vegetarian Burrito Bowl is meal prep friendly and features black beans, corn, sweet potatoes, and cilantro lime rice, for a filling and wholesome meal.', 
      price: 450
    },
    {
      category_id: 2,
      tag_id: 3,
      image_url: 'https://marcsrecipes.com/wp-content/uploads/2023/01/ema-datshi-005.jpg',
      item_name: 'Ema Datshi',
      description: `Ema Datshi literally means "Peppers and Cheese" in Dzongkha, and it's the unofficial dish of Bhutan.`, 
      price: 150
    },
    {
      category_id: 1,
      tag_id: 5,
      image_url: 'https://arcobalenogenk.be/wp-content/uploads/2021/08/LAT020-rose.jpg',
      item_name: 'La Tordera Tor Sè',
      description: `La Tordera Tor Sè is the first “Spumante Rosé” to officially call itself Prosecco since the 2020 harvest.`, 
      price: 500
    }
  ]);
};
