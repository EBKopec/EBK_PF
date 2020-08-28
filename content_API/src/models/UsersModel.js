// // const sequelizePaginate = require('sequelize-paginate');

// module.exports = (sequelize, Sequelize) => {
//     const users = sequelize.define("users", {
//         USER_ID: {
//             type: Sequelize.INTEGER,
//             primaryKey: true
//         },
//         USER_CODE: {
//             type: Sequelize.INTEGER,
//             primaryKey: true
//         },
//         USER_DESC: {
//             type: Sequelize.STRING
//         },
//         USER_GROUP_ID: {
//             type: Sequelize.INTEGER
//         },
//         ACTIVATION_DATE: {
//             type: Sequelize.DATE
//         },
//         EXPIRATION_DATE: {
//             type: Sequelize.DATE
//         },
//         ENABLED_DATE: {
//             type: Sequelize.DATE
//         },
//         User_Group: {
//             type: Sequelize.STRING
//         }
//     },
//         {
//             freezeTableName: true,
//             timestamps: false,
//         });

//     // ResumeConsume;
//     return { users }
// };
