const News = require("../models/News");

const getNews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 0;

    let query = News.find({ status: "published" }).sort({ publishDate: -1 });
    if (limit > 0) query = query.limit(limit);

    const news = await query;

    return res.status(200).json({
      success: true,
      count: news.length,
      news,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch news",
      error: error.message,
    });
  }
};

const getNewsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const item = await News.findOne({ slug, status: "published" });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "News item not found",
      });
    }

    return res.status(200).json({
      success: true,
      news: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch news item",
      error: error.message,
    });
  }
};

const getAdminNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishDate: -1 });

    return res.status(200).json({
      success: true,
      count: news.length,
      news,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch news",
      error: error.message,
    });
  }
};

const getAdminNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await News.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "News item not found",
      });
    }

    return res.status(200).json({
      success: true,
      news: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch news item",
      error: error.message,
    });
  }
};

const createNews = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      featuredImage,
      publicId,
      category,
      isFeatured,
      status,
      publishDate,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please provide a title",
      });
    }

    const newItem = new News({
      title,
      excerpt: excerpt || "",
      content: content || "",
      featuredImage: featuredImage || "",
      publicId: publicId || "",
      category: category || "",
      isFeatured: Boolean(isFeatured),
      status: status || "draft",
      publishDate: publishDate || Date.now(),
    });

    await newItem.save();

    return res.status(201).json({
      success: true,
      message: "News item created successfully",
      news: newItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create news item",
      error: error.message,
    });
  }
};

const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      excerpt,
      content,
      featuredImage,
      publicId,
      category,
      isFeatured,
      status,
      publishDate,
    } = req.body;

    const item = await News.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "News item not found",
      });
    }

    if (title !== undefined) item.title = title;
    if (excerpt !== undefined) item.excerpt = excerpt;
    if (content !== undefined) item.content = content;
    if (featuredImage !== undefined) item.featuredImage = featuredImage;
    if (publicId !== undefined) item.publicId = publicId;
    if (category !== undefined) item.category = category;
    if (isFeatured !== undefined) item.isFeatured = Boolean(isFeatured);
    if (status !== undefined) item.status = status;
    if (publishDate !== undefined) item.publishDate = publishDate;

    await item.save();

    return res.status(200).json({
      success: true,
      message: "News item updated successfully",
      news: item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update news item",
      error: error.message,
    });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await News.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "News item not found",
      });
    }

    await News.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "News item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete news item",
      error: error.message,
    });
  }
};

module.exports = {
  getNews,
  getNewsBySlug,
  getAdminNews,
  getAdminNewsById,
  createNews,
  updateNews,
  deleteNews,
};
