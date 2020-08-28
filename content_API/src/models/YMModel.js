module.exports = (sequelize, Sequelize) => {
    const year = sequelize.define("ano", {
        id_ano: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        ano: {
            type: Sequelize.STRING
        }
    },
        {
            freezeTableName: true,
            timestamps: false,
        });

    const month = sequelize.define("mes", {
        id_mes: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        mes: {
            type: Sequelize.STRING
        }
    },
        {
            freezeTableName: true,
            timestamps: false,
        });

    return { year, month }
};