const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '40000000pro', {
    dialect: 'mysql',
    host: 'localhost'
});


module.exports = sequelize;