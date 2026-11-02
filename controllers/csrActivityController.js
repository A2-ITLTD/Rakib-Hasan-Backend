const CSRActivity = require("../models/CSRActivity");

const getCSRActivities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 0;

    let query = CSRActivity.find({ status: "published" }).sort({
      order: 1,
      createdAt: -1,
    });
    if (limit > 0) query = query.limit(limit);

    const activities = await query;

    return res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch CSR activities",
      error: error.message,
    });
  }
};

const getCSRActivityBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const item = await CSRActivity.findOne({ slug, status: "published" });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "CSR activity not found",
      });
    }

    return res.status(200).json({
      success: true,
      activity: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch CSR activity",
      error: error.message,
    });
  }
};

const getAdminCSRActivities = async (req, res) => {
  try {
    const activities = await CSRActivity.find().sort({
      order: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch CSR activities",
      error: error.message,
    });
  }
};

const getAdminCSRActivityById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await CSRActivity.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "CSR activity not found",
      });
    }

    return res.status(200).json({
      success: true,
      activity: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch CSR activity",
      error: error.message,
    });
  }
};

const createCSRActivity = async (req, res) => {
  try {
    const { title, excerpt, content, image, imagePublicId, date, order, status } =
      req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please provide a title",
      });
    }

    const newItem = new CSRActivity({
      title,
      excerpt: excerpt || "",
      content: content || "",
      image: image || "",
      imagePublicId: imagePublicId || "",
      date: date || "",
      order: Number.isFinite(Number(order)) ? Number(order) : 0,
      status: status || "published",
    });

    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "CSR activity created successfully",
      activity: newItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create CSR activity",
      error: error.message,
    });
  }
};

const updateCSRActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, image, imagePublicId, date, order, status } =
      req.body;

    const item = await CSRActivity.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "CSR activity not found",
      });
    }

    if (title !== undefined) item.title = title;
    if (excerpt !== undefined) item.excerpt = excerpt;
    if (content !== undefined) item.content = content;
    if (image !== undefined) item.image = image;
    if (imagePublicId !== undefined) item.imagePublicId = imagePublicId;
    if (date !== undefined) item.date = date;
    if (order !== undefined) item.order = Number.isFinite(Number(order)) ? Number(order) : 0;
    if (status !== undefined) item.status = status;

    await item.save();

    return res.status(200).json({
      success: true,
      message: "CSR activity updated successfully",
      activity: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update CSR activity",
      error: error.message,
    });
  }
};

const deleteCSRActivity = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await CSRActivity.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "CSR activity not found",
      });
    }

    await CSRActivity.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "CSR activity deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete CSR activity",
      error: error.message,
    });
  }
};

module.exports = {
  getCSRActivities,
  getCSRActivityBySlug,
  getAdminCSRActivities,
  getAdminCSRActivityById,
  createCSRActivity,
  updateCSRActivity,
  deleteCSRActivity,
};
