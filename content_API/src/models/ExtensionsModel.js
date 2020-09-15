const sequelizePaginate = require('sequelize-paginate');
module.exports = (sequelize, Sequelize) => {
    const controle_agrupamento = sequelize.define("controle_agrupamento", {
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
        },
        id_local_setor: {
            type: Sequelize.INTEGER,
            references: {
                model: 'local_setor',
                key: 'id_local_setor'
            }
            
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

    const local_setor = sequelize.define("local_setor", {
        id_local_setor: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_local: {
            type: Sequelize.INTEGER
        },
        id_setor: {
            type: Sequelize.INTEGER
        }
    },
        {
            freezeTableName: true,
            timestamps: false,
        });

    const local = sequelize.define("local", {
        id_local: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        descricao_local: {
            type: Sequelize.STRING
        }
    },
        {
            freezeTableName: true,
            timestamps: false,
        });
    const setor = sequelize.define("setor", {
        id_setor: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        descricao_setor: {
            type: Sequelize.STRING
        }
    },
        {
            freezeTableName: true,
            timestamps: false,
        });
    
    controle_agrupamento.belongsTo(users, { foreignKey: 'user_group_id' });
    controle_agrupamento.belongsTo(local_setor, {foreignKey: 'id_local_setor', targetKey:'id_local_setor'});
    local_setor.belongsTo(local, {foreignKey: 'id_local'});
    local_setor.belongsTo(setor, {foreignKey: 'id_setor'});
    sequelizePaginate.paginate(controle_agrupamento);
    sequelizePaginate.paginate(users);
    sequelizePaginate.paginate(local_setor);
    sequelizePaginate.paginate(local);
    sequelizePaginate.paginate(setor);
    // users.hasMany(controle_agrupamento, { foreignKey: 'USER_ID' });
    // ResumeConsume;
    return { controle_agrupamento, users, local_setor, local, setor}
};
