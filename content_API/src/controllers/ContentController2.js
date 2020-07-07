const db = require('../models/Content_sequelize');


const Content = db.content;
console.log("Banco: ",Content);
//const Op = db.Sequilize.Op;

module.exports = {

    async index(req, res) {
        const { page = 1 } = req.query;
        const content = await Content.Content.paginate({group: ['title_content','subtitle_content'],
            page, paginate:5});
        console.log(res)
        return res.json(content);
    },
    async indexMainContent(req, res){
        const { page = 1 } = req.query;
        const main_content = await Content.Main_Content.paginate({page, paginate:10});
        
        return res.json(main_content);
    },
    async create(req, res) {
        //Create Content
        const content = await Content.Content.create({...req.body});
        const main_content = await Content.Main_Content.create({...req.body});
        const body = {content, main_content}
        console.log(body)
        return res.json(body)
    },
    async createMainContent(req, res){
        const main_content = await Content.Main_Content.create({...req.body});

        return res.json(main_content)
    },
    async show(req, res) {
        //Show a single Content
        const content = await Content.Content.findByPk(req.params.id);
        return res.json(content);
    },
    async showMainContent(req, res) {
        const { page = 1 } = req.query;
        const main_content = await Content.Main_Content.paginate({where: {'ContentId':req.params.id},
            page, paginate:15});

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

        return res.send()
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
        const { page = 1 } = req.query;
        const data = req.params.id;
        // console.log("Req: ", req.params.id);
        let BillingDetailed = '';
        const clause = { order: [
                                ['ORIGEM', 'ASC'],
                                ['DATA', 'ASC'],
                                ['HORA', 'ASC']] ,page, paginate:10}
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
                BillingDetailed = await Content.VW_sms_pab.paginate(clause);
                break;
            case '5':
                BillingDetailed = await Content.VW_sms_pab_0800.paginate(clause);
                break;
            case '6':
                BillingDetailed = await Content.VW_sms_aih.paginate(clause);
                break;
            case '7':
                BillingDetailed = await Content.VW_sms_aih_0800.paginate(clause);
                break;
            default:
                BillingDetailed = await Content.VW_pmpg.paginate(clause);
                break;
        }
        return res.json(BillingDetailed);
    }
}
