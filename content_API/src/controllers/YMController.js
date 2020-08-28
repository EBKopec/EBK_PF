const db = require('../models/Content_sequelize');

const Year = db.year.year;
const Month = db.month.month;
// const users = db.users;

// console.log("Banco - Ano:->", db.year);
// console.log("Banco - Mes:->", db.month);

module.exports = {

    async showYear(req, res) {
        const year = await Year.findAll()
        return res.json(year);
    },

    async showMonth(req, res){
        const month = await Month.findAll()
        return res.json(month);
    }
}

