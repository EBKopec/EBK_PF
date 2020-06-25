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
    const VW_Pmpg = sequelize.define('vw_pmpgs',{
      USER_ID: {
        type: Sequelize.INTEGER
      },
      TIPO: {
        type: Sequelize.STRING
      },
      ORIGEM: {
        type: Sequelize.STRING
      }, 
      DATA: {
        type: Sequelize.DATE
      },
      HORA: {
        type: Sequelize.STRING
      },
      DESTINO: {
        type: Sequelize.STRING
      },
      CIDADE_DESTINO: {
        type: Sequelize.STRING
      },
      DURACAO_REAL: {
        type: Sequelize.STRING
      },
      CUSTO: {
        type: Sequelize.DOUBLE(10, 2)
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
    });
    const VW_Pmpg_0800 = sequelize.define('vw_pmpg_0800s',{
      USER_ID: {
        type: Sequelize.INTEGER
      },
      TIPO: {
        type: Sequelize.STRING
      },
      ORIGEM: {
        type: Sequelize.STRING
      }, 
      DATA: {
        type: Sequelize.DATE
      },
      HORA: {
        type: Sequelize.STRING
      },
      DESTINO: {
        type: Sequelize.STRING
      },
      CIDADE_DESTINO: {
        type: Sequelize.STRING
      },
      DURACAO_REAL: {
        type: Sequelize.STRING
      },
      CUSTO: {
        type: Sequelize.DOUBLE(10, 2)
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
    })

    Content.hasMany(Main_Content);
    Main_Content.belongsTo(Content);
    sequelizePaginate.paginate(Content);
    sequelizePaginate.paginate(Main_Content);
    sequelizePaginate.paginate(VW_Pmpg);
    sequelizePaginate.paginate(VW_Pmpg_0800);
    return {Content, Main_Content, VW_Pmpg, VW_Pmpg_0800};
  };