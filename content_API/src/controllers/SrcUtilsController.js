const db = require('../models/Content_sequelize');
// const { Sequelize, sequelize } = require('../models/Content_sequelize');
// const { monthId } = require('../utils/utils');
// const moment = require('moment');

const srcUtils = db.src_utils;
// const users = db.users;

// console.log("Banco - srcUtils:->", db.src_utils);
// console.log("Banco - Mes:->", db.month);

module.exports = {

    async showPath(req, res) {
        const src = await srcUtils.src_utils.findOne({
            attributes: [ 'src_utils' ], 
            where : {type_file: req.params.id}} );
        return res.json(src);
    },

    async download(req, res) {
        const src = await srcUtils.src_utils.findOne({
            attributes: [ 'src_utils' ], 
            where : {type_file: req.params.id}} );
            var path = require('path');
            var result = path.join(`${src.src_utils}`,`${req.params.mes_id}`)
            var download = res.download(path.join(`${result}`,`Files_${req.params.mes_id}.zip`)
            , 
                (err) => {
                    if(err){
                        // return res.json(404,'Arquivo não encontrado');
                        return res.status(404).json(download)
                    }else{
                        return download;
                    }
                });
            
    }

}