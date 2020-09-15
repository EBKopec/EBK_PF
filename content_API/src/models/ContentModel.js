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

    const VW_pmpg = sequelize.define('vw_pmpgs',{
      USER_ID: {
        type: Sequelize.INTEGER
      },
      MES_ID: {
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
        type: Sequelize.DECIMAL       
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
    });

    const VW_pmpg_0800 = sequelize.define('vw_pmpg_0800s',{
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
        type: Sequelize.DECIMAL(13, 2)
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
    });

    const VW_sme_escola = sequelize.define('vw_sme_escolas',{
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
        type: Sequelize.DECIMAL
        
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
    });

    const VW_sme_cmei = sequelize.define('vw_sme_cmeis',{
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
        type: Sequelize.DECIMAL(13, 2)
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
    });

    const VW_sms_aih = sequelize.define('vw_sms_aihs',{
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
        type: Sequelize.DECIMAL
        
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
    });

    const VW_sms_aih_0800 = sequelize.define('vw_sms_aih_0800s',{
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
        type: Sequelize.DECIMAL(13, 2)
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
    });

    const VW_sms_pab = sequelize.define('vw_sms_pabs',{
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
        type: Sequelize.DECIMAL
        
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
    });

    const VW_sms_pab_0800 = sequelize.define('vw_sms_pab_0800s',{
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
        type: Sequelize.DECIMAL(13, 2)
      }
    },
    {
      freezeTableName: true,
      timestamps: false,
    });

    Content.hasMany(Main_Content);
    Main_Content.belongsTo(Content);
    sequelizePaginate.paginate(Content);
    sequelizePaginate.paginate(Main_Content);
    sequelizePaginate.paginate(VW_pmpg);
    sequelizePaginate.paginate(VW_pmpg_0800);
    sequelizePaginate.paginate(VW_sme_escola);
    sequelizePaginate.paginate(VW_sme_cmei);
    sequelizePaginate.paginate(VW_sms_aih);
    sequelizePaginate.paginate(VW_sms_aih_0800);
    sequelizePaginate.paginate(VW_sms_pab);
    sequelizePaginate.paginate(VW_sms_pab_0800);
    return {Content, Main_Content, VW_pmpg, VW_pmpg_0800, VW_sme_escola, VW_sme_cmei, VW_sms_aih, VW_sms_aih_0800, VW_sms_pab, VW_sms_pab_0800};
  };