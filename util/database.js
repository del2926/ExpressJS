const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "siti@Del2926", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
