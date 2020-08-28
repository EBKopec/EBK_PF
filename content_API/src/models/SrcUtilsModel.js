module.exports = (sequelize, Sequelize) => {
    const src_utils = sequelize.define("src_utils", {
        type_file: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        src_utils: {
            type: Sequelize.STRING,
        },
        src_utils_desc: {
            type: Sequelize.STRING
        },
        src_change_date: {
            type: Sequelize.DATE
        }
    },
        {
            freezeTableName: true,
            timestamps: false,
        });
    return { src_utils }
};