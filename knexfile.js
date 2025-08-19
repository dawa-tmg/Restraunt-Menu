require('dotenv').config()
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5544,
      user: 'bank',
      password: 'bankpass',
      database: 'food_menu',
    }
  },
};
