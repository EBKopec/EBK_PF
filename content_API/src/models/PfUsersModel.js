// const db = require('../models/Content_sequelize');

module.exports = (sequelize, Sequelize) => {
    const pf_users = sequelize.define("pf_users", {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE
        }
    });
    const pf_roles = sequelize.define("pf_roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });

    
    pf_roles.belongsToMany(pf_users,{
        through: "pf_user_roles",
        foreignKey: "role_Id",
        otherKey: "user_Id",
        as: "roles"

      });
    pf_users.belongsToMany(pf_roles, {
        through: "pf_user_roles",
        foreignKey: "user_Id",
        otherKey: "role_Id"
      })
    // pf_users.sync({force:true});
    // pf_roles.sync({force:true}).then(() => {
    //     console.log('Drop and Resync pf_roles'); 
    //     initial();
    // });

    // function initial() {
    //     pf_roles.create({
    //       id: 1,
    //       name: "user"
    //     });
       
    //     pf_roles.create({
    //       id: 2,
    //       name: "moderator"
    //     });
       
    //     pf_roles.create({
    //       id: 3,
    //       name: "admin"
    //     });
    //   }
    return { pf_users, pf_roles }
};
