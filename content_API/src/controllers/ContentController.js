const mongoose = require('mongoose');
const Content = mongoose.model('Content');

module.exports = {
    async index(req, res){
        const { page = 1 } = req.query;
        const content = await Content.paginate({},{page, limit:10});
        return res.json(content);
    },

    async show(req, res){
        //Select Content
        const content = await Content.findById(req.params.id);

        return res.json(content);
    },
    async store(req, res){
        //Create Content
        const content = await Content.create(req.body);

        return res.json(content);
    },

    async update(req, res){
        //Update Content
        const content = await Content.findByIdAndUpdate(req.params.id, req.body, {new: true});
    
        return res.json(content);
    },

    async destroy(req, res){
        //Delete Content
        await Content.findByIdAndRemove(req.params.id);

        return res.send()

    }
};
