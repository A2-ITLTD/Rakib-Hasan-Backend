const SmartFeature = require("../models/SmartFeature");

const getSmartFeatures = async (req, res) => {
  try {
    const features = await SmartFeature.find({ isActive: true }).sort({
      order: 1,
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      count: features.length,
      features,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch smart features",
      error: error.message,
    });
  }
};

const getAdminSmartFeatures = async (req, res) => {
  try {
    const features = await SmartFeature.find().sort({ order: 1, createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: features.length,
      features,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch smart features",
      error: error.message,
    });
  }
};

const createSmartFeature = async (req, res) => {
  try {
    const {
      style,
      title,
      description,
      image,
      publicId,
      statValue,
      statLabel,
      badge,
      order,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please provide a title",
      });
    }

    const newFeature = new SmartFeature({
      style: style || "light",
      title,
      description: description || "",
      image: image || "",
      publicId: publicId || "",
      statValue: statValue || "",
      statLabel: statLabel || "",
      badge: badge || "",
      order: order ?? 0,
    });

    await newFeature.save();

    return res.status(201).json({
      success: true,
      message: "Smart feature created successfully",
      feature: newFeature,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create smart feature",
      error: error.message,
    });
  }
};

const updateSmartFeature = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      style,
      title,
      description,
      image,
      publicId,
      statValue,
      statLabel,
      badge,
      order,
      isActive,
    } = req.body;

    const feature = await SmartFeature.findById(id);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Smart feature not found",
      });
    }

    if (style !== undefined) feature.style = style;
    if (title !== undefined) feature.title = title;
    if (description !== undefined) feature.description = description;
    if (image !== undefined) feature.image = image;
    if (publicId !== undefined) feature.publicId = publicId;
    if (statValue !== undefined) feature.statValue = statValue;
    if (statLabel !== undefined) feature.statLabel = statLabel;
    if (badge !== undefined) feature.badge = badge;
    if (order !== undefined) feature.order = order;
    if (isActive !== undefined) feature.isActive = isActive;

    await feature.save();

    return res.status(200).json({
      success: true,
      message: "Smart feature updated successfully",
      feature,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update smart feature",
      error: error.message,
    });
  }
};

const deleteSmartFeature = async (req, res) => {
  try {
    const { id } = req.params;

    const feature = await SmartFeature.findById(id);

    if (!feature) {
      return res.status(404).json({
        success: false,
        message: "Smart feature not found",
      });
    }

    await SmartFeature.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Smart feature deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete smart feature",
      error: error.message,
    });
  }
};

module.exports = {
  getSmartFeatures,
  getAdminSmartFeatures,
  createSmartFeature,
  updateSmartFeature,
  deleteSmartFeature,
};
