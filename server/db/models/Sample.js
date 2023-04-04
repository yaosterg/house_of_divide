const Sequelize = require("sequelize");
const db = require("../database");

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  phone_number: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    },
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
  },
});

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  images: {
    type: Sequelize.TEXT,
    defaultValue:
      "http://wandw.wdfiles.com/local--files/location:hogwarts-castle/Campus.jpg",
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});
