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
        const extensionsQty = await Extensions.controle_agrupamento.findAll({
              include: [{
                  model: Extensions.users, 
                  attributes: [],
                  group: ['User_group'],
                  required: true
              }],
            attributes: [
                [Sequelize.literal('SUBSTRING(User_group,30,50)'), 'User_group']
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
        const extMonth = await Extensions.controle_agrupamento.paginate({
            include: [{
                model: Extensions.users, 
                attributes: [],
                group: ['User_group'],
                required: true
            }
            // ,
            // attributes: [
            //     [Sequelize.literal('User_group'), 'User_group']
            // ,   'linha'
            // ,   [Sequelize.literal(`CASE WHEN (STATUS = "Y" AND DATE_FORMAT(DATA_VALIDACAO_CLIENTE, "%Y%m") = ${month_Id}) THEN DATE_FORMAT(DATA_VALIDACAO_CLIENTE, "%d-%m-%Y") ELSE "" END `),'ATIVADOS_MES']
            
            // ,   [Sequelize.literal(`CASE WHEN (STATUS = "P" AND DATE_FORMAT(DATA_ENVIO_NOVA, "%Y%m") = ${month_Id}) THEN DATE_FORMAT(DATA_ENVIO_NOVA, "%d-%m-%Y") ELSE "" END `),'EM_ATIVACAO']                             

            // ,   [Sequelize.literal(`CASE WHEN (STATUS = "N" AND DATE_FORMAT(DATA_CANCELAMENTO, "%Y%m") = ${month_Id}) THEN DATE_FORMAT(DATA_CANCELAMENTO, "%d-%m-%Y") ELSE "" END `),'DESCONECTADOS']
            // ],
            ,
            {   model: Extensions.local_setor,
                attributes:[],
                group: ['ID_LOCAL_SETOR'],
                required: true,
                include: [{ model: Extensions.local,
                            attributes:[],
                            group: ['DESCRICAO_LOCAL'],
                            required: true
                            },
                          { model: Extensions.setor,
                              attributes:[],
                              group: [ 'DESCRICAO_SETOR'],
                              required: true
                          }
                        ]
            }],
        
            attributes: [
                [Sequelize.literal('SUBSTRING(User_group,30,50)'), 'User_group']
            ,   'linha'
            ,   'tipo_linha'
            ,   [Sequelize.literal('DATE_FORMAT(DATA_ENVIO_NOVA, "%d-%m-%Y")'),'DATA_ENVIO_NOVA']
            ,   [Sequelize.literal('DATE_FORMAT(DATA_VALIDACAO_CLIENTE, "%d-%m-%Y")'),'DATA_VALIDACAO_CLIENTE']
            ,   [Sequelize.literal('DATE_FORMAT(DATA_CANCELAMENTO, "%d-%m-%Y")'),'DATA_CANCELAMENTO']
            ,   [Sequelize.literal(`CASE WHEN (STATUS = "Y") THEN "ATIVADO"
                                         WHEN (STATUS = "P") THEN "PENDENTE" 
                                         WHEN (STATUS = "N") THEN "DESCONECTADO" ELSE "SEM STATUS" END`),'status']
            // ,   [Sequelize.literal('DATE_FORMAT(DATA_ALTERACAO, "%d-%m-%Y")'),'DATA_ALTERACAO']
            ,   [Sequelize.literal('DESCRICAO_LOCAL'), 'DESCRICAO_LOCAL']
            ,   [Sequelize.literal('DESCRICAO_SETOR'), 'DESCRICAO_SETOR']
            ],
            where : Sequelize.where(Sequelize.fn('date_format', Sequelize.col('DATA_ALTERACAO'), "%Y%m"), Sequelize.Op.eq, month_Id),
            group: ['controle_agrupamento.user_group_id', 'linha'],
            // order: ['user_group_id','linha'],
            

        page, paginate:10});
        return res.json(extMonth);
    },
    async showExt(req, res) {
        console.log(req.params);
        let ext;
        if (req.params.ext_id === 'all'){
            ext = Sequelize.where(Sequelize.col('status'), Sequelize.Op.gte, 0);
        } else{
            ext = Sequelize.where(Sequelize.col('linha'), Sequelize.Op.eq, req.params.ext_id);
        }
        const { page = 1 } = req.query;
        const exts = await Extensions.controle_agrupamento.paginate({
            include: [{
                model: Extensions.users, 
                attributes: [],
                group: ['User_group'],
                required: true
            },
            {   model: Extensions.local_setor,
                attributes:[],
                group: ['ID_LOCAL_SETOR'],
                required: true,
                include: [{ model: Extensions.local,
                            attributes:[],
                            group: ['DESCRICAO_LOCAL'],
                            required: true
                            },
                          { model: Extensions.setor,
                              attributes:[],
                              group: [ 'DESCRICAO_SETOR'],
                              required: true
                          }
                        ]
            }],
        
            attributes: [
                [Sequelize.literal('SUBSTRING(User_group,30,50)'), 'User_group']
            ,   'linha'
            ,   'tipo_linha'
            ,   [Sequelize.literal('DATE_FORMAT(DATA_ENVIO_NOVA, "%d-%m-%Y")'),'DATA_ENVIO_NOVA']
            ,   [Sequelize.literal('DATE_FORMAT(DATA_VALIDACAO_CLIENTE, "%d-%m-%Y")'),'DATA_VALIDACAO_CLIENTE']
            ,   [Sequelize.literal('DATE_FORMAT(DATA_CANCELAMENTO, "%d-%m-%Y")'),'DATA_CANCELAMENTO']
            ,   [Sequelize.literal(`CASE WHEN (STATUS = "Y") THEN "ATIVADO"
                                         WHEN (STATUS = "P") THEN "PENDENTE" 
                                         WHEN (STATUS = "N") THEN "DESCONECTADO" ELSE "SEM STATUS" END`),'status']
            ,   [Sequelize.literal('DATE_FORMAT(DATA_ALTERACAO, "%d-%m-%Y")'),'DATA_ALTERACAO']
            ,   [Sequelize.literal('DESCRICAO_LOCAL'), 'DESCRICAO_LOCAL']
            ,   [Sequelize.literal('DESCRICAO_SETOR'), 'DESCRICAO_SETOR']
            ],
            // where : Sequelize.where(req.params.ext_id, Sequelize.Op.eq, Sequelize.col('linha')),
            where : [ext],
            group: ['controle_agrupamento.user_group_id', 'linha'],
            // order: ['user_group_id','linha'],
            

        page, paginate:10});
        return res.json(exts);
    },
    async listExts(req, res) {
        const exts = await Extensions.controle_agrupamento.findAll({
            attributes: ['linha'],
            group: ['linha']});
        return res.json(exts);
    }
}
