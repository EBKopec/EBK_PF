const dbConfig = require('../dbconfig/db.config');
const Sequelize = require('sequelize');
const ContentModel = require('./ContentModel.js');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host:dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.content = ContentModel(sequelize, Sequelize);
db.sequelize.sync();
module.exports = db;