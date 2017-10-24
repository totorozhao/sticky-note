var Sequelize = require('sequelize')
var path = require('path')
const sequelize = new Sequelize(undefined,undefined,undefined,{
    host: 'localhost',
    dialect: 'sqlite',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  
    // SQLite only
    storage: path.join(__dirname,'../database/database.sqlite')
  });

  
  /*测试是否正常连接
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  */

  const Note = sequelize.define('note', {
    text: {
      type: Sequelize.STRING
    },
    userid:{
      type: Sequelize.STRING
    },
    username:{
      type: Sequelize.STRING
    }
  });

  Note.sync()
  
  module.exports.Note = Note