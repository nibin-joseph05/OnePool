const express = require("express");
const { body, param, validationResult } = require("express-validator");
const categoryController = require("../controllers/category.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      data: errors.array(),
    });
  }
  next();
};

router.get("/", categoryController.getAllCategories);

router.post(
  "/",
  protect,
  [
    body("name").notEmpty().withMessage("Category name is required").isString(),
    body("icon").optional().isString(),
    validate,
  ],
  categoryController.createCategory
);

router.put(
  "/:id",
  protect,
  [
    param("id").isUUID().withMessage("Invalid category ID"),
    body("name").optional().isString().notEmpty().withMessage("Category name cannot be empty"),
    body("icon").optional().isString(),
    validate,
  ],
  categoryController.updateCategory
);

router.delete(
  "/:id",
  protect,
  [
    param("id").isUUID().withMessage("Invalid category ID"),
    validate,
  ],
  categoryController.deleteCategory
);

module.exports = router;
