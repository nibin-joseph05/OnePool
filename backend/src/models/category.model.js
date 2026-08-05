const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    icon: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  }
);

module.exports = Category;