const db = require('../models/Content_sequelize');


const Content = db.content;
console.log("Banco: ",Content.Content);
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
        //const main_content = await Main_Content.Main_Content.create(req.body);
        const body = {content, main_content}
        console.log(body)
        //return res.json(content);
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
            page, paginate:10});

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
        const BillingDetailed = await Content.VW_Pmpg.paginate({page, paginate:10});
        // console.log(BillingDetailed)
        return res.json(BillingDetailed);
    },
    async showBillingPMPG_0800(req, res) {
        const { page = 1 } = req.query;
        const BillingDetailed = await Content.VW_Pmpg_0800.paginate({page, paginate:1});
        
        return res.json(BillingDetailed);
    },

}
