const multer = require("multer");
const Sequelize = require("sequelize");
// Bring in Models & Utils
const Product = require("../models/product");
const Brand = require("../models/brand");
const { Category } = require("../models/category");

// const { s3Upload } = require("../utils/storage");
const {
  getStoreProductsQuery,
  getStoreProductsWishListQuery,
} = require("../utils/queries");

const checkAuth = require("../utils/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.fetchAllProducts = async (req, res) => {
  try {
    // Fetch all products along with their associated brand information
    const products = await Product.findAll({});

    // Return the fetched products
    res.status(200).json({
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      error: "Internal server error. Please try again later.",
    });
  }
};

exports.fetchProductSlug = async (req, res) => {
  try {
    const slug = req.params.slug;

    const productDoc = await Product.findOne({ slug, isActive: true }).populate(
      {
        path: "brand",
        select: "name isActive slug",
      }
    );

    const hasNoBrand =
      productDoc?.brand === null || productDoc?.brand?.isActive === false;

    if (!productDoc || hasNoBrand) {
      return res.status(404).json({
        message: "No product found.",
      });
    }

    res.status(200).json({
      product: productDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

exports.fetchProductName = async (req, res) => {
  try {
    const name = req.params.name;

    // Query the database to fetch products by name
    const products = await Product.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name}%`, // Case-insensitive match (Postgres) or use `LIKE` for MySQL
        },
        isActive: true,
      },
      attributes: ["name", "slug", "imageUrl", "price"], // Selecting specific columns
    });

    // Check if no products were found
    if (products.length === 0) {
      return res.status(404).json({
        message: "No product found.",
      });
    }

    // Return the products if found
    res.status(200).json({
      products,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);

    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};
exports.searchProducts = async (req, res) => {
  try {
    const { name, minPrice, maxPrice } = req.query; // Using query parameters for search filters

    // Construct the where condition
    let whereCondition = { isActive: true }; // Start with active products filter

    // Add name filter if provided
    if (name) {
      whereCondition.name = {
        [Op.like]: `%${name}%`, // Case-insensitive match using LIKE
      };
    }

    // Add price filter if minPrice or maxPrice are provided
    if (minPrice) {
      whereCondition.price = {
        ...whereCondition.price,
        [Op.gte]: parseFloat(minPrice), // Greater than or equal to minPrice
      };
    }
    if (maxPrice) {
      whereCondition.price = {
        ...whereCondition.price,
        [Op.lte]: parseFloat(maxPrice), // Less than or equal to maxPrice
      };
    }

    // Query the database to fetch products based on the filters
    const products = await Product.findAll({
      where: whereCondition,
      attributes: ["name", "price"], // Selecting specific columns
    });

    // Check if no products were found
    if (products.length === 0) {
      return res.status(404).json({
        message: "No products found matching your criteria.",
      });
    }

    // Return the products if found
    res.status(200).json({
      products,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);

    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};
// Function to fetch store products with filters
// controllers/productController.js

exports.fetchStoreProducts = async (req, res) => {
  try {
    let {
      sortOrder,
      rating,
      max,
      min,
      category,
      brand,
      page = 1,
      limit = 10,
    } = req.query;
    sortOrder = sortOrder ? JSON.parse(sortOrder) : { createdAt: -1 };
    const categoryFilter = category ? { category } : {};

    const basicQuery = await getStoreProductsQuery(min, max, rating);
    const userDoc = await checkAuth(req);

    const categoryDoc = await Category.findOne({
      where: { slug: categoryFilter.category, isActive: true },
    });
    if (categoryDoc) {
      basicQuery.push({
        $match: { isActive: true, category_id: categoryDoc.id },
      });
    }

    const brandDoc = await Brand.findOne({
      where: { slug: brand, isActive: true },
    });
    if (brandDoc) {
      basicQuery.push({ $match: { brand_id: brandDoc.id } });
    }

    let products = null;
    const productsCount = basicQuery.length;
    const totalPages = Math.ceil(productsCount / limit);
    const currentPage = productsCount > limit ? Number(page) : 1;
    const offset = (currentPage - 1) * limit;

    const paginateQuery = [
      { $sort: sortOrder },
      { $skip: offset },
      { $limit: parseInt(limit) },
    ];
    if (userDoc) {
      const wishListQuery = await getStoreProductsWishListQuery(userDoc.id);
      products = wishListQuery.concat(basicQuery.concat(paginateQuery));
    } else {
      products = basicQuery.concat(paginateQuery);
    }

    res
      .status(200)
      .json({ products, totalPages, currentPage, count: productsCount });
  } catch (error) {
    console.error("error", error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

exports.listSelect = async (req, res) => {
  try {
    const products = await Product.find({}, "name");

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const sku = req.body.sku;
    const name = req.body.name;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const taxable = req.body.taxable;
    const isActive = req.body.isActive;
    const brand = req.body.brand;
    const image = req.file;

    if (!sku) {
      return res.status(400).json({ error: "You must enter sku." });
    }

    if (!description || !name) {
      return res
        .status(400)
        .json({ error: "You must enter description & name." });
    }

    if (!quantity) {
      return res.status(400).json({ error: "You must enter a quantity." });
    }

    if (!price) {
      return res.status(400).json({ error: "You must enter a price." });
    }

    const foundProduct = await Product.findOne({ sku });

    if (foundProduct) {
      return res.status(400).json({ error: "This sku is already in use." });
    }

    // const { imageUrl, imageKey } = await s3Upload(image);

    const product = new Product({
      sku,
      name,
      description,
      quantity,
      price,
      taxable,
      isActive,
      brand,
      imageUrl,
      imageKey,
    });

    const savedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: `Product has been added successfully!`,
      product: savedProduct,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

exports.fetchProducts = async (req, res) => {
  try {
    let products = [];

    if (req.user.merchant) {
      const brands = await Brand.find({
        merchant: req.user.merchant,
      }).populate("merchant", "_id");

      const brandId = brands[0]?.["_id"];

      products = await Product.find({})
        .populate({
          path: "brand",
          populate: {
            path: "merchant",
            model: "Merchant",
          },
        })
        .where("brand", brandId);
    } else {
      products = await Product.find({}).populate({
        path: "brand",
        populate: {
          path: "merchant",
          model: "Merchant",
        },
      });
    }

    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

// Controller function to fetch a product by ID
exports.fetchProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Fetch the product by primary key (ID)
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        message: "No product found.",
      });
    }

    res.status(200).json({
      product,
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error); // Log the error
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const update = req.body.product;
    const query = { _id: productId };
    const { sku, slug } = req.body.product;

    const foundProduct = await Product.findOne({
      $or: [{ slug }, { sku }],
    });

    if (foundProduct && foundProduct._id != productId) {
      return res.status(400).json({ error: "Sku or slug is already in use." });
    }

    await Product.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Product has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

exports.updateProductActive = async (req, res) => {
  try {
    const productId = req.params.id;
    const update = req.body.product;
    const query = { _id: productId };

    await Product.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Product has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: `Product has been deleted successfully!`,
      product,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};
