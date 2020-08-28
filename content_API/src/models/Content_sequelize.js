const dbConfig = require('../dbconfig/db.config');
const Sequelize = require('sequelize');
const ContentModel = require('./ContentModel.js');
const ResumeConsume = require('./ResumeConsumeModel.js');
const Extensions = require('./ExtensionsModel.js');
const YM = require('./YMModel.js');
const SRCUtils = require('./SrcUtilsModel.js');
const PFUserRole = require('./PfUsersModel.js');

// const Users = require('./UsersModel.js')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.content = ContentModel(sequelize, Sequelize);
db.resumeConsume = ResumeConsume(sequelize, Sequelize);
db.extensions = Extensions(sequelize, Sequelize);
db.year = YM(sequelize, Sequelize);
db.month = YM(sequelize, Sequelize);
db.src_utils = SRCUtils(sequelize, Sequelize);
db.pf_roles = PFUserRole(sequelize, Sequelize);
db.pf_users = PFUserRole(sequelize, Sequelize);
db.ROLES = ["admin","moderator","user"];
db.sequelize.sync();
module.exports = db;