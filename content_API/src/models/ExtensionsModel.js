const sequelizePaginate = require('sequelize-paginate');
module.exports = (sequelize, Sequelize) => {
    const controle_agrupamento_bkp = sequelize.define("controle_agrupamento_bkp", {
        linha: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        user_group_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        tipo_linha: {
            type: Sequelize.STRING
        },
        data_envio_nova: {
            type: Sequelize.DATE
        },
        data_validacao_cliente: {
            type: Sequelize.DATE
        },
        data_cancelamento: {
            type: Sequelize.DATE
        },
        status: {
            type: Sequelize.STRING
        },
        data_alteracao: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
        {
            freezeTableName: true,
            timestamps: false,
        });

    const users = sequelize.define("users", {
        USER_ID: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        USER_CODE: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        USER_DESC: {
            type: Sequelize.STRING
        },
        USER_GROUP_ID: {
            type: Sequelize.INTEGER
        },
        ACTIVATION_DATE: {
            type: Sequelize.DATE
        },
        EXPIRATION_DATE: {
            type: Sequelize.DATE
        },
        ENABLED_DATE: {
            type: Sequelize.DATE
        },
        User_Group: {
            type: Sequelize.STRING
        }
    },
        {
            freezeTableName: true,
            timestamps: false,
        });


    controle_agrupamento_bkp.belongsTo(users, { foreignKey: 'user_group_id' });
    sequelizePaginate.paginate(controle_agrupamento_bkp);
    sequelizePaginate.paginate(users);
    // users.hasMany(controle_agrupamento_bkp, { foreignKey: 'USER_ID' });
    // ResumeConsume;
    return { controle_agrupamento_bkp, users }
};