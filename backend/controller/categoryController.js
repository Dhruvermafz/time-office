// Bring in Models & Utils
const Category = require("../models/category");
const store = require("../utils/store");

exports.addCategory = async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const products = req.body.products;
  const isActive = req.body.isActive;

  if (!description || !name) {
    return res
      .status(400)
      .json({ error: "You must enter description & name." });
  }

  const category = new Category({
    name,
    description,
    products,
    isActive,
  });

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Category has been added successfully!`,
      category: data,
    });
  });
};

exports.fetchStoreCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.status(200).json({
      categories,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      categories,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

exports.fetchCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const categoryDoc = await Category.findOne({ _id: categoryId }).populate({
      path: "products",
      select: "name",
    });

    if (!categoryDoc) {
      return res.status(404).json({
        message: "No Category found.",
      });
    }

    res.status(200).json({
      category: categoryDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const update = req.body.category;
    const query = { _id: categoryId };
    const { slug } = req.body.category;

    const foundCategory = await Category.findOne({
      $or: [{ slug }],
    });

    if (foundCategory && foundCategory._id != categoryId) {
      return res.status(400).json({ error: "Slug is already in use." });
    }

    await Category.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Category has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

exports.updateCategoryActive = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const update = req.body.category;
    const query = { _id: categoryId };

    // disable category(categoryId) products
    if (!update.isActive) {
      const categoryDoc = await Category.findOne(
        { _id: categoryId, isActive: true },
        "products -_id"
      ).populate("products");

      store.disableProducts(categoryDoc.products);
    }

    await Category.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Category has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const product = await Category.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: `Category has been deleted successfully!`,
      product,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};
