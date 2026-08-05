const categoryService = require("../services/category.service");

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    const statusCode = error.message === "Category name already exists" ? 409 : 400;
    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.updateCategory(id, req.body);
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message === "Category not found") statusCode = 404;
    else if (error.message === "Category name already exists") statusCode = 409;
    
    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: null,
    });
  } catch (error) {
    const statusCode = error.message === "Category not found" ? 404 : 400;
    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
