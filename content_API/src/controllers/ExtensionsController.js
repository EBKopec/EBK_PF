const db = require('../models/Content_sequelize');
const { Sequelize, sequelize } = require('../models/Content_sequelize');
const { monthId } = require('../utils/utils');
// const moment = require('moment');

const Extensions = db.extensions;
// const users = db.users;

// console.log("Banco Extensions - Users:->", db.users);

module.exports = {

    async showExtensionsQty(req, res) {
        // console.log(req.params)
        const month_Id = monthId(req.params.mes_id)
        // console.log("Mes_id", month_Id);
        const extensionsQty = await Extensions.controle_agrupamento_bkp.findAll({
              include: [{
                  model: Extensions.users, 
                  attributes: [],
                  group: ['User_group'],
                  required: true
              }],
            attributes: [
                [Sequelize.literal('User_group'), 'User_group']
                // 'status'
                // , [Sequelize.literal('DATE_FORMAT(DATA_ALTERACAO, "%Y%m")'), 'DATA']
                , [Sequelize.fn('sum',
                    Sequelize.literal(`CASE WHEN (STATUS = "Y" AND DATE_FORMAT(DATA_ALTERACAO, "%Y%m") <= ${month_Id}) THEN 1 ELSE 0 END`)), 'RAMAIS_ATIVOS']
                , [Sequelize.fn('sum',
                    Sequelize.literal(`CASE WHEN (STATUS = "Y" AND DATE_FORMAT(DATA_VALIDACAO_CLIENTE, "%Y%m") = ${month_Id}) THEN 1 ELSE 0 END`)), 'ATIVADOS_MES']
                , [Sequelize.fn('sum',
                    Sequelize.literal(`CASE WHEN (STATUS = "P" AND DATE_FORMAT(DATA_ENVIO_NOVA, "%Y%m") <= ${month_Id}) THEN 1 ELSE 0 END`)), 'EM_ATIVACAO']
                , [Sequelize.fn('sum',
                    Sequelize.literal(`CASE WHEN (STATUS = "N" AND DATE_FORMAT(DATA_CANCELAMENTO, "%Y%m") = ${month_Id}) THEN 1 ELSE 0 END`)), 'DESCONECTADOS']
            ],
            where : Sequelize.where(Sequelize.fn('date_format', Sequelize.col('DATA_ENVIO_NOVA'), "%Y%m")
                                   , Sequelize.Op.lte, month_Id)
            // Sequelize.where(Sequelize.fn('date_format', Sequelize.col('DATA_ALTERACAO'), "%Y%m"), month_Id )
            //  [Sequelize.where(Sequelize.fn('DATE_FORMAT', Sequelize.col("DATA_ENVIO_NOVA"), "%Y%m"))]}
            //           : req.params.mes_id}
            , group : [Sequelize.literal('User_group'), 'User_group']
        });
        return res.json(extensionsQty);
    },
    async showExtMonth(req, res) {
        const month_Id = monthId(req.params.mes_id);
        const { page = 1 } = req.query;
        const extMonth = await Extensions.controle_agrupamento_bkp.paginate({
            include: [{
                model: Extensions.users, 
                attributes: [],
                group: ['User_group'],
                required: true
            }],
            attributes: [
                [Sequelize.literal('User_group'), 'User_group']
            ,   'linha'
            ,   [Sequelize.literal(`CASE WHEN (STATUS = "Y" AND DATE_FORMAT(DATA_VALIDACAO_CLIENTE, "%Y%m") = ${month_Id}) THEN DATA_VALIDACAO_CLIENTE ELSE "" END `),'ATIVADOS_MES']
            
            ,   [Sequelize.literal(`CASE WHEN (STATUS = "P" AND DATE_FORMAT(DATA_ENVIO_NOVA, "%Y%m") = ${month_Id}) THEN DATA_ENVIO_NOVA ELSE "" END `),'EM_ATIVACAO']                             

            ,   [Sequelize.literal(`CASE WHEN (STATUS = "N" AND DATE_FORMAT(DATA_CANCELAMENTO, "%Y%m") = ${month_Id}) THEN DATA_CANCELAMENTO ELSE "" END `),'DESCONECTADOS']

            ],
            where : Sequelize.where(Sequelize.fn('date_format', Sequelize.col('DATA_ALTERACAO'), "%Y%m"), Sequelize.Op.eq, month_Id),
            group: ['controle_agrupamento_bkp.user_group_id', 'linha'],
            // order: ['user_group_id','linha'],
            

        page, paginate:10});
        return res.json(extMonth);
    }



}
