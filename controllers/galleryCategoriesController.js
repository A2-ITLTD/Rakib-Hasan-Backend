const GalleryCategory = require("../models/GalleryCategory");

const DEFAULT_CATEGORIES = [
  { name: "construction", displayName: "Construction" },
  { name: "infrastructure", displayName: "Infrastructure" },
  { name: "supply", displayName: "Supply" },
  { name: "interior-works", displayName: "Interior Works" },
  { name: "work-in-progress", displayName: "Work in Progress" },
  { name: "events-others", displayName: "Events & Others" },
];

const normalizeCategory = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const ensureDefaultCategories = async () => {
  const existing = await GalleryCategory.find({ isActive: true });

  if (existing.length === 0) {
    await GalleryCategory.insertMany(DEFAULT_CATEGORIES);
    return GalleryCategory.find({ isActive: true }).sort({ displayName: 1 });
  }

  return GalleryCategory.find({ isActive: true }).sort({ displayName: 1 });
};

const getGalleryCategories = async (req, res) => {
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
      message: "Failed to fetch gallery categories",
      error: error.message,
    });
  }
};

const createGalleryCategory = async (req, res) => {
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

    const existing = await GalleryCategory.findOne({ name: normalizedName });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        existing.displayName = resolvedDisplayName;
        await existing.save();
      }

      return res.status(200).json({
        success: true,
        message: "Gallery category already exists",
        category: existing,
      });
    }

    const category = new GalleryCategory({
      name: normalizedName,
      displayName: resolvedDisplayName,
    });

    await category.save();

    return res.status(201).json({
      success: true,
      message: "Gallery category created successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create gallery category",
      error: error.message,
    });
  }
};

const deleteGalleryCategory = async (req, res) => {
  try {
    const { name } = req.params;
    const normalizedName = normalizeCategory(name);

    if (!normalizedName) {
      return res.status(400).json({
        success: false,
        message: "Please provide a category name",
      });
    }

    const deletedCategory = await GalleryCategory.findOneAndDelete({
      name: normalizedName,
    });

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Gallery category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Gallery category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete gallery category",
      error: error.message,
    });
  }
};

module.exports = {
  getGalleryCategories,
  createGalleryCategory,
  deleteGalleryCategory,
  ensureDefaultCategories,
};
