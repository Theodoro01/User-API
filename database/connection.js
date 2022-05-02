
var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'theo',
      password : 'theo123doro',
      database : 'usertest'
    }
  });

module.exports = knex