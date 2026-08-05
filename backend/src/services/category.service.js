const { Category } = require("../models");
const sequelize = require("../config/database");

const getAllCategories = async () => {
  return await Category.findAll({
    order: [["createdAt", "DESC"]],
  });
};

const createCategory = async (data) => {
  const { name, icon } = data;

  const transaction = await sequelize.transaction();

  try {
    const existingCategory = await Category.findOne({
      where: { name },
      transaction,
    });

    if (existingCategory) {
      throw new Error("Category name already exists");
    }

    const category = await Category.create(
      { name, icon },
      { transaction }
    );

    await transaction.commit();
    return category;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const updateCategory = async (id, data) => {
  const { name, icon } = data;

  const transaction = await sequelize.transaction();

  try {
    const category = await Category.findByPk(id, { transaction });

    if (!category) {
      throw new Error("Category not found");
    }

    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({
        where: { name },
        transaction,
      });

      if (existingCategory) {
        throw new Error("Category name already exists");
      }
    }

    await category.update({ name, icon }, { transaction });

    await transaction.commit();
    return category;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteCategory = async (id) => {
  const transaction = await sequelize.transaction();

  try {
    const category = await Category.findByPk(id, { transaction });

    if (!category) {
      throw new Error("Category not found");
    }

    await category.destroy({ transaction });

    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
