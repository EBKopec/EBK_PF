const db = require('../models/Content_sequelize');


const ResumeConsume = db.resumeConsume;
// console.log("Banco ResumeConsume:->", db);

module.exports = {

    async showResumeConsume(req, res) {
        // console.log(req.params)
        const resumo_consumo = await ResumeConsume.resumo_consumo.findAll({where : {mes_id: req.params.id}});
        return res.json(resumo_consumo);
    }
}

// import { resumeConsume } from '../models/Content_sequelize';


// const ResumeConsume = resumeConsume;
// console.log("Banco: ", ResumeConsume);

// export async function showResumeConsume(req, res) {
//     const resumo_consumo = await ResumeConsume.ResumeConsume.findByPk(req.params.month_id);
//     return res.json(resumo_consumo);
// }
