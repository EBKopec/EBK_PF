// const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, Sequelize) => {
    const resumo_consumo = sequelize.define("resumo_consumo", {
        mes_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        group: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        ramal_ativo: {
            type: Sequelize.INTEGER
        },
        valor_ramal: {
            type: Sequelize.DECIMAL(13, 2)
        },
        parcial: {
            type: Sequelize.DECIMAL(13, 2)
        },
        faturar_ramais: {
            type: Sequelize.DECIMAL(13, 2)
        },
        franquias: {
            type: Sequelize.DECIMAL(13, 2)
        },
        excedentes: {
            type: Sequelize.DECIMAL(13, 2)
        },
        total_faturar: {
            type: Sequelize.DECIMAL(13, 2)
        },
        ldn_minutes: {
            type: Sequelize.DECIMAL(13, 2)
        },
        ldn_values: {
            type: Sequelize.DECIMAL(13, 2)
        },
        local_minutes: {
            type: Sequelize.DECIMAL(13, 2)
        },
        local_values: {
            type: Sequelize.DECIMAL(13, 2)
        },
        movel_minutes: {
            type: Sequelize.DECIMAL(13, 2)
        },
        movel_values: {
            type: Sequelize.DECIMAL(13, 2)
        },
        ldn_minutes_exc: {
            type: Sequelize.DECIMAL(13, 2)
        },
        ldn_values_exc: {
            type: Sequelize.DECIMAL(13, 2)
        },
        local_minutes_exc: {
            type: Sequelize.DECIMAL(13, 2)
        },
        local_values_exc: {
            type: Sequelize.DECIMAL(13, 2)
        },
        movel_minutes_exc: {
            type: Sequelize.DECIMAL(13, 2)
        },
        movel_values_exc: {
            type: Sequelize.DECIMAL(13, 2)
        },
        ldn_total_m: {
            type: Sequelize.DECIMAL(13, 2)
        },
        ldn_total_valor: {
            type: Sequelize.DECIMAL(13, 2)
        },
        local_total_m: {
            type: Sequelize.DECIMAL(13, 2)
        },
        local_total_valor: {
            type: Sequelize.DECIMAL(13, 2)
        },
        movel_total_m: {
            type: Sequelize.DECIMAL(13, 2)
        },
        movel_total_valor: {
            type: Sequelize.DECIMAL(13, 2)
        },
        total: {
            type: Sequelize.DECIMAL(13, 2)
        }
    },
        {
            freezeTableName: true,
            timestamps: false,
        });

    // ResumeConsume;
    return { resumo_consumo }
};
