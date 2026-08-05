const User = require("./user.model");
const Category = require("./category.model");
const Listing = require("./listing.model");

User.hasMany(Listing, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Listing.belongsTo(User, {
  foreignKey: "userId",
});

Category.hasMany(Listing, {
  foreignKey: "categoryId",
});

Listing.belongsTo(Category, {
  foreignKey: "categoryId",
});

module.exports = {
  User,
  Category,
  Listing,
};