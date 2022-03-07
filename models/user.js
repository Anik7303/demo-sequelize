const { DataTypes } = require("sequelize");

const sequelize = require("../database");

// const User = sequelize.define(
sequelize.define(
  "User",
  {
    name: DataTypes.STRING,
    favoriteColor: {
      type: DataTypes.STRING,
      defaultValue: "green",
    },
    age: DataTypes.INTEGER,
    cash: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    username: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  { timestamps: true }
);
