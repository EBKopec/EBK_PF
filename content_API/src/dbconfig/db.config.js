module.exports = {
    HOST: "10.85.24.17",
    USER: "pfa",
    PASSWORD: "NovaFibr@2020",
    DB: "novafibra",
    dialect: "mysql",
    pool: {
      max: 1000,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };