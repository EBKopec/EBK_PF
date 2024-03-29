const db = require('../models/Content_sequelize');
const { Sequelize, sequelize } = require('../models/Content_sequelize');
const { formatToCurrency } = require('../utils/utils');

const Content = db.content;
// console.log("Banco Content: ",Content);
//const Op = db.Sequelize.Op;

module.exports = {

    async index(req, res) {
        const { page = 1 } = req.query;
        const content = await Content.Content.paginate({group: ['title_content','subtitle_content'],
            page, paginate:5});
        // console.log(res)
        return res.json(content);
    },
    async indexMainContent(req, res){
        const { page = 1 } = req.query;
        const main_content = await Content.Main_Content.paginate({page, paginate:30});
        
        return res.json(main_content);
    },
    async create(req, res) {
        //Create Content
        const content = await Content.Content.create({...req.body});
        const main_content = await Content.Main_Content.create({...req.body});
        const body = {content, main_content}
        // console.log(body)
        return res.json(body);
    },
    async createMainContent(req, res){
        const main_content = await Content.Main_Content.create({...req.body});

        return res.json(main_content);
    },
    async show(req, res) {
        //Show a single Content
        const content = await Content.Content.findByPk(req.params.id);
        return res.json(content);
    },
    async showMainContent(req, res) {
        const { page = 1 } = req.query;
        const main_content = await Content.Main_Content.paginate({where: {'ContentId':req.params.id},
            order:[['id','ASC']],
            page, paginate:30});

        return res.json(main_content);
    },
    async update(req, res) {
        //Update Content
        const content = await Content.Content.update(req.params.id, req.body, {new: true});

        return res.json(content);
    },
    async delete(req, res){
        //Delete Content
        await Content.Content.destroy(req.params.id);

        return res.send();
    },
    async showBillingPMPG(req, res){
        const { page = 1 } = req.query;
        console.log("Req:",req.params.id)
        const BillingDetailed = await Content.VW_Pmpg.paginate({order:[
                                                                    ['ORIGEM', 'ASC'],
                                                                    ['DATA', 'ASC'],
                                                                    ['HORA', 'ASC']] ,page, paginate:10});
        // console.log(BillingDetailed)
        return res.json(BillingDetailed);
    },

    async showBillingPMPGParam(req, res) {
        console.log("Req",req.params);
        const { page = 1 } = req.query;
        const data = req.params.id;
        // console.log("Req: ", req.params.id);
        let BillingDetailed = '';
        const clause = { attributes: [ 'TIPO'
                                    , 'ORIGEM'
                                    , [Sequelize.literal('DATE_FORMAT(DATA, "%d-%m-%Y")'),'DATA']
                                    , 'HORA'
                                    , 'DESTINO'
                                    , 'CIDADE_DESTINO'
                                    , 'DURACAO_REAL'
                                    // , [formatToCurrency(Sequelize.literal('CUSTO')), 'CUSTO']
                                    , [Sequelize.fn('format',Sequelize.col('CUSTO'),3,'pt_BR'),'CUSTO']
                                ]
                       , where: {mes_id: req.params.mes_id}
                       , order: [
                                ['ORIGEM', 'ASC'],
                                ['DATA', 'ASC'],
                                ['HORA', 'ASC']] ,page, paginate:50};
        switch(data){
            case '0':
                BillingDetailed = await Content.VW_pmpg.paginate(clause);
                break;
            case '1':
                BillingDetailed = await Content.VW_pmpg_0800.paginate(clause);
                break;
            case '2':
                BillingDetailed = await Content.VW_sme_escola.paginate(clause);
                break;
            case '3':
                BillingDetailed = await Content.VW_sme_cmei.paginate(clause);
                break;
            case '4':
                BillingDetailed = await Content.VW_fms_pab.paginate(clause);
                break;
            case '5':
                BillingDetailed = await Content.VW_fms_pab_0800.paginate(clause);
                break;
            case '6':
                BillingDetailed = await Content.VW_fms_aih.paginate(clause);
                break;
            case '7':
                BillingDetailed = await Content.VW_fms_aih_0800.paginate(clause);
                break;
            default:
                BillingDetailed = await Content.VW_pmpg.paginate(clause);
                break;
        }
        return res.json(BillingDetailed);
    }
}
