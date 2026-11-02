const NavbarCategory = require("../models/NavbarCategory");

const DEFAULT_CATEGORIES = [
  {
    name: "construction",
    displayName: "Construction",
    icon: "construction",
    order: 0,
  },
  {
    name: "infrastructure",
    displayName: "Infrastructure",
    icon: "infrastructure",
    order: 1,
  },
  { name: "supply", displayName: "Supply", icon: "supply", order: 2 },
].map((category) => ({
  ...category,
  link: `/services/category/${category.name}`,
}));

const normalizeName = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const ensureDefaultCategories = async () => {
  const existing = await NavbarCategory.find({ isActive: true });

  if (existing.length === 0) {
    await NavbarCategory.insertMany(DEFAULT_CATEGORIES);
    return NavbarCategory.find({ isActive: true }).sort({ order: 1, displayName: 1 });
  }

  return existing.sort((a, b) => a.order - b.order || a.displayName.localeCompare(b.displayName));
};

const getNavbarCategories = async (req, res) => {
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
      message: "Failed to fetch navbar categories",
      error: error.message,
    });
  }
};

const createNavbarCategory = async (req, res) => {
  try {
    const { name, displayName, description, link, icon, order } = req.body;
    const normalizedName = normalizeName(name);
    const resolvedDisplayName = String(displayName || name || "").trim();

    if (!normalizedName || !resolvedDisplayName) {
      return res.status(400).json({
        success: false,
        message: "Please provide both name and displayName",
      });
    }

    const existing = await NavbarCategory.findOne({ name: normalizedName });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        existing.displayName = resolvedDisplayName;
        await existing.save();
      }

      return res.status(200).json({
        success: true,
        message: "Navbar category already exists",
        category: existing,
      });
    }

    const count = await NavbarCategory.countDocuments();

    const category = new NavbarCategory({
      name: normalizedName,
      displayName: resolvedDisplayName,
      description: description || "",
      link: link || `/services/category/${normalizedName}`,
      icon: icon || "design-development",
      order: order !== undefined ? order : count,
    });

    await category.save();

    return res.status(201).json({
      success: true,
      message: "Navbar category created successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create navbar category",
      error: error.message,
    });
  }
};

const updateNavbarCategory = async (req, res) => {
  try {
    const { name } = req.params;
    const normalizedName = normalizeName(name);
    const { displayName, description, link, icon, order } = req.body;

    const category = await NavbarCategory.findOne({ name: normalizedName });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Navbar category not found",
      });
    }

    if (displayName) category.displayName = displayName;
    if (description !== undefined) category.description = description;
    if (link !== undefined) category.link = link;
    if (icon !== undefined) category.icon = icon;
    if (order !== undefined) category.order = order;

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Navbar category updated successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update navbar category",
      error: error.message,
    });
  }
};

const deleteNavbarCategory = async (req, res) => {
  try {
    const { name } = req.params;
    const normalizedName = normalizeName(name);

    if (!normalizedName) {
      return res.status(400).json({
        success: false,
        message: "Please provide a category name",
      });
    }

    const deletedCategory = await NavbarCategory.findOneAndDelete({
      name: normalizedName,
    });

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Navbar category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Navbar category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete navbar category",
      error: error.message,
    });
  }
};

module.exports = {
  getNavbarCategories,
  createNavbarCategory,
  updateNavbarCategory,
  deleteNavbarCategory,
  ensureDefaultCategories,
};
