require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  SECRET: process.env.SECRET || 'victoriasecret',
  'DB_URI': process.env['DB_URI'],
};
