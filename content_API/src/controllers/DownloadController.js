const db = require('../models/Content_sequelize');
const { Sequelize, sequelize } = require('../models/Content_sequelize');
const { monthId } = require('../utils/utils');



module.exports = {

    async downloadFile(req, res){
        
        const month_Id = monthId(req.params.mes_id)

        const download = await res.download()

    }

}