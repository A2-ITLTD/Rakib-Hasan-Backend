const ServiceCategory = require("../models/ServiceCategory");

const DEFAULT_CATEGORIES = [
  { name: "erp", displayName: "ERP Management" },
  { name: "amazon", displayName: "Amazon" },
  { name: "digital-marketing", displayName: "Digital Marketing" },
  { name: "design-development", displayName: "Design & Development" },
  { name: "shopify", displayName: "Shopify" },
  { name: "ebay", displayName: "eBay" },
  { name: "hosting", displayName: "Hosting & Servers" },
  { name: "ecommerce-dev", displayName: "E-Commerce Development" },
];

const normalizeCategory = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const ensureDefaultCategories = async () => {
  const existing = await ServiceCategory.find({ isActive: true });

  if (existing.length === 0) {
    await ServiceCategory.insertMany(DEFAULT_CATEGORIES);
    return ServiceCategory.find({ isActive: true }).sort({ displayName: 1 });
  }

  return ServiceCategory.find({ isActive: true }).sort({ displayName: 1 });
};

const getServiceCategories = async (req, res) => {
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
      message: "Failed to fetch service categories",
      error: error.message,
    });
  }
};

const createServiceCategory = async (req, res) => {
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

    const existing = await ServiceCategory.findOne({ name: normalizedName });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        existing.displayName = resolvedDisplayName;
        await existing.save();
      }

      return res.status(200).json({
        success: true,
        message: "Service category already exists",
        category: existing,
      });
    }

    const category = new ServiceCategory({
      name: normalizedName,
      displayName: resolvedDisplayName,
    });

    await category.save();

    return res.status(201).json({
      success: true,
      message: "Service category created successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create service category",
      error: error.message,
    });
  }
};

const updateServiceCategory = async (req, res) => {
  try {
    const { name } = req.params;
    const normalizedName = normalizeCategory(name);
    const { displayName, bannerImage, description } = req.body;

    const category = await ServiceCategory.findOne({ name: normalizedName });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Service category not found",
      });
    }

    if (displayName) category.displayName = displayName;
    if (bannerImage !== undefined) category.bannerImage = bannerImage;
    if (description !== undefined) category.description = description;

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Service category updated successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update service category",
      error: error.message,
    });
  }
};

const deleteServiceCategory = async (req, res) => {
  try {
    const { name } = req.params;
    const normalizedName = normalizeCategory(name);

    if (!normalizedName) {
      return res.status(400).json({
        success: false,
        message: "Please provide a category name",
      });
    }

    const deletedCategory = await ServiceCategory.findOneAndDelete({
      name: normalizedName,
    });

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Service category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete service category",
      error: error.message,
    });
  }
};

module.exports = {
  getServiceCategories,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
  ensureDefaultCategories,
};
