const sequelizePaginate = require('sequelize-paginate');
module.exports = (sequelize, Sequelize) => {
    const Content = sequelize.define("Content", {
      title_content: {
        type: Sequelize.STRING
      },
      subtitle_content: {
        type: Sequelize.STRING
      },
      aux_title:{
        type: Sequelize.STRING
      }
    });
    const Main_Content = sequelize.define("Main_Content", {
      main_content: {
        type: Sequelize.STRING
      },
      description_content:{
        type: Sequelize.STRING
      },
      aux_content:{
        type: Sequelize.STRING
      }
    });
    Content.hasMany(Main_Content);
    Main_Content.belongsTo(Content);
    sequelizePaginate.paginate(Content);
    sequelizePaginate.paginate(Main_Content);
    return {Content, Main_Content};
  };