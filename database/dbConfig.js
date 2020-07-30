const knex = require('knex');

const knexConfig = require('../knexfile');

const eviron = process.env.DB_env || 'development';

module.exports = knex(knexConfig[eviron]);
