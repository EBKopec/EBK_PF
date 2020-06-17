const db = require('../models/Content_sequelize');


const Content = db.content;
console.log("Banco: ",Content.Content);
//const Op = db.Sequilize.Op;

module.exports = {
    //async create(req, res) {
    //    const content = await Content.create(req.body);
    //    return res.json(content);
    //},
    async index(req, res) {
        //Show all Content
        //const { page = 1 } = Content.paginate();
        //const content = Content.findAll();
        const content = await Content.Content.paginate({
            group: ['title_content','subtitle_content']
        },{page : page=1, limit:5});
        return res.json(content);
    },
    
    async indexMainContent(req, res){
        const main_content = await Content.Main_Content.paginate({}, 
            {page: page=1, limit:5});
        
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
        //Show a single Content
        //const content = await Content.Content.findByPk(req.params.id);
        //const main_content = await Content.Main_Content.findAll({where: {'ContentId':req.params.id}});
        const main_content = await Content.Main_Content.paginate({where: {'ContentId':req.params.id}},
        {page: page=1, limit:10});
        console.log("IDs", main_content)

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

    }
}
