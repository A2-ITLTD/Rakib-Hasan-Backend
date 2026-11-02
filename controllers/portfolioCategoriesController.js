const PortfolioCategory = require("../models/PortfolioCategory");

const DEFAULT_CATEGORIES = [
  { name: "web-development", displayName: "Web Development" },
  { name: "mobile-app", displayName: "Mobile App" },
  { name: "ui-ux-design", displayName: "UI/UX Design" },
  { name: "ai-ml", displayName: "AI/ML" },
  { name: "ecommerce-development", displayName: "eCommerce Development" },
  { name: "digital-marketing", displayName: "Digital Marketing" },
  { name: "affiliate", displayName: "Affiliate" },
  { name: "wordpress", displayName: "Wordpress" },
  { name: "import-export", displayName: "Import Export" },
];

const normalizeCategory = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const ensureDefaultCategories = async () => {
  const existing = await PortfolioCategory.find({ isActive: true });

  if (existing.length === 0) {
    await PortfolioCategory.insertMany(DEFAULT_CATEGORIES);
    return PortfolioCategory.find({ isActive: true }).sort({ displayName: 1 });
  }

  return PortfolioCategory.find({ isActive: true }).sort({ displayName: 1 });
};

const getPortfolioCategories = async (req, res) => {
  try {
    const categories = await ensureDefaultCategories();

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch portfolio categories",
      error: error.message,
    });
  }
};

const createPortfolioCategory = async (req, res) => {
  try {
    const { name, displayName } = req.body;
    const normalizedName = normalizeCategory(name);
    const resolvedDisplayName = String(displayName || name || "").trim();

    if (!normalizedName || !resolvedDisplayName) {
      return res.status(400).json({
        success: false,
        message: "Please provide both name and displayName",
      });
    }

    const existing = await PortfolioCategory.findOne({ name: normalizedName });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        existing.displayName = resolvedDisplayName;
        await existing.save();
      }

      return res.status(200).json({
        success: true,
        message: "Portfolio category already exists",
        category: existing,
      });
    }

    const category = new PortfolioCategory({
      name: normalizedName,
      displayName: resolvedDisplayName,
    });

    await category.save();

    return res.status(201).json({
      success: true,
      message: "Portfolio category created successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create portfolio category",
      error: error.message,
    });
  }
};

const deletePortfolioCategory = async (req, res) => {
  try {
    const { name } = req.params;
    const normalizedName = normalizeCategory(name);

    if (!normalizedName) {
      return res.status(400).json({
        success: false,
        message: "Please provide a category name",
      });
    }

    const deletedCategory = await PortfolioCategory.findOneAndDelete({
      name: normalizedName,
    });

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Portfolio category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Portfolio category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete portfolio category",
      error: error.message,
    });
  }
};

module.exports = {
  getPortfolioCategories,
  createPortfolioCategory,
  deletePortfolioCategory,
  ensureDefaultCategories,
};
